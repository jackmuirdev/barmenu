import React, { useState } from 'react';
import { AppBar, Badge, Box, IconButton, Toolbar } from "@mui/material";
import Switch from "../feature/Switch";
import { Link } from "react-router-dom";
import { ShoppingCart, AccountCircle } from "@mui/icons-material";
import { Theme } from '@mui/material/styles';
import { useAppSelector } from '../../store/configureStore';
import SignedOutMenu from '../layout/header-component/SignedOutMenu';
import SignedInMenu from '../layout/header-component/SignedInMenu';

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}

const Header = ({ darkMode, handleThemeChange }: Props) => {
  const {basket} = useAppSelector(state => state.basket);
  const {user} = useAppSelector(state => state.account);
  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);
  const [DropMenuItem, setDropMenuItem] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setDropMenuItem(event.currentTarget);
  };

  const handleClose = () => {
    setDropMenuItem(null);
  };

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Switch checked={darkMode} onChange={handleThemeChange} sx={{ mr: -5 }} />
        <Link style={{ margin: "auto", marginBottom: "24px", marginTop: "24px", color: "#fff", textDecoration: "none", fontSize: "50px" }} to={"/"}>
          <img src="../../../images/logo.png" style={{ height: "150px", width: "400px", margin: "-25px", marginBottom: "-35px" }} alt="Logo" />
        </Link>
        <Box display='flex' alignItems='center'>
          <IconButton component={Link} to='/basket' size="large" edge='start' color='inherit' sx={{ mr: 2 }}>
            <Badge badgeContent={itemCount} color='secondary'>
              <ShoppingCart sx={{ fontSize: (theme: Theme) => theme.typography.fontSize * 3 }} />
            </Badge>
          </IconButton>
        </Box>
        <Box>
          <IconButton aria-label="Account" color="inherit" onClick={handleClick} size='large'>
            <Badge color="secondary">
              <AccountCircle sx={{ fontSize: (theme: Theme) => theme.typography.fontSize * 3 }} />
            </Badge>
          </IconButton>
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
