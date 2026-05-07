import { createRoot } from "react-dom/client";
import {
  LoginButton,
  LogoutButton,
  UserProfile,
  Profile,
  CustomerPortal,
  useLoggedInUser,
} from "../src/Pages/Login/index.js";
import MySubscriptions from "./Pages/Dashboard/mysubscriptions.js";
import MyMangas from "./Pages/Dashboard/mymangas.js";
import DailyChallenge from "./Pages/Dashboard/dailychallenge.js";
import Promote from "./Pages/Dashboard/promote.js";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { React, setState, useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Generate from "./Pages/Generate/index";
import Gallery from "./Pages/Gallery/index";
import Navbar from "./Components/navbar/index";
import Footer from "./Components/Footer/index";
import CardScroller from "./Components/FrontPage/CardScroller/index";
import TrendingBox from "./Components/FrontPage/TrendingBox/TrendingBox.js";
import WelcomePage from "./Components/FrontPage/WelcomePage/index.js";
import FeaturedCreators from "./Components/FrontPage/FeaturedCreators/index.js";
import ViewComic from "./Pages/Comic/viewComic.js";
import CreateComic from "./Pages/Comic/create";
import CreatePage from "./Pages/Page/create";
import EditComic from "./Pages/Comic/edit";
import MyProfile from "./Pages/MyProfile/myprofile.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import {
  CheckoutAndPricing,
  Return,
} from "./Pages/Subscriptions/pricing_plans.js";
import { MyComics } from "./Pages/Comic/myComics.js";
import ViewPage from "./Pages/Page/view.js";
import { Dashboard } from "@mui/icons-material";
import MangaCard from "./Components/MangaCard/index.js";

function Home() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userId, setUserId] = useState("");
  const [points, setPoints] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated && user) {
        const token = await getAccessTokenSilently({
          audience: `https://dev-7wje8o2ffd0q20mn.us.auth0.com/api/v2/`,
          scope: "read:user",
        });
        try {
          await fetch("http://localhost:3000/auth/storeUserData", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
            body: JSON.stringify({
              auth0_user_id: user.sub,
              email: user.email,
            }),
          });
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };
    fetchData();
  }, [getAccessTokenSilently, isAuthenticated, user]);

  const displayUserPoints = async () => {
    if (!isAuthenticated || !user) {
      console.error(
        "User is not authenticated or user object is not available."
      );
      return;
    }

    try {
      if (isAuthenticated && user) {
        const token = await getAccessTokenSilently({
          audience: `https://dev-7wje8o2ffd0q20mn.us.auth0.com/api/v2/`,
          scope: "read:user",
        });

        const response = await fetch(
          "http://localhost:3000/points/getUserPoints",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        );
        const data = await response.json();
        if (response.ok) {
          setPoints(data.points); // Update points in state
        } else {
          throw new Error(data.message || "Failed to fetch points");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      displayUserPoints();
    }
  }, [isAuthenticated, user]);

  const handleSpendingPoints = async () => {
    console.log("We're in!");
    if (!isAuthenticated || !user) {
      console.error(
        "User is not authenticated or user object is not available."
      );
      return;
    }

    try {
      if (isAuthenticated && user) {
        const token = await getAccessTokenSilently({
          audience: `https://dev-7wje8o2ffd0q20mn.us.auth0.com/api/v2/`,
          scope: "read:user",
        });
        await fetch("http://localhost:3000/points/spendUserPoints", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify({
            auth0_user_id: user.sub,
          }),
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "hsla(240, 72%, 7%, 1)",
        backgroundImage: `radial-gradient(at 92% 89%, hsla(335, 100%, 9%, 1) 0px, transparent 50%),
                        radial-gradient(at 3% 6%, hsla(124, 75%, 10%, 1) 0px, transparent 50%)`,
      }}
    >
      <WelcomePage />
      <TrendingBox />
      <CardScroller />
      <FeaturedCreators />
    </div>
  );
}

function About() {
  const { user } = useAuth0();
  return (
    <div>
      <h2>About</h2>
      {user && <p>User Name: {user.name}</p>}
    </div>
  );
}

function Users() {
  return <h2>Users</h2>;
}

export default function App() {
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user, isAuthenticated]);

  return (
    <Router>
      <div
        style={{
          backgroundColor: "hsla(240, 72%, 7%, 1)",
          backgroundImage: `radial-gradient(at 80% 100%, hsla(289,79%,14%,1) 0px, transparent 50%),
                            radial-gradient(at 0% 0%, hsla(39,18%,21%,1) 0px, transparent 50%)`,
          paddingTop: 50,
        }}
      >
        <Navbar />
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/about" element={<About user={user} />} />
          <Route path="/generate" element={<Generate />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/createcomic" element={<CreateComic />} />
          <Route path="/createpage" element={<CreatePage />} />
          <Route path="/viewpage" element={<ViewPage />} />
          <Route path="/viewcomic" element={<ViewComic />} />
          <Route path="/users" element={<Users />} />
          <Route path="/mycomics" element={<MyComics />} />
          <Route path="/create" element={<CreateComic />} />
          <Route path="/edit" element={<EditComic />} />
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<CheckoutAndPricing />} />
          <Route path="/return" element={<Return />} />
          <Route path="/customer-portal" element={<CustomerPortal />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mysubscriptions" element={<MySubscriptions />} />
          <Route path="/dailychallenge" element={<DailyChallenge />} />
          <Route path="/mymangas" element={<MyMangas />} />
          <Route path="/promote" element={<Promote />} />
          <Route path="/myprofile" element={<MyProfile />} />
        </Routes>
        <div style={{backgroundColor: '#050520'}}>
          <Footer />
        </div>
      </div>
    </Router>
  );
}
