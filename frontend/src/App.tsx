import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import Header from "./components/common/Header";
import { Outlet } from "react-router-dom";
import DarkMode from "./components/feature/DarkMode";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useCallback, useEffect, useState } from "react";
import Loading from "./components/common/Loading";
import { fetchBasketAsync } from "./slices/basketSlice";
import { useAppDispatch } from "./store/configureStore";
import { fetchCurrentUser } from "./slices/accountSlice";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp])

  const { theme, darkMode, handleThemeChange } = DarkMode();

  if (loading) return <Loading />

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="top-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header theme={theme} darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container
        id="container"
        maxWidth={false}
        disableGutters 
        style={{ height: "100vh" }}
      >
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;
