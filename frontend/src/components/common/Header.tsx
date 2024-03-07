import React, { useState } from 'react';
import { AppBar, Badge, Box, IconButton, Toolbar, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import Switch from "../feature/Switch";
import { Link } from "react-router-dom";
import { ShoppingCart, AccountCircle, Menu as MenuIcon } from "@mui/icons-material";
import { Theme } from '@mui/material/styles';
import { useAppSelector } from '../../store/configureStore';
import SignedOutMenu from '../layout/header-component/SignedOutMenu';
import SignedInMenu from '../layout/header-component/SignedInMenu';

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
  theme: Theme;
}

const Header = ({ darkMode, handleThemeChange, theme }: Props) => { // Include props here
  const { basket } = useAppSelector(state => state.basket);
  const { user } = useAppSelector(state => state.account);
  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);
  const [DropMenuItem, setDropMenuItem] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

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
      <ListItem component="button" onClick={() => { toggleDrawer(); window.location.href = '/basket'; }}>
        <ListItemIcon>
          <Badge badgeContent={itemCount} color='secondary'>
            <ShoppingCart />
          </Badge>
        </ListItemIcon>
        <ListItemText primary="Basket" />
      </ListItem>
      <ListItem component="button" onClick={handleClick}>
        <ListItemIcon>
          <Badge color="secondary">
            <AccountCircle />
          </Badge>
        </ListItemIcon>
        <ListItemText primary={user ? "Account" : "Sign In"} />
      </ListItem>
    </List>
  );

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Switch theme={theme} checked={darkMode} onChange={handleThemeChange} sx={{ mr: -5 }} /> {/* Spread props here */}
        <Link style={{ margin: "auto", marginBottom: "0px", marginTop: "0px", color: "#fff", textDecoration: "none", fontSize: "30px" }}  to={"/"}>
          <h1>Cocktail Menu</h1>
        </Link>
        <Box display={{ xs: 'none', sm: 'none', md: 'block' }}>
          <IconButton component={Link} to='/basket' size="large" edge='start' color='inherit' sx={{ mr: 2 }}>
            <Badge badgeContent={itemCount} color='secondary'>
              <ShoppingCart sx={{ fontSize: (theme: Theme) => theme.typography.fontSize * 3 }} />
            </Badge>
          </IconButton>
          <IconButton aria-label="Account" color="inherit" onClick={handleClick} size='large'>
            <Badge color="secondary">
              <AccountCircle sx={{ fontSize: (theme: Theme) => theme.typography.fontSize * 3 }} />
            </Badge>
          </IconButton>
        </Box>
        <Box display={{ xs: 'block', sm: 'block', md: 'none' }} sx={{mr: 3}}>
          <IconButton aria-label="Menu" color="inherit" onClick={toggleDrawer} size='large'>
            <MenuIcon />
          </IconButton>
          <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
            {drawerContent}
          </Drawer>
        </Box>
        <Box>
          {user ? (
            <SignedInMenu anchorEl={DropMenuItem} handleClose={handleClose} />
          ) : (
            <SignedOutMenu anchorEl={DropMenuItem} handleClose={handleClose} />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
