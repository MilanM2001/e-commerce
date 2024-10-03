import React from 'react';
import { TextField } from '@mui/material';

interface InputFieldProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    type?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, error, type = 'text' }) => {
    return (
        <TextField
            label={label}
            value={value}
            onChange={onChange}
            fullWidth
            margin="normal"
            type={type}
            error={!!error}
            helperText={error}
        />
    );
};

export default InputField;
