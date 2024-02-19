import EmptyBasket from "../components/feature/EmptyBasket";
import { Grid, Button } from "@mui/material";
import BasketSummary from "../components/layout/basket-page/BasketSummary";
import { Link as RouterLink } from 'react-router-dom';
import { useAppSelector } from "../store/configureStore";
import BasketTable from "../components/layout/basket-page/BasketTable";

const BasketScreen = () => {
  const { basket } = useAppSelector(state => state.basket);

  if (!basket) return <EmptyBasket />;

  return (
    <>
      <BasketTable items={basket.items} />
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
