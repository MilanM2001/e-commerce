import { useParams } from 'react-router-dom';
import { CircularProgress, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';
import { useGetProductById } from '../hooks/ProductHooks';
import { useUpdateCart } from '../hooks/CartHooks';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { addToCart, removeFromCart } from '../store/cartSlice';
import '../css/ProductDetailsPage.css';
import { useEffect, useState } from 'react';

const ProductDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const { product, loading: fetchingProduct, error } = useGetProductById(Number(id));
    const { updateCartHandler, loading: updatingCart } = useUpdateCart();
    const dispatch = useDispatch();
    const cartProducts = useSelector((state: RootState) => state.cart.products) || []; // Ensure it's always an array

    const [loading, setLoading] = useState(true);

    // Simulate loading delay of 1 second
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    // Check if the product is defined before accessing its properties
    const isProductInCart = product && Array.isArray(cartProducts)
        ? cartProducts.some((cartProduct) => cartProduct.productId === product.id)
        : false;

    const handleAddToCart = async () => {
        if (product) {
            // Add product to cart
            dispatch(addToCart({ productId: product.id, product, quantity: 1 }));
            await updateCartHandler({ cartProducts: [...cartProducts, { productId: product.id, product, quantity: 1 }] });
        }
    };

    const handleRemoveFromCart = async () => {
        if (product) {
            // Remove product from cart
            const updatedCartProducts = cartProducts.filter(cartProduct => cartProduct.productId !== product.id);
            dispatch(removeFromCart(product.id));
            await updateCartHandler({ cartProducts: updatedCartProducts });
        }
    };

    if (fetchingProduct || loading) {
        return <CircularProgress className="loading-spinner" />;
    }

    if (error) {
        return <Typography color="error" className="error-message">Error fetching product details</Typography>;
    }

    if (!product) {
        return <Typography className="no-product-message">No product found</Typography>;
    }

    return (
        <Card className="product-details-card">
            <CardMedia
                component="img"
                height="300"
                image="https://cdn.pixabay.com/photo/2013/07/13/09/46/basketball-155997_1280.png"
                alt={product.name}
                className="product-image"
            />
            <CardContent className="product-details-content">
                <Typography variant="h4" gutterBottom className="product-title">{product.name}</Typography>
                <Typography variant="body1" gutterBottom className="product-description">{product.description}</Typography>
                <Typography variant="h5" color="primary" className="product-price">${product.price.toFixed(2)}</Typography>
                <Typography variant="body2" color="textSecondary" className="product-category">Category: {product.category}</Typography>
                <Typography variant="body2" color="textSecondary" className="product-quantity">Quantity: {product.quantity}</Typography>

                {isProductInCart ? (
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleRemoveFromCart}
                        className="remove-from-cart-button"
                    >
                        Remove from Cart
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddToCart}
                        disabled={updatingCart || loading} // Disable button while updating cart or loading
                        className="add-to-cart-button"
                    >
                        {updatingCart ? 'Adding to Cart...' : 'Add to Cart'}
                    </Button>
                )}
            </CardContent>
        </Card>
    );
};

export default ProductDetailsPage;
