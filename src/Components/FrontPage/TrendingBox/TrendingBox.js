import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  Typography,
  Card,
  CardContent,
  Grid
} from "@mui/material";

const commonStyles = {
  borderColor: "text.primary",
  m: 1,
  border: 1,
};

function TrendingBox() {

  const itemsData = {
    'Shonen': ['Card 1-1', 'Card 1-2', 'Card 1-3', 'Card 1-4', 'Card 1-5', 'Card 1-6', 'Card 1-7', 'Card 1-8'],
    'Shojo': ['Card 2-1', 'Card 2-2', 'Card 2-3', 'Card 2-4', 'Card 2-5', 'Card 2-6', 'Card 2-7', 'Card 2-8'],
    'Seinen': ['Card 3-1', 'Card 3-2', 'Card 3-3', 'Card 3-4', 'Card 3-5', 'Card 3-6', 'Card 3-7', 'Card 3-8'],
    'Josei' : ['Card 4-1', 'Card 4-2', 'Card4-3', 'Card 4-4', 'Card 4-5', 'Card 4-6', 'Card 4-7', 'Card 4-8'],
    "Filler1": [],
    "Filler2": [],
    "Filler3": [],
    "Filler4": [],
    "Filler5": [],
  };
  //useState() and default to 'Shonen' key
  const [selectedCards, setSelectedCards] = useState(itemsData['Shonen']);
  const items = Object.keys(itemsData);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const linearGradient = 'linear-gradient(90deg, #CD43FF, #FD65A6, #FC9651, #FFBD72)'

  /**
   * Takes itemKey when a ListItemButton is clicked and sets state
   * 
   * @param {*} itemKey 
   */
  const handleButtonClick = (itemKey) => {
    setSelectedCards(itemsData[itemKey]);
    setSelectedGenre(itemKey);
  };

  return (
    <div>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Typography variant='h2' component='h1' sx={{ mt: 4, color: 'white'}}>
          See All Highest Selling
        </Typography>
        <Typography variant='h2' component='h1' 
          sx={{ 
            mb: 2,
            background: `linear-gradient(90deg, #CD43FF, #FD65A6, #FC9651, #FFBD72)`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent'
          }}>
          Manga this week
        </Typography>
        <Box
          sx={{
            display: "flex",
            height: "50vh",
            width: '150vh',
            borderRadius: 10,
            ...commonStyles,
            boxShadow: 3,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              direction: "rtl",
              width: "150px",
              overflowY: "auto",
              borderRight: "1px solid #ddd",
            }}
          >
            <List>
              {items.map((item, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton onClick={() => handleButtonClick(item)}
                    sx={{
                      color: selectedGenre === item ? 'transparent' : 'white',
                      background: selectedGenre === item ? linearGradient : 'none',
                      WebkitBackgroundClip: selectedGenre === item ? 'text' : 'none',
                      WebkitTextFillColor: selectedGenre === item ? 'transparent' : 'inherit',
                    }}
                  >
                    {item}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
          <Box sx={{ flex: 1, p: 3, overflowY: 'auto'}}>
            <Grid container spacing={2} alignItems="stretch">
              {selectedCards.map((card, index) => (
                <Grid item xs={3} key={index} sx={{
                  display: 'flex',
                  alignItems: 'stretch',
                }}>
                  <Card variant='outlined' sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    aspectRatio: '1 /1.41',
                  }}>
                    <CardContent sx={{ flexGrow: 1}}>
                      <Typography variant="h5" component="div">
                        {card}
                      </Typography>
                      <Typography variant="body2">
                        Filler for {card}...
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default TrendingBox;
