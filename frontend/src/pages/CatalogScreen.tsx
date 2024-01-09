import { Product } from "../models/product"
import ProductList from "../components/layout/catalog-page/ProductList";
import { useState, useEffect } from "react";

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:5001/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])
  
  return (
  <>
    <ProductList products={products}/>
  </>
  )
}

export default Catalog;