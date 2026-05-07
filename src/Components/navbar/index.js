import React from "react";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
// import { LoginButton, LogoutButton, Profile } from "../../Pages/Login/index"
import { NavLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  TextField,
} from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

function MenuBar() {
  // ...
  const { user, logout } = useAuth0();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={handleMenu}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem component={NavLink} to="/profile">
          Profile
        </MenuItem>

        <MenuItem
          component={NavLink}
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          Logout
        </MenuItem>

        <div style={{ flex: 1, display: "flex" }}>
          {user && <div sx={{ padding: 5 }}>Your Points: {user.points}</div>}{" "}
          {/* Display points */}
        </div>
      </Menu>
    </>
  );
}
function Navbar() {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  return (
    <AppBar
      position="fixed"
      sx={{ top: 0, backgroundColor: "#050520", color: "white" }}
      elevation={0}
    >
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" color="white" sx={{ flex: 1 }}>
          Manga Platform
        </Typography>
        <Box sx={{ display: "flex", flex: 2 }}>
          {/* <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            sx={{
              marginRight: 2,
              width: "500px",
              color: "white",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
            }}
          /> */}
          <Button component={NavLink} sx={{ color: "white" }} to="/">
            Home
          </Button>
          <Button component={NavLink} sx={{ color: "white" }} to="/gallery">
            Discover
          </Button>
          <Button component={NavLink} sx={{ color: "white" }} to="/generate">
            Create Image
          </Button>
          <Button component={NavLink} sx={{ color: "white" }} to="/mycomics">
            My Manga
          </Button>
          <Button component={NavLink} sx={{ color: "white" }} to="/pricing">
            Subscription
          </Button>
          <Button component={NavLink} sx={{ color: "white" }} to="/mysubscriptions">
            Dashboard
          </Button>
        </Box>

        {isAuthenticated ? (
          <MenuBar />
        ) : (
          <Button
            sx={{ color: "white", flex: 1 }}
            onClick={() => loginWithRedirect()}
          >
            Log In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
