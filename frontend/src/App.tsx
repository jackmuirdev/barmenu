import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import { Outlet } from "react-router-dom";
import DarkMode from "./components/feature/DarkMode";

function App() {
  const { theme, darkMode, handleThemeChange } = DarkMode();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container id="container">
        <Outlet />
      </Container>
      <Footer darkMode={darkMode} />
    </ThemeProvider>
  );
}

export default App;
