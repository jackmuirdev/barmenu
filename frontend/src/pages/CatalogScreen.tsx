import ProductList from "../components/layout/catalog-page/ProductList";
import NotFound from "./errors/NotFoundScreen";
import Loading from "../components/common/Loading";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { setPageNumber, setProductParams } from "../slices/catalogSlice";
import { Grid, Paper } from "@mui/material";
import ProductSearch from "../components/layout/catalog-page/ProductSearch";
import RadioButtonGroup from "../components/common/RadioButtonGroup";
import CheckBoxButtons from "../components/common/CheckBoxButtons";
import CustomPagination from "../components/layout/catalog-page/CustomPagination";
import useProducts from "../hooks/useProducts";

const sortOptions = [
  { value: 'name', label: 'Alphabetical' },
  { value: 'priceDesc', label: 'Price - High to Low' },
  { value: 'price', label: 'Price - Low to High' }
]

const CatalogScreen = () => {
  const { products, filtersLoaded, brands, categories, metaData } = useProducts();
  const { productParams } = useAppSelector(state => state.catalog);
  const dispatch = useAppDispatch();

  if (!filtersLoaded) return <Loading />

  if (!products) return <NotFound />

  return (
    <>
      <Grid container columnSpacing={4} sx={{ width: '100%', maxWidth: 'initial', padding: "50px" }}>
        <Grid item xs={12} md={3}>
          <Paper sx={{ mb: 2 }}>
            <ProductSearch />
          </Paper>
          <Paper sx={{ mb: 2, p: 2 }}>
            <RadioButtonGroup
              selectedValue={productParams.orderBy}
              options={sortOptions}
              onChange={(e) => dispatch(setProductParams({ orderBy: e.target.value }))}
            />
          </Paper>
          <Paper sx={{ mb: 2, p: 2 }}>
            <CheckBoxButtons
              items={brands}
              checked={productParams.brands}
              onChange={(items: string[]) => dispatch(setProductParams({ brands: items }))}
            />
          </Paper>
          <Paper sx={{ mb: 2, p: 2 }}>
            <CheckBoxButtons
              items={categories}
              checked={productParams.categories}
              onChange={(items: string[]) => dispatch(setProductParams({ categories: items }))}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={9}>
          <ProductList products={products} />
        </Grid>
        <Grid item xs={12} md={9} sx={{ mb: 2, mt: 3 }}>
          {metaData &&
            <CustomPagination
              metaData={metaData}
              onPageChange={(page: number) => dispatch(setPageNumber({ pageNumber: page }))}
            />}
        </Grid>
      </Grid>
    </>
  )
}

export default CatalogScreen;
