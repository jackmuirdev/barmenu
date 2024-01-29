import ProductList from "../components/layout/catalog-page/ProductList";
import { useEffect } from "react";
import NotFound from "./errors/NotFoundScreen";
import Loading from "../components/common/Loading";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { fetchProductsAsync, productSelectors } from "../slices/catalogSlice";

const CatalogScreen = () => {
  const products = useAppSelector(productSelectors.selectAll)
  const {productsLoaded, status} = useAppSelector(state => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);

  if (status.includes('pending')) return <Loading />

  if (!products) return <NotFound />
  
  return (
  <>
    <ProductList products={products}/>
  </>
  )
}

export default CatalogScreen;