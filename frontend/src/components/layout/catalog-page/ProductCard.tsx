import { Card, CardContent, CardHeader, CardMedia, Typography, styled, Link } from "@mui/material";
import { Product } from "../../../models/product";
import { Link as RouterLink } from "react-router-dom";

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
    <Link component={RouterLink} to={`/catalog/${product.id}`} style={{ textDecoration: 'none' }}>
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
            £{(product.price / 100).toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.brand} / {product.category}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}

export default ProductCard;
