import { Grid, Typography, Divider, TableContainer, Table, TableBody, TableRow, TableCell, IconButton } from "@mui/material";
import { useState, useEffect, FormEvent } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../../../pages/errors/NotFoundScreen";
import Loading from "../../common/Loading";
import { Remove, Add } from "@mui/icons-material";
import { currencyFormat } from "../../../util/util";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../../store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "../../../slices/basketSlice";
import { fetchProductAsync, productSelectors } from "../../../slices/catalogSlice";

const OneProduct = () => {
  const { basket, status } = useAppSelector(state => state.basket);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const product = useAppSelector(state => productSelectors.selectById(state, id));
  const {status: productStatus} = useAppSelector(state => state.catalog);
  const [quantity, setQuantity] = useState(0);
  const item = basket?.items.find(i => i.productId === product?.id);

  useEffect(() => {
    if (item) setQuantity(item.quantity);
    if (!product && id) dispatch(fetchProductAsync(parseInt(id)));
}, [id, item, product, dispatch]);

function handleInputChange(event: FormEvent<HTMLInputElement>) {
    if (parseInt(event.currentTarget.value) >= 0)
        setQuantity(parseInt(event.currentTarget.value));
}

function handleUpdateBasket() {
    if (!product) return;
    if (!item || quantity > item?.quantity) {
        const updatedQuantity = item ? quantity - item.quantity : quantity;
        dispatch(addBasketItemAsync({productId: product?.id, quantity: updatedQuantity}))
    } else {
        const updatedQuantity = item.quantity - quantity;
        dispatch(removeBasketItemAsync({productId: product?.id, quantity: updatedQuantity}))
    }
}

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  if (productStatus.includes("pending")) return <Loading />;

  if (!product) return <NotFound />;

  return (
    <Grid container spacing={15}>
      <Grid item xs={6} sx={{ mb: 2 }}>
        <img src={product.image} alt={product.name} style={{ width: '100%' }} />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: 3, mt: 2 }} />
        <Typography variant="h4" color='#1976d2'>{currencyFormat(product.price)}</Typography>
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
                  <Typography variant="h6" onChange={handleInputChange}>
                    <IconButton color="error" onClick={handleDecrement}>
                      <Remove />
                    </IconButton>
                    {quantity}
                    <IconButton color="success" onClick={handleIncrement}>
                      <Add />
                    </IconButton>
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="h6" sx={{ width: "35%" }}>
                    <LoadingButton 
                    disabled={item?.quantity === quantity || !item && quantity === 0}
                    loading={status.includes('pending' + item?.productId)}
                    onClick={handleUpdateBasket}
                    sx={{
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
                      {item ? 'Update Quantity' : 'Add to Basket'}
                    </LoadingButton>
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default OneProduct;
