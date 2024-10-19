import { Box, Typography, CircularProgress, Container, Grid, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import '../css/MyAccountPage.css';
import { useGetMe } from '../hooks/AuthHooks';
import { useGetMyOrders } from '../hooks/OrderHooks'; // Assuming this is your hook for fetching orders.

const MyAccountPage = () => {
    const { getMeHandler, loading: loadingUser, error: errorUser } = useGetMe();
    const { orders, loading: loadingOrders, error: errorOrders } = useGetMyOrders();
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const res = await getMeHandler();
            setUserData(res);
        };
        fetchUserData();
    }, []);

    if (loadingUser || loadingOrders) {
        return <CircularProgress />;
    }

    if (errorUser || errorOrders) {
        return <Typography color="error">Failed to load account or order information</Typography>;
    }

    return (
        <Container className="account-container">
            <Paper className="account-box" elevation={3}>
                <Box mb={5} textAlign="center">
                    <Typography variant="h4" className="account-title">My Information</Typography>
                </Box>
                {userData ? (
                    <Grid container spacing={4} className="account-grid">
                        <Grid item xs={12} sm={6}>
                            <Box className="account-detail-box">
                                <Typography variant="h6" className="account-label"><b>Email:</b> {userData.email}</Typography>
                                <Typography variant="h6" className="account-label"><b>Name:</b> {userData.name}</Typography>
                                <Typography variant="h6" className="account-label"><b>Role:</b> {userData.role}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Box className="account-address-box">
                                <Typography variant="h6" className="account-label"><b>Street:</b> {userData.address.street}</Typography>
                                <Typography variant="h6" className="account-label"><b>City:</b> {userData.address.city}</Typography>
                                <Typography variant="h6" className="account-label"><b>Zip Code:</b> {userData.address.zipCode}</Typography>
                                <Typography variant="h6" className="account-label"><b>Country:</b> {userData.address.country}</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                ) : (
                    <Typography>No user information available.</Typography>
                )}
            </Paper>

            <Box mt={5}>
                <Typography variant='h4' className="orders-title">My Orders</Typography>
                {orders.length > 0 ? (
                    <Box className="orders-list">
                        {orders.map((order) => (
                            <Paper key={order.id} className="order-item" elevation={2}>
                                <Typography variant="body1"><b>Date:</b> {new Date(order.orderDate).toLocaleDateString()}</Typography>
                                <Typography variant="body1"><b>Total Amount:</b> ${order.totalAmount.toFixed(2)}</Typography>
                                <Box mt={2}>
                                    <Typography variant="subtitle1" className="ordered-products-title"><b>Ordered Products:</b></Typography>
                                    <ul className="ordered-products-list">
                                        {order.orderedProducts.map((product) => (
                                            <li key={product.id}>
                                                <Typography variant="body2">{product.productName} - Quantity: {product.quantity}</Typography>
                                            </li>
                                        ))}
                                    </ul>
                                </Box>
                            </Paper>
                        ))}
                    </Box>
                ) : (
                    <Typography>No orders found</Typography>
                )}
            </Box>
        </Container>
    );
};

export default MyAccountPage;
