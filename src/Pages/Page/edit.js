import { useState, useEffect } from "react";
import { Button, Paper, TextField, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import settings from "../../settings";
import { useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import GenerateForm from "../../Components/GenerateForm";

function PreviewComic(props) {
  return (
    <div style={{ display: "flex", flexFlow: "wrap", width: 532 }}>
      {props.images.map((img, index) => {
        if (img.length == 0)
          return (
            <div
              key={index}
              style={{
                background: "grey",
                width: "256px",
                height: "256px",
                margin: "5px",
              }}
            ></div>
          );

        return (
          <div
            key={index}
            style={{
              background: img,
              width: "256px",
              height: "256px",
              margin: "5px",
            }}
          ></div>
        );
      })}
    </div>
  );
}

export default function CreatePage() {
  const [selected, setSelected] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const comicId = queryParams.get("id");
  const pages = 6;
  const [images, setImages] = useState(["", "", "", "", "", ""]);
  const [imageIDs, setImageIDs] = useState(["", "", "", "", "", ""]);

  //For when the user click on a page
  const handleClick = (page) => {
    setSelected(page);
  };

  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const onSubmit = async (event) => {
    event.preventDefault();
    const token = await getAccessTokenSilently({
      issuerBaseURL: "https://dev-7wje8o2ffd0q20mn.us.auth0.com",
      audience: `https://dev-7wje8o2ffd0q20mn.us.auth0.com/api/v2/`,
    });
    try {
      const response = await fetch(settings.BACKEND + "/page/update-page", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({
          comic_id: comicId,
          imageIDs: imageIDs.filter((id) => id !== ""),
        }),
      });
      const data = await response.json();
      alert("Page created");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: 10, margin: 5 }}>
      <h3>Generate Page</h3>
      <div style={{ display: "flex" }}>
        <div
          style={{ flex: 1, display: "flex", flexWrap: "wrap" }}
          sx={{ padding: 1 }}
        >
          {[1, 2, 3, 4, 5, 6].map((page, index) => (
            <Paper
              key={index}
              sx={{
                padding: 5,
                margin: 2,
                width: "256px",
                height: "256px",
                background:
                  images[page - 1].length > 0
                    ? "url(" + images[page - 1] + ")"
                    : "",
                position: "relative", // Add this
                "&::after":
                  page === selected
                    ? {
                        // Add this block
                        content: '""',
                        position: "absolute",
                        top: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: "inherit",
                        left: 0,
                        backgroundColor: "rgba(0, 0, 255, 0.3)",
                      }
                    : "",
                backgroundSize: "contain",
              }}
              onClick={() => handleClick(page)}
            >
              Page {page}
            </Paper>
          ))}
        </div>
        <div style={{ flex: 1 }}>
          <GenerateForm
            onClick={() => {}}
            onSuccess={(data) => {
              let img = data.images;
              let newImages = [...images];
              newImages[selected - 1] = img[0];
              setImages(newImages);

              let imgID = data.imageIDs;
              let newImageIDs = [...imageIDs];
              newImageIDs[selected - 1] = imgID[0];
              setImageIDs(newImageIDs);
            }}
          />
        </div>
      </div>
      <br />
      <Box display="flex" justifyContent="center">
        <Button variant="contained" size="large" onClick={onSubmit}>
          Create the page
        </Button>
      </Box>
      Preview:
      <PreviewComic images={images} />
    </div>
  );
}
