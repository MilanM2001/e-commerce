import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGetMyCart } from '../hooks/CartHooks';
import { useCreateOrder } from '../hooks/OrderHooks'; // Assuming the hook is in OrderHooks
import '../css/CartPage.css';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { CartProduct } from '../model/cartProduct';
import { CircularProgress, Button, Typography } from '@mui/material';

const CartPage = () => {
    const { getMyCartHandler, loading: loadingCart, error: cartError } = useGetMyCart();
    const { createOrderHandler, loading: creatingOrder, error: orderError } = useCreateOrder();

    const cart = useSelector((state: RootState) => state.cart);

    useEffect(() => {
        const fetchCart = async () => {
            await getMyCartHandler();
        };
        fetchCart();
    }, []);

    const handleBuyClick = async () => {
        const orderRequest = {
            totalAmount: cart.totalPrice,
            cartProducts: cart.products.map((cartProduct: CartProduct) => ({
                productId: cartProduct.productId,
                product: cartProduct.product,
                quantity: cartProduct.quantity,
            })),
        };

        await createOrderHandler(orderRequest);
    };

    if (loadingCart) return <CircularProgress />;
    if (cartError) return <Typography color="error">Error loading cart.</Typography>;

    return (
        <div className="cart-page">
            {cart.products.length > 0 ? (
                <div className="cart-container">
                    <div className="cart-items">
                        <h2>My Cart</h2>
                        {cart.products.map((cartProduct: CartProduct) => (
                            <div key={cartProduct.productId} className="cart-item">
                                <h3>{cartProduct.product.name}</h3>
                                <p>{cartProduct.product.description}</p>
                                <p>Price: ${cartProduct.product.price.toFixed(2)}</p>
                                <p>Quantity: {cartProduct.quantity}</p>
                                <p>
                                    Total: ${(
                                        cartProduct.product.price *
                                        cartProduct.quantity
                                    ).toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <h2>Summary</h2>
                        <p>Total Price: ${cart.totalPrice.toFixed(2)}</p>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleBuyClick}
                            disabled={creatingOrder}
                            className="buy-button"
                        >
                            {creatingOrder ? <CircularProgress size={24} /> : 'Buy'}
                        </Button>
                        {orderError && <Typography color="error">Error while submitting the order</Typography>}
                    </div>
                </div>
            ) : (
                <div className="empty-cart">
                    <p>Your cart is empty</p>
                    <Link to="/" className="go-home-button">
                        Go back to main page
                    </Link>
                </div>
            )}
        </div>
    );
};

export default CartPage;
