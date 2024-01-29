import EmptyBasket from "../components/feature/EmptyBasket";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Box, Grid, Button } from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import BasketSummary from "../components/layout/basket-page/BasketSummary";
import { Link as RouterLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "../slices/basketSlice";

const BasketScreen = () => {
  const { basket } = useAppSelector(state => state.basket);
  const dispatch = useAppDispatch();

  if (!basket) return <EmptyBasket />;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell align="left">Product</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Subtotal</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map(item => (
              <TableRow
                key={item.productId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                style={{ height: '80px' }}
              >
                <TableCell component="th" scope="row">
                  <Box display='flex' alignItems='center' marginRight='-100px'>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ height: '50px', width: '50px', marginRight: '20px' }} 
                    />
                    <span>{item.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="center">£{(item.price / 100).toFixed(2)}</TableCell>
                <TableCell align="center">
                  <Button onClick={() => dispatch(removeBasketItemAsync({productId: item.productId, quantity: 1, name: "rem"}))} color="error" sx={{borderRadius: "10px"}}>
                    <Remove />
                  </Button>
                  {item.quantity}
                  <IconButton onClick={() => dispatch(addBasketItemAsync({productId: item.productId}))} color="success" sx={{borderRadius: "10px"}}>
                    <Add />
                  </IconButton>
                </TableCell>
                <TableCell align="center">£{(item.price * item.quantity / 100).toFixed(2)}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => dispatch(removeBasketItemAsync({productId: item.productId, quantity: item.quantity, name: 'del'}))} color="error" sx={{borderRadius: "10px"}}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />
          <Button component={RouterLink} to='/checkout' variant="contained" size="large" fullWidth>
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default BasketScreen;
