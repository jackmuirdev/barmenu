import * as yup from 'yup';

export const validationSchema = yup.object({
  name: yup.string().required('Product name is required'),
  brand: yup.string().required('Brand is required'),
  category: yup.string().required('Category is required'),
  price: yup.number().required('Price is required').positive('Price must be a positive number'),
  quantityInStock: yup.number().required('Quantity in stock is required').positive('Quantity must be a positive number'),
  description: yup.string().required('Description is required'),
  file: yup.mixed().when('image', {
    is: (value: string) => !value,
    then: schema => schema.required('Image is required'),
    otherwise: schema => schema.notRequired()
  })
});
