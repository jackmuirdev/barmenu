import { Typography, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { currencyFormat } from "../util/util";
import useProducts from "../hooks/useProducts";
import { useAppDispatch } from "../store/configureStore";
import { removeProduct, setPageNumber } from "../slices/catalogSlice";
import CustomPagination from "../components/layout/catalog-page/CustomPagination";
import { useState } from "react";
import ProductEditScreen from "./ProductEditScreen";
import { Product } from "../models/product";
import axiosApi from "../api/AxiosApi";
import { LoadingButton } from "@mui/lab";

export default function InventoryScreen() {
    const { products, metaData } = useProducts();
    const dispatch = useAppDispatch();
    const [editMode, setEditMode] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [target, setTarget] = useState(0);

    function handleSelectProduct(product: Product) {
        setSelectedProduct(product);
        setEditMode(true);
    }

    function handleDeleteProduct(id: number) {
        setTarget(id);
        setLoading(true);
        axiosApi.Admin.deleteProduct(id)
            .then(() => dispatch(removeProduct(id)))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }

    function cancelEdit() {
        setSelectedProduct(undefined);
        setEditMode(false);
    }

    return (
        <div style={{padding: "50px", marginTop: "-50px"}}>
            {editMode ? (
                <ProductEditScreen product={selectedProduct} cancelEdit={cancelEdit} />
            ) : (
                <>
                    <Box display='flex' justifyContent='space-between'>
                        <Typography sx={{ p: 2 }} variant='h4'>Inventory</Typography>
                        <Button onClick={() => setEditMode(true)} sx={{ m: 2 }} size='large' variant='contained'>Create</Button>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell align="left">Product</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="center">Type</TableCell>
                                    <TableCell align="center">Brand</TableCell>
                                    <TableCell align="center">Quantity</TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {products.map((product) => (
                                    <TableRow
                                        key={product.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {product.id}
                                        </TableCell>
                                        <TableCell align="left">
                                            <Box display='flex' alignItems='center'>
                                                <img src={product.image} alt={product.name} style={{ height: 50, marginRight: 20 }} />
                                                <span>{product.name}</span>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="right">{currencyFormat(product.price)}</TableCell>
                                        <TableCell align="center">{product.category}</TableCell>
                                        <TableCell align="center">{product.brand}</TableCell>
                                        <TableCell align="center">{product.quantityInStock}</TableCell>
                                        <TableCell align="right">
                                            <Button onClick={() => handleSelectProduct(product)} startIcon={<Edit />} />
                                            <LoadingButton loading={loading && target === product.id} startIcon={<Delete />} color='error' onClick={() => handleDeleteProduct(product.id)} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {metaData &&
                        <Box sx={{ pt: 2 }}>
                            <CustomPagination metaData={metaData} onPageChange={(page: number) => dispatch(setPageNumber({pageNumber: page}))} />
                        </Box>
                    }
                </>
            )}
        </div>
    )
}
