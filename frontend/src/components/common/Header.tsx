import { AppBar, Toolbar, Typography } from "@mui/material"
import Switch from "../feature/Switch";

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}

const Header = ({darkMode, handleThemeChange}: Props) => {
  return (
    <AppBar position="static" sx={{mb: 4}}>
      <Toolbar>
        <Switch checked={darkMode} onChange={handleThemeChange} sx={{mr:-5}} />
        <Typography variant="h3" sx={{margin: "auto", mb: 3, mt: 3}}>
          Studio 6 Bar
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header;
