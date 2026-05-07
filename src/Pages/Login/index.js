import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { loadStripe } from "@stripe/stripe-js";

//Profile page imports
import {
  Box,
  Button,
  Avatar,
  Typography,
  Grid,
  Container,
} from "@mui/material";

const stripePromise = loadStripe(
  "pk_test_51OctgSIxRtvRO5SiUl1TOJkGC7eZrluwR85KgdCOaWpfk3Ghx53ddMqMcyLAcaWHkUkxOazKsTQgDCMAkx1QjC8X00eOLCtm8s"
); // starts with pk_

export function LoginButton() {
  const { isAuthenticated, loginWithRedirect, user} = useAuth0();

  return (
    !isAuthenticated && <button onClick={loginWithRedirect}>Log in</button>
  );
}

export function LogoutButton() {
  const { isAuthenticated, logout } = useAuth0();

  return (
    isAuthenticated && (
      <button
        onClick={() => {
          logout({
            logoutParams: {
              returnTo: window.location.origin,
            },
          });
        }}
      >
        Log out
      </button>
    )
  );
}

export function Profile() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);
  const [appMetadata, setAppMetadata] = useState(null);

  useEffect(() => {
    const getUserMetadata = async () => {
      // Adjust this URL to your backend route
      const backendUrl = `http://localhost:3000/auth/get-user-token?email=${encodeURIComponent(
        user.email
      )}`;
      const accessToken = await getAccessTokenSilently({
        audience: `https://dev-7wje8o2ffd0q20mn.us.auth0.com/api/v2/`,
        scope: "read:users",
      });
      try {
        const response = await fetch(backendUrl, {
          method: "GET", // Your backend should handle the method accordingly
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            // Optionally add authorization headers if your backend requires
          },
        });

        if (!response.ok) {
          throw new Error(
            `Error fetching user metadata: ${response.statusText}`
          );
        }

        const { user_metadata, app_metadata } = await response.json();
        setUserMetadata(user_metadata);
        setAppMetadata(app_metadata);
      } catch (e) {
        console.error("Error fetching user data from backend:", e.message);
      }
    };

    if (isAuthenticated && user?.email) {
      getUserMetadata();
    }
  }, [isAuthenticated, user?.email]);

  //useState() for selected tabs
  const [selectedTab, setSelectedTab] = useState("posts");

  return (
    isAuthenticated && (
      <div>
        <Container disableGutters maxWidth="xl">
          <Box>
            {/*Profile Info Box */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                p: 2,
                bgcolor: "background.paper",
                borderRadius: 1,
              }}
            >
              <Box sx={{ p: 4 }}>
                <Avatar
                  src={user.picture}
                  alt="Profile Picture"
                  sx={{ width: 112, height: 112 }}
                />
              </Box>
              <Box sx={{ m1: 2, flexGrow: 1 }}>
                <Typography variant="h5">{user.name}</Typography>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item>
                    <Typography variant="body2">Posts: 10</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">Likes: 100</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">Following: 50</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">Followers: 200</Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>

            {/* Content Box */}
            <Box
              sx={{ mt: 1, p: 2, bgcolor: "background.paper", borderRadius: 1 }}
            >
              <Box sx={{ display: "flex", mb: 4 }}>
                <Button
                  variant={selectedTab === "posts" ? "contained" : "text"}
                  onClick={() => setSelectedTab("posts")}
                  sx={{ mr: 3 }}
                >
                  Posts
                </Button>
                <Button
                  variant={selectedTab === "following" ? "contained" : "text"}
                  onClick={() => setSelectedTab("following")}
                  sx={{ mr: 3 }}
                >
                  Following
                </Button>
                <Button
                  variant={selectedTab === "followers" ? "contained" : "text"}
                  onClick={() => setSelectedTab("followers")}
                >
                  Followers
                </Button>
              </Box>
              <Box>
                {selectedTab === "posts" && (
                  <Typography>Posts content ...</Typography>
                )}
                {selectedTab === "following" && (
                  <Typography>Following content ...</Typography>
                )}
                {selectedTab === "followers" && (
                  <Typography>Followers content ...</Typography>
                )}
              </Box>
            </Box>
          </Box>
        </Container>
      </div>
    )
  );
}

export function CustomerPortal() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      const token = await getAccessTokenSilently({
        audience: `https://dev-7wje8o2ffd0q20mn.us.auth0.com/api/v2/`,
        scope: "read:user"
      });

      if (isAuthenticated && user) {   
        try { 
          await fetch("http://localhost:3000/payment/customer-portal", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
            body: JSON.stringify({
              auth0_user_id: user.sub,
            })
          })
          .then(response => response.json())
          .then(data => {
            window.location.href = data.url; // Redirect the user to the Stripe Billing Portal
          })
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };
      fetchData();
  }, [getAccessTokenSilently, isAuthenticated, user]);
}
