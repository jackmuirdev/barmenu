import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAppDispatch } from '../../../store/configureStore';
import { Fade } from '@mui/material';
import { signOut } from '../../../slices/accountSlice';
import { Link } from 'react-router-dom';
import { clearBasket } from '../../../slices/basketSlice';

interface MenuProps {
  anchorEl: null | HTMLElement;
  handleClose: () => void;
}

export default function SignedInMenu({ anchorEl: anchorElProp, handleClose: handleCloseProp }: MenuProps) {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
    handleCloseProp();
  };

  return (
    <>
      {anchorElProp || anchorEl ? (
        <Menu
          anchorEl={anchorElProp || anchorEl}
          open={Boolean(anchorElProp) || open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={handleClose} component={Link} to="/">
            Profile
          </MenuItem>
          <MenuItem onClick={handleClose} component={Link} to="/">
            My Orders
          </MenuItem>
          <MenuItem onClick={() => {
            dispatch(signOut());
            dispatch(clearBasket());
            handleClose();
          }}>
            Logout
          </MenuItem>
        </Menu>
      ) : null}
    </>
  );
}