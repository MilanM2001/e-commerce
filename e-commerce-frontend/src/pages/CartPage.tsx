import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGetMyCart } from '../hooks/CartHooks';
import '../css/CartPage.css';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store'; // Make sure the path is correct
import { CartProduct } from '../model/cartProduct';

const CartPage = () => {
    const { getMyCartHandler, loading, error } = useGetMyCart();
    const cart = useSelector((state: RootState) => state.cart); // Select the cart from the Redux store

    useEffect(() => {
        const fetchCart = async () => {
            await getMyCartHandler();
        };
        fetchCart();
    }, [getMyCartHandler]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading cart.</p>;

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
                                    Total: $
                                    {(cartProduct.product.price * cartProduct.quantity).toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <h2>Summary</h2>
                        <p>Total Price: ${cart.totalPrice.toFixed(2)}</p>
                        <button className="buy-button">Buy</button>
                    </div>
                </div>
            ) : (
                <div className="empty-cart">
                    <p>Your cart is empty</p>
                    <Link to="/" className="go-home-button">Go back to main page</Link>
                </div>
            )}
        </div>
    );
};

export default CartPage;
