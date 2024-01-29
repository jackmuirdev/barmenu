import { Card, CardContent, CardHeader, CardMedia, Typography, styled, CardActions } from "@mui/material";
import { Product } from "../../../models/product";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import axiosApi from "../../../api/AxiosApi";
import { LoadingButton } from "@mui/lab";
import { useStoreContext } from "../../../context/StoreContext";
import { currencyFormat } from "../../../util/util";

interface Props {
  product: Product;
}

const StyledCardHeader = styled(CardHeader)`
  & .MuiCardHeader-content {
    flex: 1 1 auto;
    width: 100%;
  }
`;

const ProductCard = ({ product }: Props) => {
  const [loading, setLoading] = useState(false);
  const {setBasket} = useStoreContext();

  function handleAddItem(productId: number) {
    setLoading(true);
    axiosApi.Basket.addItem(productId)
      .then(basket => setBasket(basket))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }

  return (
      <Card style={{ textAlign: "center" }}>
        <RouterLink to={`/catalog/${product.id}`} style={{ textDecoration: "none" }}>
          <CardMedia
            sx={{ height: 400, borderRadius: '0px'}}
            image={product.image}
            title={product.name}
          />
        </RouterLink>
        <StyledCardHeader
          title={
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                mb: -3,
                fontFamily: "'Questrial', sans-serif",
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {product.name}
            </Typography>
          }
        />
        <CardContent>
          <Typography gutterBottom color='primary' variant="h5" >
            {currencyFormat(product.price)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.brand} / {product.category}
          </Typography>
        </CardContent>
        <CardActions>
          <LoadingButton 
            size="small" 
            onClick={() => handleAddItem(product.id)} 
            loading={loading} 
            sx={{
              backgroundColor: "red",
              padding: "10px",
              borderRadius: "10px",
              color: "#fff",
              fontSize: "20px",
              width: "100%",
              '&:hover': {
                backgroundColor: '#1976d2',
              },
            }}  
          >
            Add To Cart
          </LoadingButton>
        </CardActions>
      </Card>
  );
}

export default ProductCard;
