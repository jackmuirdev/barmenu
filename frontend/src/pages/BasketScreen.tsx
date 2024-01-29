import EmptyBasket from "../components/feature/EmptyBasket";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Box, Grid, Button } from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useStoreContext } from "../context/StoreContext";
import axiosApi from "../api/AxiosApi";
import BasketSummary from "../components/layout/basket-page/BasketSummary";
import { Link as RouterLink } from 'react-router-dom';

const BasketScreen = () => {
  const { basket, setBasket, removeItem } = useStoreContext();

  function handleAddItem(productId: number) {
    axiosApi.Basket.addItem(productId)
      .then(basket => setBasket(basket))
      .catch(error => console.log(error));
  }

  function handleRemoveItem(productId: number, quantity = 1) {
    axiosApi.Basket.removeItem(productId, quantity)
      .then(() => removeItem(productId, quantity))
      .catch(error => console.log(error));
  }

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
                style={{ height: '80px' }} // Set a fixed height for each row
              >
                <TableCell component="th" scope="row">
                  <Box display='flex' alignItems='center' marginRight='-100px'>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ height: '50px', width: '50px', marginRight: '20px' }} // Adjust the styling for the image
                    />
                    <span>{item.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="center">£{(item.price / 100).toFixed(2)}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleRemoveItem(item.productId)} color="error">
                    <Remove />
                  </IconButton>
                  {item.quantity}
                  <IconButton onClick={() => handleAddItem(item.productId)} color="success">
                    <Add />
                  </IconButton>
                </TableCell>
                <TableCell align="center">£{(item.price * item.quantity / 100).toFixed(2)}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleRemoveItem(item.productId, item.quantity)} color="error">
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
