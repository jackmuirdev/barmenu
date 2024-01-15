import { Grid, Typography, Divider, TableContainer, Table, TableBody, TableRow, TableCell, Button } from "@mui/material";
import { Product } from "../../../models/product";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const OneProduct = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios.get(`http://localhost:5001/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, [id])

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  if (loading) return <h3>Loading...</h3>

  if (!product) return <h3>Product not found</h3>

  return (
    <Grid container spacing={15}>
      <Grid item xs={6} sx={{ mb: 2 }}>
        <img src={product.image} alt={product.name} style={{ width: '100%' }} />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: 3, mt: 2 }} />
        <Typography variant="h4" color='#1976d2'>£{(product.price / 100).toFixed(2)}</Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography variant="h6" sx={{ width: "100%" }}>
                    {product.description}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">
                    {product.brand} / {product.category}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">
                    Quantity:
                    <Button onClick={() => handleQuantityChange(quantity - 1)}>-</Button>
                    {quantity}
                    <Button onClick={() => handleQuantityChange(quantity + 1)}>+</Button>
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="h6" sx={{ width: "35%" }}>
                    <Button sx={{
                      backgroundColor: "red",
                      padding: "20px",
                      borderRadius: "10px",
                      color: "#fff",
                      fontSize: "20px",
                      width: "150%",
                      '&:hover': {
                        backgroundColor: '#1976d2',
                      },
                    }}>
                      Add To Bag
                    </Button>
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )
}

export default OneProduct;
