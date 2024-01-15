import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import HomeScreen from "../pages/HomeScreen"
import App from "../App"
import CatalogScreen from "../pages/CatalogScreen"
import OneProductScreen from "../pages/OneProductScreen"
import ContactScreen from "../pages/ContactScreen"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/catalog" element={<CatalogScreen />} />
      <Route path="/catalog/:id" element={<OneProductScreen />} />
      <Route path="/contact" element={<ContactScreen />} />
    </Route>
  )
)

export default router;