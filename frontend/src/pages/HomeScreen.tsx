import { ThemeProvider, Typography } from "@mui/material";
import LinksList from "../components/layout/home-page/LinksList";
import DarkMode from "../components/feature/DarkMode";

const HomeScreen = () => {
  const { theme, darkMode, handleThemeChange } = DarkMode();

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Typography variant="h2" sx={{ display: "flex", justifyContent: "center" }}>
          Welcome to Studio 6
        </Typography>
        <LinksList darkMode={darkMode} handleThemeChange={handleThemeChange} />
      </ThemeProvider>
    </div>
  );
};

export default HomeScreen;
