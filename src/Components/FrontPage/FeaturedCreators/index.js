import React from "react";
import { Box, IconButton, Typography, Card, CardContent } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function FeaturedCreators() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: "50%",
          maxWidth: "80%",
          padding: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 2,
          }}
        >
          <Typography variant="h3" sx={{ color: "white" }}>
            Featured Creators
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" sx={{ color: "white" }}>
              Discover More
            </Typography>
            <IconButton sx={{ color: "white" }}>
              <ArrowForwardIcon />
            </IconButton>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 2,
          }}
        >
          {[1, 2, 3].map((i) => (
            <Card
              key={i}
              sx={{
                flexBasis: "30%",
                flexGrow: 1,
                marginLeft: i > i ? 1 : 0,
                marginRight: i < 3 ? 8 : 0,
              }}
            >
              <CardContent>
                <Typography variant="h6">Card {i}</Typography>
                <Typography variant="body2">Card content.</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 15 }}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h2" sx={{ color: "white" }}>
              41M+
            </Typography>
            <Typography variant="h6" sx={{ color: "white" }}>
              USERS
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h2" sx={{ color: "white" }}>
              300+
            </Typography>
            <Typography variant="h6" sx={{ color: "white" }}>
              ARTISTS
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h2" sx={{ color: "white" }}>
              1.8M+
            </Typography>
            <Typography variant="h6" sx={{ color: "white" }}>
              COMMUNITY
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default FeaturedCreators;
