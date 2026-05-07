import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, IconButton, Box, Button } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const CardScroller = () => {
  const [cards, setCards] = useState([1, 2, 3, 4, 5]);
  const [selectedIndex, setSelectedIndex] = useState(2);

  const shiftLeft = () => {
    setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : cards.length - 1));
  };

  const shiftRight = () => {
    setSelectedIndex((prevIndex) => (prevIndex < cards.length - 1 ? prevIndex + 1 : 0 ));
  };

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", flexDirection: 'column', justifyContent: "center", perspective: '1000px', height: '100vh' }}
    >
      <Typography variant='h2' component='h1' sx={{ mt: 4, mb: 4, color: 'white'}}>
        Discover
      </Typography>
      <Typography variant='h6' component='h1' sx={{ mt: 4, color: 'white'}}>
        Welcome to the world of Manga. Explore the best art from hand-picked artist
      </Typography>
      <Typography variant='h6' component='h1' sx={{ mb: 5, color: 'white'}}>
        out there and find the hidden gem.
      </Typography>
      <Button size="large"
        sx={{ 
          mb: 10,
          borderRadius: 2,
          background: `linear-gradient(90deg, #CD43FF, #FD65A6, #FC9651, #FFBD72)`,
          color: 'white'  
        }}
      >
        Discover more
      </Button>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center',perspective: '1000px' }}>
        <IconButton onClick={shiftLeft} sx={{color: 'white'}}>
          <ArrowBackIos />
        </IconButton>
        <Box sx={{ display: 'flex', position: 'relative', width: '1500px', height: '350px', transformStyle: 'preserve-3d'  }}>
          {cards.map((card, index) => (
            <Card
              key={card}
              sx={{
                width: 200,
                height: 300,
                mx: 1,
                position: 'absolute',
                left: `calc(50% + ${(index - selectedIndex) * 220}px - 100px)`,
                transform: `translateX(${(index - selectedIndex) * -50}px) rotateY(${(index - selectedIndex) * -20}deg) translateZ(${index === selectedIndex ? 100 : 0}px) scale(${1 - Math.abs(index - selectedIndex) * 0.1})`,
                transition: 'box-shadow 0.3s ease-in-out, opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
                boxShadow: index === selectedIndex ? 10 : 3,
                //opacity: index === selectedIndex ? 1 : 0.7,
                backgroundColor: 'black',
                color: 'white',
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  Card {card}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
        <IconButton onClick={shiftRight} sx={{color: 'white'}}>
          <ArrowForwardIos />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CardScroller;
