import { ThemeProvider, Typography } from "@mui/material";
import LinksList from "../components/layout/home-page/LinksList";
import DarkMode from "../components/feature/DarkMode";

const HomeScreen = () => {
  const { theme } = DarkMode();

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Typography variant="h2" sx={{ display: "flex", justifyContent: "center", textAlign: "center"}}>
          Welcome to the Cocktail Bar
        </Typography>
        <LinksList />
      </ThemeProvider>
    </div>
  );
};


export default HomeScreen;
