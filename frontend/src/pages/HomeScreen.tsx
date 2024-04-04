import { ThemeProvider, CssBaseline, Typography, useMediaQuery } from "@mui/material"; // Import CssBaseline for resetting default styles
import DarkMode from "../components/feature/DarkMode";
import backgroundImage from "../assets/images/guests-party-enjoying-refreshing-drinks-wellstocked-beverage-station.jpg";

const HomeScreen = () => {
  const { theme } = DarkMode();

  const isMediumScreen = useMediaQuery('(max-width:800px)');
  const isSmallScreen = useMediaQuery('(max-width:599px)');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Reset default styles */}
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: theme.palette.mode === 'dark' ? "#fff" : "#000",
          marginTop: isSmallScreen ? "-220px" : (isMediumScreen ? "-243px" : "-259px"),
          padding: 0,
        }}
      >
        <div style={{ textAlign: "center", color: "#fff", marginTop: "175px", padding: "50px" }}>
          <Typography variant="h2">
            Welcome to Mixer
          </Typography>
          <Typography variant="h4">
            The best place to mix your drinks and mix with people!
          </Typography>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default HomeScreen;
