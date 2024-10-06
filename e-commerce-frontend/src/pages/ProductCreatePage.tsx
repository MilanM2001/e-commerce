import { Button, Typography, Box, Container, CircularProgress } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../components/InputField';
import { useCreateProduct } from '../hooks/ProductHooks';
import '../css/ProductCreatePage.css';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').min(2, 'Name should be at least 2 characters'),
    description: Yup.string().required('Description is required').min(10, 'Description should be at least 10 characters'),
    price: Yup.number().required('Price is required').positive('Price must be a positive number'),
    quantity: Yup.number().required('Quantity is required').integer('Quantity must be a whole number').min(1, 'Quantity must be at least 1'),
    category: Yup.string().required('Category is required'),
});

const ProductCreatePage = () => {
    const { createProductHandler, loading, errorMessage } = useCreateProduct();

    const handleSubmit = async (values: any) => {
        const productData = {
            name: values.name,
            description: values.description,
            price: values.price,
            quantity: values.quantity,
            category: values.category,
        };

        await createProductHandler(productData);
    };

    return (
        <Container maxWidth="sm" className="product-create-container">
            <Box className="product-create-box">
                <Typography variant="h4" className="product-create-title">Create New Product</Typography>
                <Formik
                    initialValues={{
                        name: '',
                        description: '',
                        price: '',
                        quantity: '',
                        category: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched, handleChange, handleBlur, values }) => (
                        <Form className="product-create-form">
                            <InputField
                                name="name"
                                label="Name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.name && errors.name ? errors.name : ''}
                            />
                            <InputField
                                name="description"
                                label="Description"
                                value={values.description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.description && errors.description ? errors.description : ''}
                            />
                            <InputField
                                name="price"
                                label="Price"
                                type="number"
                                value={values.price}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.price && errors.price ? errors.price : ''}
                            />
                            <InputField
                                name="quantity"
                                label="Quantity"
                                type="number"
                                value={values.quantity}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.quantity && errors.quantity ? errors.quantity : ''}
                            />
                            <InputField
                                name="category"
                                label="Category"
                                value={values.category}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.category && errors.category ? errors.category : ''}
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
                                {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Product'}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Container>
    );
};

export default ProductCreatePage;
