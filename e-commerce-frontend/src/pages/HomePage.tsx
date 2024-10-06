import { Typography, Card, CardContent, CardMedia, CircularProgress, Grid, TextField, Box } from '@mui/material';
import { useGetAllProducts } from '../hooks/ProductHooks';
import '../css/HomePage.css';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const { books, loading, error } = useGetAllProducts();
    const navigate = useNavigate();

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">Error fetching products</Typography>;
    }

    const handleProductClick = (id: number) => {
        navigate(`/product/${id}`);
    };

    return (
        <div className='main'>
            <Box textAlign="center" marginBottom={4}>
                <Typography className='title' variant="h4" gutterBottom>
                    Available products
                </Typography>
                <TextField
                    variant="outlined"
                    placeholder="Search for products..."
                    fullWidth
                    style={{ maxWidth: '400px', margin: '0 auto' }}
                />
                <Grid container spacing={4} style={{ padding: '16px' }}>
                    {books.map((product) => (
                        <Grid item xs={12} sm={6} md={4} key={product.id}>
                            <Card className="product-card">
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image="https://cdn.pixabay.com/photo/2013/07/13/09/46/basketball-155997_1280.png"
                                    alt={product.name}
                                    onClick={() => handleProductClick(product.id)} // Handle image click
                                    style={{ cursor: 'pointer' }} // Cursor style for image
                                />
                                <CardContent>
                                    <Typography
                                        variant="h6"
                                        onClick={() => handleProductClick(product.id)} // Handle title click
                                        style={{ cursor: 'pointer' }} // Cursor style for title
                                    >
                                        {product.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {product.description}
                                    </Typography>
                                    <Typography variant="h6">${product.price.toFixed(2)}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    );
};

export default HomePage;
