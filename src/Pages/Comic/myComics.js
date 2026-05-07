import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ImageCard from "../../Components/ImageCard";
import settings from "../../settings";
import { Paper } from "@mui/material";
import { Link } from "react-router-dom";
export function MyComics() {
  const [comics, setComics] = useState([]);
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  //Fetch from mycomics endpoint
  useEffect(() => {
    getAccessTokenSilently({
      issuerBaseURL: "https://dev-7wje8o2ffd0q20mn.us.auth0.com",
      audience: `https://dev-7wje8o2ffd0q20mn.us.auth0.com/api/v2/`,
    }).then((token) => {
      console.log(token);
      fetch(settings.BACKEND + "/comic/mycomics", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          let imageFetchs = [];
          for (let i = 0; i < data.length; i++) {
            imageFetchs.push(
              fetch(
                settings.BACKEND + "/generation/status?image=" + data[i].cover,
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
                .then((image) => {
                  console.log(data[i]);
                  return image.json();
                })
                .then((image) => {
                  return {
                    name: data[i].name,
                    description: data[i].description,
                    cover: image.images[0],
                    comic_id: data[i].comic_id,
                  };
                })
            );
          }
          Promise.all(imageFetchs).then((tempComics) => {
            setComics(tempComics);
          });
        });
    });
  }, [isAuthenticated, user]);

  return (
    <>
      <h1
        style={{
          background:
            "linear-gradient(to right, #CD43FF,#FD65A6,#FC9651, #FFBD72)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textAlign: "center",
          margin: "20px", // Add this line
        }}
      >
        My comics
      </h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignContent: "flex-start",
          margin: "auto",
          maxWidth: "1000px",
        }}
      >
        {comics.map((comic) => (
          <ImageCard comic={comic}></ImageCard>
        ))}{" "}
        <Link
          to="/createcomic"
          style={{
            display: "flex",
            color: "inherit",
            textDecoration: "inherit",
            fontSize: 20,
          }}
        >
          <Paper
            style={{
              minHeight: "350px",
              margin: 5,
              border: "1px dashed white",
              background: "transparent",
              borderRadius: "10px",
              width: "300px",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            Add more comics
          </Paper>
        </Link>{" "}
      </div>
    </>
  );
}
