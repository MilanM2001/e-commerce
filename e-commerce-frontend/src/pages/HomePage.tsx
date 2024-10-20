import { Typography, Card, CardContent, CardMedia, CircularProgress, Grid, TextField, Box, Button } from '@mui/material';
import { useGetAllProductsPageable } from '../hooks/ProductHooks';
import '../css/HomePage.css';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const { products, loading, error, totalRecords, pageNumber, setPageNumber, pageSize } = useGetAllProductsPageable();
    const navigate = useNavigate();
    const totalPages = Math.ceil(totalRecords / pageSize);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">Error fetching products</Typography>;
    }

    const handleProductClick = (id: number) => {
        navigate(`/product/${id}`);
    };

    const handlePageChange = (newPageNumber: number) => {
        setPageNumber(newPageNumber);
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
                    {products.map((product) => (
                        <Grid item xs={12} sm={6} md={4} key={product.id}>
                            <Card className="product-card">
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={`data:image/png;base64,${product.image}`}
                                    alt={product.name}
                                    onClick={() => handleProductClick(product.id)}
                                    style={{ cursor: 'pointer' }}
                                />
                                <CardContent>
                                    <Typography
                                        variant="h6"
                                        onClick={() => handleProductClick(product.id)}
                                        style={{ cursor: 'pointer' }}
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

                {/* Pagination Controls */}
                <Box marginTop={4} display="flex" justifyContent="center">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <Button
                            key={index + 1}
                            variant={index + 1 === pageNumber ? "contained" : "outlined"}
                            color="primary"
                            onClick={() => handlePageChange(index + 1)}
                            style={{ margin: '0 5px' }}
                        >
                            {index + 1}
                        </Button>
                    ))}
                </Box>
            </Box>
        </div>
    );
};

export default HomePage;
