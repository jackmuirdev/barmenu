import ProductList from "../components/layout/catalog-page/ProductList";
import { useEffect } from "react";
import NotFound from "./errors/NotFoundScreen";
import Loading from "../components/common/Loading";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { fetchFilters, fetchProductsAsync, productSelectors, setPageNumber, setProductParams } from "../slices/catalogSlice";
import { Grid, Paper } from "@mui/material";
import ProductSearch from "../components/layout/catalog-page/ProductSearch";
import RadioButtonGroup from "../components/common/RadioButtonGroup";
import CheckBoxButtons from "../components/common/CheckBoxButtons";
import CustomPagination from "../components/layout/catalog-page/CustomPagination";

const sortOptions = [
  {value: 'name', label: 'Alphabetical'},
  {value: 'priceDesc', label: 'Price - High to Low'},
  {value: 'price', label: 'Price - Low to High'}
]

const CatalogScreen = () => {
  const products = useAppSelector(productSelectors.selectAll)
  const {productsLoaded, filtersLoaded, brands, categories, productParams, metaData} = useAppSelector(state => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFilters());
  }, [dispatch, filtersLoaded]);

  if (!filtersLoaded) return <Loading />

  if (!products) return <NotFound />
  
  return (
  <Grid container columnSpacing={4}>
    <Grid item xs={3}>
      <Paper sx={{mb: 2}}>
        <ProductSearch />
      </Paper>
      <Paper sx={{ mb: 2, p: 2 }}>
        <RadioButtonGroup 
          selectedValue={productParams.orderBy}
          options={sortOptions}
          onChange={(e) => dispatch(setProductParams({orderBy: e.target.value}))}
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
    <Grid item xs={9}>
      <ProductList products={products}/>
    </Grid>
    <Grid item xs={3} />
    <Grid item xs={9} sx={{mb: 2}}>
      {metaData &&
      <CustomPagination
        metaData={metaData}
        onPageChange={(page: number) => dispatch(setPageNumber({pageNumber: page}))}
      />}
    </Grid>
  </Grid>
  )
}

export default CatalogScreen;