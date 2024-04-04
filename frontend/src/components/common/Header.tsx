import React, { useState } from 'react';
import { AppBar, Badge, Box, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Grid, useMediaQuery, Button } from "@mui/material";
import Switch from "../feature/Switch";
import { Link } from "react-router-dom";
import { ShoppingCart, AccountCircle, Menu as MenuIcon, ContactPhone, Home, MenuBook, Person } from "@mui/icons-material";
import { Theme } from '@mui/material/styles';
import { useAppSelector } from '../../store/configureStore';
import SignedOutMenu from '../layout/header-component/SignedOutMenu';
import SignedInMenu from '../layout/header-component/SignedInMenu';

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
  theme: Theme;
}

const Header = ({ darkMode, handleThemeChange, theme }: Props) => { 
  const { basket } = useAppSelector(state => state.basket);
  const { user } = useAppSelector(state => state.account);
  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);
  const [DropMenuItem, setDropMenuItem] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const isSmallScreen = useMediaQuery('(max-width:800px)');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setDropMenuItem(event.currentTarget);
  };

  const handleClose = () => {
    setDropMenuItem(null);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawerContent = (
    <List>
      <ListItem>
        <Button onClick={() => { toggleDrawer(); window.location.href = '/basket'; }} sx={{color: darkMode ? "#fff" : "#000"}}>
          <ListItemIcon>
            <Badge badgeContent={itemCount}>
              <ShoppingCart />
            </Badge>
          </ListItemIcon>
          <ListItemText primary="Basket" />
        </Button>
      </ListItem>
      <ListItem>
        <Button component={Link} to="/" onClick={() => {toggleDrawer(); window.location.href = '/'; }} sx={{color: darkMode ? "#fff" : "#000"}}>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </Button>
      </ListItem>
      <ListItem>
        <Button component={Link} to="/catalog" onClick={() => {toggleDrawer(); window.location.href = '/catalog'; }} sx={{color: darkMode ? "#fff" : "#000"}} >
          <ListItemIcon>
            <MenuBook />
          </ListItemIcon>
          <ListItemText primary="Menu" />
        </Button>
      </ListItem>
      <ListItem>
        <Button component={Link} to="/contact" onClick={() => {toggleDrawer(); window.location.href = '/contact'; }} sx={{color: darkMode ? "#fff" : "#000"}}>
          <ListItemIcon>
            <ContactPhone />
          </ListItemIcon>
          <ListItemText primary="Contact" />
        </Button>
      </ListItem>
      {user ? (
        <ListItem>
          <Button component={Link} to="/account" onClick={() => {toggleDrawer(); window.location.href = '/account'; }} sx={{color: darkMode ? "#fff" : "#000"}}>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </Button>
        </ListItem>
      ) : (
        <ListItem>
          <Button component={Link} to="/signin" onClick={() => {toggleDrawer(); window.location.href = '/signin'; }} sx={{color: darkMode ? "#fff" : "#000"}}>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="Sign In" />
          </Button>
        </ListItem>
      )}
      <ListItem>
        <Button onClick={handleThemeChange} sx={{color: darkMode ? "#fff" : "#000"}}>
          <ListItemIcon>
            <Badge color='secondary'>
              <Switch theme={theme} checked={darkMode} />
            </Badge>
          </ListItemIcon>
          <ListItemText primary={"Dark Mode"} />
        </Button>
      </ListItem>
    </List> 
  );
  

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Grid container alignItems="center" justifyContent="center" sx={{ bgcolor: "#000", textAlign: "center" }}>
        <Grid item xs={12}>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: {
                xs: "60px",
                sm: "80px",
                md: "80px",
              },
              marginTop: "50px",
              marginBottom: "20px",
            }}
          >
            Mixer
          </Typography>
        </Grid>
        {isSmallScreen ? (
          <Grid item xs={1} justifyContent="center">
            <IconButton aria-label="Menu" color="inherit" onClick={toggleDrawer} size='large'>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer} sx={{color: darkMode ? "#fff" : "#000" }}>
              {drawerContent}
            </Drawer>
          </Grid>
        ) : (
          <Grid item xs={4} sx={{display: "flex", justifyContent: "center"}}>
            <List sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
              <ListItem>
                <Link to={"/"} style={{ color: "#fff", textDecoration: "none" }}>
                  <Typography variant="h5">
                    Home
                  </Typography>
                </Link>
              </ListItem>
              <ListItem>
                <Link to={"/catalog"} style={{ color: "#fff", textDecoration: "none" }}>
                  <Typography variant="h5">
                    Menu
                  </Typography>
                </Link>
              </ListItem>
              <ListItem>
                <Link to={"/contact"} style={{ color: "#fff", textDecoration: "none" }}>
                  <Typography variant="h5">
                    Contact
                  </Typography>
                </Link>
              </ListItem>
              <ListItem>
                <Link to={"/basket"} style={{ color: "#fff", textDecoration: "none" }}>
                  <Typography variant="h5">
                    Basket
                  </Typography>
                </Link>
              </ListItem>
              <ListItem>
                <Typography variant="h5" onClick={handleClick} sx={{cursor: "pointer"}}>
                  Account
                </Typography>
              </ListItem>
            </List>
          </Grid>
        )}
      </Grid>
      <Box>
        {user ? (
          <SignedInMenu anchorEl={DropMenuItem} handleClose={handleClose} user={user} />
        ) : (
          <SignedOutMenu anchorEl={DropMenuItem} handleClose={handleClose} />
        )}
      </Box>
    </AppBar>
  );
}

export default Header;
