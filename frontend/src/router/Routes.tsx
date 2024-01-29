import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import HomeScreen from "../pages/HomeScreen"
import App from "../App"
import CatalogScreen from "../pages/CatalogScreen"
import OneProductScreen from "../pages/OneProductScreen"
import ContactScreen from "../pages/ContactScreen"
import ServerErrorScreen from "../pages/errors/ServerErrorScreen"
import NotFoundScreen from "../pages/errors/NotFoundScreen"
import BasketScreen from "../pages/BasketScreen"
import CheckoutScreen from "../pages/CheckoutScreen"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/catalog" element={<CatalogScreen />} />
      <Route path="/catalog/:id" element={<OneProductScreen />} />
      <Route path="/contact" element={<ContactScreen />} />
      <Route path="/basket" element={<BasketScreen />} />
      <Route path="/checkout" element={<CheckoutScreen />} />
      <Route path="/server-error" element={<ServerErrorScreen />} />
      <Route path="/not-found" element={<NotFoundScreen />} />
      <Route path="/*" element={<Navigate replace to="/not-found" />} />
    </Route>
  )
)

export default router;