import React, { useState } from 'react';
import RegisterPage from './RegisterPage';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const LoginPage = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        username: '',
        password: ''
    });
    const [touched, setTouched] = useState({
        username: false,
        password: false
    });

    // Validation rules
    const validateField = (name, value) => {
        switch (name) {
            case 'username':
                if (!value.trim()) {
                    return 'Username is required';
                }
                if (value.length < 3) {
                    return 'Username must be at least 3 characters';
                }
                if (value.length > 20) {
                    return 'Username must be less than 20 characters';
                }
                return '';
            
            case 'password':
                if (!value) {
                    return 'Password is required';
                }
                if (value.length < 6) {
                    return 'Password must be at least 6 characters';
                }
                if (!/(?=.*[a-z])(?=.*[A-Z])/.test(value)) {
                    return 'Password must contain both uppercase and lowercase letters';
                }
                return '';
            
            default:
                return '';
        }
    };

    // Handle input changes with validation
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Validate on change if field has been touched
        if (touched[name]) {
            const error = validateField(name, value);
            setErrors(prev => ({
                ...prev,
                [name]: error
            }));
        }
    };

    // Handle field blur (when user leaves the field)
    const handleBlur = (e) => {
        const { name, value } = e.target;
        
        setTouched(prev => ({
            ...prev,
            [name]: true
        }));

        const error = validateField(name, value);
        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };

    // Check if form is valid
    const isFormValid = () => {
        return !errors.username && !errors.password && 
               formData.username.trim() && formData.password;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate all fields on submit
        const newErrors = {
            username: validateField('username', formData.username),
            password: validateField('password', formData.password)
        };
        
        setErrors(newErrors);
        setTouched({ username: true, password: true });

        // Only submit if no errors
        if (!newErrors.username && !newErrors.password) {
            console.log('Form submitted:', formData);
            // Here you would typically make an API call
        } else {
            console.log('Form has validation errors');
        }
    };

    const pagechange = () => {
        setIsRegister(!isRegister);
    };

    if (isRegister) {
        return <RegisterPage />;
    }

    return (
        <Container 
            sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                minHeight: '80vh'
            }}
        >
            <Box 
                sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    maxWidth: '400px',
                    width: '100%',
                    bgcolor: '#E5E3E3',
                    borderRadius: 2,
                    p: 4,
                    boxShadow: 3
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Login
                </Typography>
                
                <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                    <TextField
                        fullWidth
                        name="username"
                        label="Username"
                        variant="outlined"
                        value={formData.username}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        margin="normal"
                        error={!!errors.username}
                        helperText={errors.username}
                        required
                    />
                    
                    <TextField
                        fullWidth
                        name="password"
                        label="Password"
                        variant="outlined"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        margin="normal"
                        error={!!errors.password}
                        helperText={errors.password}
                        required
                    />
                    
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={!isFormValid()}
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Login
                    </Button>
                </Box>
                
                <Button 
                    variant="outlined" 
                    onClick={pagechange}
                    sx={{ mt: 1 }}
                >
                    Register
                </Button>
            </Box>
        </Container>
    );
};

export default LoginPage;
