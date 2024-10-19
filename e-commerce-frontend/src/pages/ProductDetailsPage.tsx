import { useNavigate, useParams } from 'react-router-dom';
import {
    CircularProgress,
    Typography,
    Card,
    CardContent,
    CardMedia,
    Button,
} from '@mui/material';
import { useGetProductById } from '../hooks/ProductHooks';
import { useUpdateCart } from '../hooks/CartHooks';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../store/cartSlice';
import { useEffect, useState } from 'react';
import { RootState } from '../store/store';
import '../css/ProductDetailsPage.css';
import { useAuth } from '../services/AuthContext';

const ProductDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const { product, loading: fetchingProduct, error } = useGetProductById(Number(id));
    const { updateCartHandler, loading: updatingCart } = useUpdateCart();
    const dispatch = useDispatch();
    const cartProducts = useSelector((state: RootState) => state.cart.products) || [];
    const { role, isAuthenticated } = useAuth();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const isProductInCart = product
        ? cartProducts.some((cartProduct) => cartProduct.productId === product.id)
        : false;

    const handleAddToCart = async () => {
        if (product) {
            dispatch(addToCart({ productId: product.id, product, quantity: 1 }));
            await updateCartHandler({
                cartProducts: [...cartProducts, { productId: product.id, product, quantity: 1 }],
            });
        }
    };

    const handleRemoveFromCart = async () => {
        if (product) {
            const updatedCartProducts = cartProducts.filter(
                (cartProduct) => cartProduct.productId !== product.id
            );
            dispatch(removeFromCart(product.id));
            await updateCartHandler({ cartProducts: updatedCartProducts });
        }
    };

    const handleUpdateProduct = () => {
        navigate(`/update-product/${id}`)
    };

    if (fetchingProduct || loading) {
        return <CircularProgress className="loading-spinner" />;
    }

    if (error) {
        return (
            <Typography color="error" className="error-message">
                Error fetching product details
            </Typography>
        );
    }

    if (!product) {
        return <Typography>No product found</Typography>;
    }

    return (
        <Card className="product-details-card">
            <CardMedia
                component="img"
                height="300"
                image={`data:image/png;base64,${product.image}`}
                alt={product.name}
                className="product-image"
            />
            <CardContent className="product-details-content">
                <Typography variant="h4" gutterBottom className="product-title">{product.name}</Typography>
                <Typography variant="body1" gutterBottom className="product-description">{product.description}</Typography>
                <Typography variant="h5" color="primary" className="product-price">${product.price.toFixed(2)}</Typography>
                <Typography variant="body2" color="textSecondary" className="product-category">Category: {product.category}</Typography>
                <Typography variant="body2" color="textSecondary" className="product-quantity">Quantity: {product.quantity}</Typography>

                {isAuthenticated && isProductInCart ? (
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleRemoveFromCart}
                        className="remove-from-cart-button"
                    >
                        Remove from Cart
                    </Button>
                ) : (
                    isAuthenticated && (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddToCart}
                            disabled={updatingCart || loading}
                            className="add-to-cart-button"
                        >
                            {updatingCart ? 'Adding to Cart...' : 'Add to Cart'}
                        </Button>
                    )
                )}

                {role === 'Admin' && (
                    <Button
                        variant="contained"
                        color="warning"
                        onClick={handleUpdateProduct}
                        className="update-product-button"
                    >
                        Update Product
                    </Button>
                )}
            </CardContent>
        </Card>
    );
};

export default ProductDetailsPage;
