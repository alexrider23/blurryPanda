import React from "react";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import settings from "../../settings";

import {
  Box,
  ButtonBase,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import IconButton from "@mui/material/IconButton";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
const customWrapper = {};
const MangaGallery = (props) => {
  const [fav, setFav] = useState(props.favorites);
  const [like, setLike] = useState(props.liked);
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  const updateFav = () => {
    const result = getAccessTokenSilently({
      issuerBaseURL: settings.BASEURL,
      audience: settings.AUDIENCE,
    })
      .then((token) => {
        const body = JSON.stringify({
          user: token,
          image: props.imageID,
          like: like,
        });
        const response = fetch(settings.BACKEND + "/generation/updatefav", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: body,
        })
          .then((response) => {
            return response.json().then((data) => {
              console.log(response);
              console.log(data);
              if (data.success === 1) {
                if (like) {
                  setFav((prev) => prev - 1);
                  setLike((prev) => !prev);
                } else {
                  setFav((prev) => prev + 1);
                  setLike((prev) => !prev);
                }
              }
            });
          })
          .catch((error) => {
            console.log("error in fetch request to generation", error);
          });
      })
      .catch((error) => {
        console.log("error in access token ", error);
      });
  };

  return (
    <Card
      sx={{
        maxHeight: 4000,
        maxWidth: 400,
        backgroundColor: "#121212",
        margin: "10px",
        borderRadius: "10px",
        width: "500px",
        color: "white",
      }}
    >
      <CardMedia
        image={props.visual}
        sx={{ margin: "10px", height: 300, borderRadius: "10px" }}
      ></CardMedia>

      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          paddingRight: "25px",
        }}
      >
        <Box sx={customWrapper}>
          <ThumbUpOutlinedIcon />
          <span>4.5</span>
        </Box>

        <CardActions sx={{}}>
          <IconButton
            onClick={() => {
              updateFav();
            }}
          >
            <FavoriteTwoToneIcon style={{ display: like ? "none" : "block" }} />
            <FavoriteIcon style={{ display: like ? "block" : "none" }} />
            <span>{fav}</span>
          </IconButton>
        </CardActions>
        <Box sx={{ border: "solid white 1px", borderRadius: 10 }}>
          <CardGiftcardIcon />
          <span>Gift Credits</span>
        </Box>
      </CardContent>

      <CardContent
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          padding: 0,
          marginTop: "10px",
        }}
      >
        <ButtonBase>
          <AccountBoxIcon fontSize="large" />
        </ButtonBase>
        <Box sx={{ margin: "10px" }}>
          <Typography>One Piece</Typography>
          <Typography>Goda Senpai</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MangaGallery;
