import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetMyCart } from '../hooks/CartHooks';
import '../css/CartPage.css';
import { CartResponseDto } from '../model/cart';

const CartPage = () => {
    const { getMeHandler, loading, error } = useGetMyCart();
    const [cart, setCart] = useState<CartResponseDto | null>(null);

    useEffect(() => {
        const fetchCart = async () => {
            const cartData = await getMeHandler();
            if (cartData) setCart(cartData);
        };
        fetchCart();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading cart.</p>;

    return (
        <div className="cart-page">
            {cart && cart.products.length > 0 ? (
                <div className="cart-container">
                    <div className="cart-items">
                        <h2>My Cart</h2>
                        {cart.products.map((product) => (
                            <div key={product.id} className="cart-item">
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <p>Price: ${product.price}</p>
                                <p>Quantity: {product.quantity}</p>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <h2>Summary</h2>
                        <p>Total Price: ${cart.totalPrice}</p>
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
