import { Product } from "../models/product"
import ProductList from "../components/layout/catalog-page/ProductList";
import { useState, useEffect } from "react";
import axiosApi from "../api/AxiosApi";
import NotFound from "./errors/NotFoundScreen";
import Loading from "../components/common/Loading";

const CatalogScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosApi.Catalog.list()
      .then(products => setProducts(products))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, [])

  if (loading) return <Loading />

  if (!products) return <NotFound />
  
  return (
  <>
    <ProductList products={products}/>
  </>
  )
}

export default CatalogScreen;