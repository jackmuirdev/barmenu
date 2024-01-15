import { createTheme } from "@mui/material";
import { useState } from "react";

const DarkMode = () => {
  const [darkMode, setDarkMode] = useState(false);

  const paletteType = darkMode ? 'dark' : 'light';

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? "#eaeaea" : "#121212"
      }
    },
  });

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  return { theme, darkMode, handleThemeChange };
};

export default DarkMode;
