import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import styles from '../styles/RegisterPage.module.css';

const RegisterPage: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        street: '',
        city: '',
        zipcode: '',
        country: ''
    });
    const [errors, setErrors] = useState({ email: '', password: '', name: '', address: '' });

    const validateFields = () => {
        const newErrors = { email: '', password: '', name: '', address: '' };
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.street || !formData.city || !formData.zipcode || !formData.country) {
            newErrors.address = 'Complete address is required';
        }
        setErrors(newErrors);
        return !newErrors.email && !newErrors.password && !newErrors.name && !newErrors.address;
    };

    const handleSubmit = () => {
        if (validateFields()) {
            // Perform registration logic
        }
    };

    return (
        <Container className={styles.container}>
            <Typography variant="h4">Register</Typography>
            <TextField
                label="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                fullWidth
                margin="normal"
                error={!!errors.email}
                helperText={errors.email}
            />
            <TextField
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                fullWidth
                margin="normal"
                error={!!errors.password}
                helperText={errors.password}
            />
            <TextField
                label="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                fullWidth
                margin="normal"
                error={!!errors.name}
                helperText={errors.name}
            />
            {/* Additional fields for street, city, zipcode, country */}
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Register
            </Button>
        </Container>
    );
};

export default RegisterPage;
