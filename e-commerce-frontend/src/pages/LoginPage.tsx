import React, { useState } from 'react';
import { Button, Typography, Box, Container } from '@mui/material';
import '../css/LoginPage.css';
import InputField from '../components/InputField';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        if (event.target.value.length < 5 || event.target.value.length > 50) {
            setEmailError('Email should be between 5 and 50 characters');
        } else {
            setEmailError('');
        }
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        if (event.target.value.length < 8 || event.target.value.length > 20) {
            setPasswordError('Password should be between 8 and 20 characters');
        } else {
            setPasswordError('');
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!email || !password) {
            if (!email) setEmailError('Email is required');
            if (!password) setPasswordError('Password is required');
            return;
        }
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <Container maxWidth="sm" className="login-container">
            <Box className="login-box">
                <Typography variant="h4" className="login-title">Login</Typography>
                <form onSubmit={handleSubmit} className="login-form">
                    <InputField
                        label="Email"
                        value={email}
                        onChange={handleEmailChange}
                        error={emailError}
                    />
                    <InputField
                        label="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        error={passwordError}
                        type="password"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        className="login-button"
                    >
                        Login
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default LoginPage;
