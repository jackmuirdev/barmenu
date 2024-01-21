import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import { Outlet } from "react-router-dom";
import DarkMode from "./components/feature/DarkMode";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { theme, darkMode, handleThemeChange } = DarkMode();

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="top-right" hideProgressBar theme="colored" />
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
