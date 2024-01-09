import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography, styled } from "@mui/material"
import { Product } from "../../../models/product";

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
  return (
    <>
      <Card style={{ textAlign: "center" }}>
        <CardMedia
          sx={{ height: 400, borderRadius: '0px'}}
          image={product.image}
          title={product.name}
        />
        <StyledCardHeader
          title={
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                mb: -2,
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
            £{(product.price / 100).toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.brand} / {product.category}
          </Typography>
        </CardContent>
        <CardActions sx={{display: "flex", justifyContent: "space-evenly", mb: 1}}>
          <Button size="small" variant="contained">Add to basket</Button>
          <Button size="small" variant="contained">View</Button>
        </CardActions>
      </Card>
    </>
  );
}

export default ProductCard;
