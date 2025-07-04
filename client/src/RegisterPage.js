import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [touched, setTouched] = useState({
        firstname: false,
        lastname: false,
        email: false,
        password: false,
        confirmPassword: false
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
    };
    const validateField = (name, value) => {
        switch (name) {
            case 'firstname':
                return value.trim() ? '' : 'First name is required';
            case 'lastname':
                return value.trim() ? '' : 'Last name is required';
            case 'email':
                return value.trim() ? '' : 'Email is required';
            case 'password':
                return value.trim() ? '' : 'Password is required';
            case 'confirmPassword':
                return value.trim() ? '' : 'Confirm password is required';
            default:
                return '';
        }
    };
    const validateAllFields = () => {
        const newErrors = {
            firstname: validateField('firstname', formData.firstname),
            lastname: validateField('lastname', formData.lastname),
            email: validateField('email', formData.email),
            password: validateField('password', formData.password),
            confirmPassword: validateField('confirmPassword', formData.confirmPassword)
        };
        setErrors(newErrors);
        setTouched(prev => ({ ...prev, firstname: true, lastname: true, email: true, password: true, confirmPassword: true }));
        return !newErrors.firstname && !newErrors.lastname && !newErrors.email && !newErrors.password && !newErrors.confirmPassword;
    };
    const handleSubmit = (e) => { 
        e.preventDefault();
        const isValid = validateAllFields();
        setIsFormValid(isValid);
        if (isValid) {
            console.log(formData);
        } else {
            console.log('Form is invalid');
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    return(
        <Container
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80vh'
        }}>
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
        }}>
        <Typography variant="h4" component="h1" gutterBottom>
            Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
                fullWidth
                name="firstname"
                label="First Name"
                variant="outlined"
                value={formData.firstname}
                onChange={handleInputChange}
                onBlur={handleBlur}
                error={touched.firstname && !!errors.firstname}
                helperText={touched.firstname ? errors.firstname : ''}
                margin="normal"
                required
            /> 
            <TextField
                fullWidth
                name="lastname"
                label="Last Name"
                variant="outlined"
                value={formData.lastname}
                onChange={handleInputChange}
                onBlur={handleBlur}
                error={touched.lastname && !!errors.lastname}
                helperText={touched.lastname ? errors.lastname : ''}
                margin="normal"
                required
            />
            <TextField
                fullWidth
                name="email"
                label="Email"
                variant="outlined"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                error={touched.email && !!errors.email}
                helperText={touched.email ? errors.email : ''}
                margin="normal"
                required
            />
            <TextField
                fullWidth
                name="password"
                label="Password"
                variant="outlined"
                value={formData.password}
                onChange={handleInputChange}
                onBlur={handleBlur}
                margin="normal"
                error={touched.password && !!errors.password}
                helperText={touched.password ? errors.password : ''}
                required
            />
            <TextField
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                variant="outlined"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                onBlur={handleBlur}
                margin="normal"
                error={touched.confirmPassword && !!errors.confirmPassword}
                helperText={touched.confirmPassword ? errors.confirmPassword : ''}
                required
            />
            <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!isFormValid}
            >
                Register
            </Button>
            </Box>
        </Box>
        </Container>
    );
};

export default RegisterPage;