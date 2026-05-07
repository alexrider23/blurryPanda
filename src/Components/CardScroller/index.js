import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const CardScroller = () => {
  const [cards, setCards] = useState([1, 2, 3, 4, 5]);
  const [shiftedCards, setShiftedCards] = useState(cards);
  const centerIndex = Math.floor(cards.length / 2);
  const animationDuration = 500;

  useEffect(() => {
    const timeout = setTimeout(() => {
        setCards(shiftedCards);
    }, animationDuration);

    return () => clearTimeout(timeout);
  }, [shiftedCards]);

  const shiftLeft = () => {
    const newShiftedCards = [...cards];
    const firstCard = newShiftedCards.shift();
    newShiftedCards.push(firstCard);
    setShiftedCards(newShiftedCards);
  };

  const shiftRight = () => {
    const newShiftedCards = [...cards];
    const lastCard = newShiftedCards.pop();
    newShiftedCards.unshift(lastCard);
    setShiftedCards(newShiftedCards);
  };

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center", perspective: '1000px' }}
    >
      <IconButton onClick={shiftRight}>
        <ArrowBackIos />
      </IconButton>
      <Box sx={{ display: 'flex', transition: 'transform 0.5s', transformStyle: 'preserve-3d' }}>
        {shiftedCards.map((card, index) => (
          <Card
            key={card}
            sx={{
              width: 200,
              height: 300,
              mx: 1,
              left: `${50 + (index - centerIndex) * 10}%`,
              transform: `rotateY(${(index - centerIndex) * 25}deg) translateZ(${200 - Math.abs(index - centerIndex) * 100}px)`,
              transition: `transform ${animationDuration}ms`,
              boxShadow: index === centerIndex ? 10 : 3,
              opacity: index === centerIndex ? 1 : 0.7,
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
      <IconButton onClick={shiftLeft}>
        <ArrowForwardIos />
      </IconButton>
    </Box>
  );
};

export default CardScroller;
