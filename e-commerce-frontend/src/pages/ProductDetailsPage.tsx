import { useParams } from 'react-router-dom';
import { CircularProgress, Typography, Card, CardContent, CardMedia } from '@mui/material';
import { useGetProductById } from '../hooks/ProductHooks';
import '../css/ProductDetailsPage.css';

const ProductDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const { book, loading, error } = useGetProductById(Number(id));

    if (loading) {
        return <CircularProgress className="loading-spinner" />;
    }

    if (error) {
        return <Typography color="error" className="error-message">Error fetching product details</Typography>;
    }

    if (!book) {
        return <Typography className="no-product-message">No product found</Typography>;
    }

    return (
        <Card className="product-details-card">
            <CardMedia
                component="img"
                height="300"
                image="https://cdn.pixabay.com/photo/2013/07/13/09/46/basketball-155997_1280.png"
                alt={book.name}
                className="product-image"
            />
            <CardContent className="product-details-content">
                <Typography variant="h4" gutterBottom className="product-title">{book.name}</Typography>
                <Typography variant="body1" gutterBottom className="product-description">{book.description}</Typography>
                <Typography variant="h5" color="primary" className="product-price">${book.price.toFixed(2)}</Typography>
                <Typography variant="body2" color="textSecondary" className="product-category">Category: {book.category}</Typography>
                <Typography variant="body2" color="textSecondary" className="product-quantity">Quantity: {book.quantity}</Typography>
            </CardContent>
        </Card>
    );
};

export default ProductDetailsPage;
