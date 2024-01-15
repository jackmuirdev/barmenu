import { Product } from "../models/product"
import ProductList from "../components/layout/catalog-page/ProductList";
import { useState, useEffect } from "react";
import axios from "axios";

const CatalogScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5001/api/products')
      .then(res => setProducts(res.data))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, [])

  if (loading) return <h3>Loading...</h3>

  if (!products) return <h3>Products not found</h3>
  
  return (
  <>
    <ProductList products={products}/>
  </>
  )
}

export default CatalogScreen;