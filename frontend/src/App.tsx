import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import { Outlet } from "react-router-dom";
import DarkMode from "./components/feature/DarkMode";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import axiosApi from "./api/AxiosApi";
import {getCookie} from "./util/util";
import Loading from "./components/common/Loading";
import { setBasket } from "./slices/basketSlice";
import { useAppDispatch } from "./store/configureStore";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie('buyerId');
    if (buyerId) {
      axiosApi.Basket.get()
        .then(basket => dispatch(setBasket(basket)))
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false)
    }
  }, [dispatch])

  const { theme, darkMode, handleThemeChange } = DarkMode();

  if (loading) return <Loading />

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
