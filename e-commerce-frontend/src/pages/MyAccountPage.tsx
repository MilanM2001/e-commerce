import { Box, Typography, CircularProgress, Container, Grid, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import '../css/MyAccountPage.css'
import { useGetMe } from '../hooks/AuthHooks';

const MyAccountPage = () => {
    const { getMeHandler, loading, error } = useGetMe();
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const res = await getMeHandler();
            setUserData(res);
        };
        fetchUserData();
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">Failed to load account information</Typography>;
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
                                <Typography variant="h6" className="account-label"><b>Street: </b> {userData.address.street}</Typography>
                                <Typography variant="h6" className="account-label"><b>City:</b> {userData.address.city}</Typography>
                                <Typography variant="h6" className="account-label"><b>Zip Code</b> {userData.address.zipCode}</Typography>
                                <Typography variant="h6" className="account-label"><b>Country:</b> {userData.address.country}</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                ) : (
                    <Typography>No user information available.</Typography>
                )}
            </Paper>
        </Container>
    );
};

export default MyAccountPage;
