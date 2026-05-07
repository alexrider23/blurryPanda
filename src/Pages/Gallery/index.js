import React from "react";
import { TextField } from "@mui/material";
import {
  Grid,
  Paper,
  Box,
  ButtonBase,
  styled,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import MangaGallery from "./mangaGallery";
import { useEffect, useState } from "react";
import settings from "../../settings";
import { useAuth0 } from "@auth0/auth0-react";

const Img = styled("img")({
  display: "inline",
  Width: "25%",
  maxHeight: "50%",
  verticalAlign: "middle",
});
const customWrapper = {
  backgroundColor: "grey",
  padding: "5px",
};
function Gallery() {
  const [result, setResult] = useState([]);
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    try {
      const result = getAccessTokenSilently({
        issuerBaseURL: settings.BASEURL,
        audience: settings.AUDIENCE,
      })
        .then((token) => {
          console.log("token is ", token);
          fetch(settings.BACKEND + "/generation/list?token=" + token, {
            credentials: "include",
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              setResult(data.images);
              console.log(data);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch {
      console.log("error");
    }
  }, []);
  return (
    <div style={{ padding: "0 10% 0 10%" }}>
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
        Discover Manga By Community
      </h1>
      <div style={{ display: "flex", marginTop: 20, marginBottom: 20 }}>
        {[
          "Nature",
          "Landscape",
          "Portrait",
          "Abstract",
          "Wildlife",
          "Cityscape",
          "Macro",
          "Travel",
          "Food",
          "Fashion",
          "Sports",
          "Architecture",
          "Street",
          "Night",
          "Underwater",
          "Aerial",
          "BlackAndWhite",
          "Vintage",
          "Artistic",
          "Candid",
        ].map((element) => {
          return (
            <div
              style={{
                background: "linear-gradient(to left, #9662F1,#673AB7)",
                borderRadius: "20px",
                color: "white",
                margin: "5px",
                padding: "5px 10px",
              }}
            >
              {element}
            </div>
          );
        })}
      </div>
      <TextField
        variant="outlined"
        size="small"
        placeholder="Search artwork..."
        sx={{
          marginRight: 2,
          width: "500px",
          background: "#232323",
          borderRadius: "5px",
        }}
        InputProps={{
          style: {
            height: "50px",
            color: "white",
          },
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          padding: 0,
        }}
      >
        {result.map((element, index) => (
          <MangaGallery
            key={index}
            visual={element[0]}
            favorites={element[4]}
            imageID={element[1]}
            liked={element[5]}
          ></MangaGallery>
        ))}
      </Box>
    </div>
  );
}

export default Gallery;
