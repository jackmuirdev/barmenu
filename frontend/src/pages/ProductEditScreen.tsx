import { Typography, Grid, Paper, Box, Button } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import AppTextInput from "../components/common/AppTextInput";
import { Product } from "../models/product";
import { useEffect } from "react";
import useProducts from "../hooks/useProducts";
import AppSelectList from "../components/common/AppSelectList";
import AppDropzone from "../components/common/AppDropzone";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../components/layout/product-edit-page/productValidation";
import axiosApi from "../api/AxiosApi";
import { setProduct } from "../slices/catalogSlice";
import { useDispatch } from "react-redux";
import { LoadingButton } from "@mui/lab";

interface Props {
    product?: Product;
    cancelEdit: () => void;
}

export default function ProductEditScreen({product, cancelEdit}: Props) {
    const { control, reset, handleSubmit, watch, formState: {isDirty, isSubmitting} } = useForm({
        resolver: yupResolver<any>(validationSchema)
    });
    const { brands, categories } = useProducts();
    const watchFile = watch('file', null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (product && !watchFile && !isDirty) {
            reset(product);
        }
        return () => {
            if (watchFile) {
                URL.revokeObjectURL(watchFile.preview);
            }
        }
    }, [product, reset, watchFile, isDirty]);

    async function handleSubmitData(data: FieldValues) {
        try {
            let response: Product;
            if (product) {
                response = await axiosApi.Admin.updateProduct(data);
            } else {
                response = await axiosApi.Admin.createProduct(data);
            }
            dispatch(setProduct(response));
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Box component={Paper} sx={{p: 4}}>
            <Typography variant="h4" gutterBottom sx={{mb: 4}}>
                Product Details
            </Typography>
            <form onSubmit={handleSubmit(handleSubmitData)}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                        <AppTextInput control={control} name='name' label='Product name' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppSelectList control={control} items={brands} name='brand' label='Brand' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppSelectList control={control} items={categories} name='category' label='Category' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppTextInput type="number" control={control} name='price' label='Price' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppTextInput type="number" control={control} name='quantityInStock' label='Quantity in Stock' />
                    </Grid>
                    <Grid item xs={12}>
                        <AppTextInput multiline={true} rows={4} control={control} name='description' label='Description' />
                    </Grid>
                    <Grid item xs={12}>
                        <Box display='flex' justifyContent='space-between' alignItems='center'>
                            <AppDropzone control={control} name='file' />
                            {watchFile ? (
                                <img src={watchFile.preview} alt="preview" style={{maxHeight: 200}} />
                            ) : (
                                <img src={product?.image} alt={product?.name} style={{maxHeight: 200}} />
                            )}
                        </Box>
                    </Grid>
                </Grid>
                <Box display='flex' justifyContent='space-between' sx={{mt: 3}}>
                    <Button onClick={cancelEdit} variant='contained' color='inherit'>Cancel</Button>
                    <LoadingButton loading={isSubmitting} type="submit" variant='contained' color='success'>Submit</LoadingButton>
                </Box>
            </form>
        </Box>
    )
}