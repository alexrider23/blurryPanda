import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import cover from "./peakpx.jpg";
import Circle from "./Circle.svg";

function WelcomePage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: `url(https://www.buzzfrance.fr/wp-content/uploads/2021/06/quel-anime-regarder.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {" "}
      <img
        src={Circle}
        style={{
          position: "absolute",
          minHeight: "1000px",
          width: "1500px",
        }}
      />
      <div
        style={{
          borderRadius: "50%",
          //boxShadow: "0 0 50px rgba(0, 0, 0, 0.5)",
          width: "100vh",
          height: "75vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          //backgroundColor: "#050520",
          border: "1px solid transparent",
          //background: `radial-gradient(circle, #031336 50%, rgba(0, 0, 139, 0.1), transparent)`,
          padding: "20px",
          zIndex: 1,
        }}
      >
        <Stack alignItems="center">
          <Typography variant="h6" align="center" color="white">
            No.1 Manga Art Marketplace
          </Typography>
          <Typography variant="h2" align="center" color="white">
            #1 Platform to Bring your manga imagination to life
          </Typography>
          <Typography
            variant="h2"
            align="center"
            color="white"
            sx={{
              background: `linear-gradient(90deg, #CD43FF, #FD65A6, #FC9651, #FFBD72)`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
          >
            Create, Monetize and Earn
          </Typography>
          <Button>Get Started</Button>
        </Stack>
      </div>
    </Box>
  );
}

export default WelcomePage;
