import { useState } from "react";
import Catalog from "./pages/CatalogScreen";
import Header from "./components/common/Header";
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Footer from "./components/common/Footer";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const paletteType = darkMode ? 'dark' : 'light';

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? "#eaeaea" : "#121212"
      }
    },
  })

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
        <Catalog />
      </Container>
      <Footer darkMode={darkMode} />
    </ThemeProvider>
  );
}

export default App;
