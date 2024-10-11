import { Button, Typography, Box, Container, CircularProgress } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../components/InputField';
import { useUpdateProduct } from '../hooks/ProductHooks';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../css/ProductCreatePage.css';
import { getProductById } from '../services/ProductService';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').min(2, 'Name should be at least 2 characters'),
    description: Yup.string().required('Description is required').min(10, 'Description should be at least 10 characters'),
    price: Yup.number().required('Price is required').positive('Price must be a positive number'),
    quantity: Yup.number().required('Quantity is required').integer('Quantity must be a whole number').min(1, 'Quantity must be at least 1'),
    category: Yup.string().required('Category is required'),
});

const ProductUpdatePage = () => {
    const { id } = useParams<{ id: string }>();
    const { updateProductHandler, loading, errorMessage } = useUpdateProduct();
    const [product, setProduct] = useState<any>(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            const productData = await getProductById(Number(id));
            setProduct(productData);
        };

        fetchProductDetails();
    }, [id]);

    const handleSubmit = async (values: any) => {
        const productUpdate = {
            name: values.name,
            description: values.description,
            price: values.price,
            quantity: values.quantity,
            category: values.category,
        };

        await updateProductHandler(Number(id), productUpdate);
    };

    if (!product) {
        return <CircularProgress />;
    }

    return (
        <Container maxWidth="sm" className="product-create-container">
            <Box className="product-create-box">
                <Typography variant="h4" className="product-create-title">Update Product</Typography>
                <Formik
                    initialValues={{
                        name: product.name || '',
                        description: product.description || '',
                        price: product.price || '',
                        quantity: product.quantity || '',
                        category: product.category || '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize // This ensures that the form is updated when the product is fetched
                >
                    {({ errors, touched, handleChange, handleBlur, values }) => (
                        <Form className="product-create-form">
                            <InputField
                                name="name"
                                label="Name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.name && typeof errors.name === 'string' ? errors.name : ''} // Ensure `error` is a string
                            />
                            <InputField
                                name="description"
                                label="Description"
                                value={values.description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.description && typeof errors.description === 'string' ? errors.description : ''} // Ensure `error` is a string
                            />
                            <InputField
                                name="price"
                                label="Price"
                                type="number"
                                value={values.price}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.price && typeof errors.price === 'string' ? errors.price : ''} // Ensure `error` is a string
                            />
                            <InputField
                                name="quantity"
                                label="Quantity"
                                type="number"
                                value={values.quantity}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.quantity && typeof errors.quantity === 'string' ? errors.quantity : ''} // Ensure `error` is a string
                            />
                            <InputField
                                name="category"
                                label="Category"
                                value={values.category}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.category && typeof errors.category === 'string' ? errors.category : ''} // Ensure `error` is a string
                            />
                            {errorMessage && <Typography color="error">{errorMessage}</Typography>}
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                className="product-create-button"
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24} color="inherit" /> : 'Update Product'}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Container>
    );
};

export default ProductUpdatePage;
