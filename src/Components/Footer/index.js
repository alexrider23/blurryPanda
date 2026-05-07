import React from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  Link,
  IconButton,
  List,
  ListItem,
} from "@mui/material";
import { Facebook, Instagram, X, YouTube } from "@mui/icons-material";

const Footer = () => {
  return (
    <Container maxWidth="lg" >
      <Box py={4}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{color: 'white'}}>Blurry Panda</Typography>
            <Typography variant="body2" sx={{color: 'white'}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" sx={{color: 'white'}}>Marketplace</Typography>
            <List style={{ listStyleType: "none", padding: 0 }}>
              <ListItem>
                <Link href="#">Home</Link>
              </ListItem>
              <ListItem>
                <Link href="#">Discover</Link>
              </ListItem>
              <ListItem>
                <Link href="#">Template</Link>
              </ListItem>
              <ListItem>
                <Link href="#">Pricing</Link>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" sx={{color: 'white'}}>Resource</Typography>
            <List style={{ listStyleType: "none", padding: 0 }}>
              <ListItem>
                <Link href="#">Generate Manga</Link>
              </ListItem>
              <ListItem>
                <Link href="#">Community Page</Link>
              </ListItem>
              <ListItem>
                <Link href="#">Promote</Link>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" sx={{color: 'white'}}>Account</Typography>
            <List style={{ listStyleType: "none", padding: 0 }}>
              <ListItem>
                <Link href="#">Dashboard</Link>
              </ListItem>
              <ListItem>
                <Link href="#">Profile Setting</Link>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" sx={{color: 'white'}}>Company</Typography>
            <List style={{ listStyleType: "none", padding: 0 }}>
              <ListItem>
                <Link href="#">Contact Us</Link>
              </ListItem>
              <ListItem>
                <Link href="#">FAQ</Link>
              </ListItem>
            </List>
          </Grid>
        </Grid>
        <Box my={3}>
          <Grid container justifyContent="flex-end">
            <Typography variant="h6" sx={{color: 'white'}}>Join the Community</Typography>
            <IconButton href="#" color="inherit">
              <Facebook />
            </IconButton>
            <IconButton href="#" color="inherit">
              <X />
            </IconButton>
            <IconButton href="#" color="inherit">
              <Instagram />
            </IconButton>
            <IconButton href="#" color="inherit">
              <YouTube />
            </IconButton>
          </Grid>
        </Box>
        <Box my={2}>
          <hr />
        </Box>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography variant="body2" sx={{color: 'white'}}>@ 2024 Blurry Panda</Typography>
          </Grid>
          <Grid item>
            <Link href="#">Terms & Conditions</Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Footer;
