import React from "react";

import {
  Paper,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
export default function ImageCard({ comic }) {
  console.log(comic);
  return (
    // ...

    <Card
      style={{
        margin: 5,
        border: "1px solid white",
        background: "linear-gradient(to right, #232323, #121212, #232323)",
        borderRadius: "10px",
        width: "300px",
        color: "white",
      }}
    >
      <div
        alt="Contemplative Reptile"
        style={{
          background: "url(" + comic.cover + ")",
          backgroundSize: "cover",
          height: "250px",
          margin: "10px",
          borderRadius: "10px",
        }}
        title="Contemplative Reptile"
      />
      <div>
        <div style={{ margin: 10 }}>
          <h3>{comic.name}</h3>
          <a href={"viewComic?id=" + comic.comic_id}>
            <Button variant="contained" color="primary">
              View
            </Button>
          </a>
          &nbsp;
          <a href={"edit?id=" + comic.comic_id}>
            <Button variant="contained" color="primary">
              Edit
            </Button>
          </a>
          &nbsp;
          <a href={"createPage?id=" + comic.comic_id}>
            <Button variant="contained" color="primary">
              Add Page
            </Button>
          </a>
        </div>
      </div>
    </Card>
  );
}
