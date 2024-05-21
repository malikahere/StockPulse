import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
    return (
        <Box textAlign="center" marginY={5}>
            <Typography variant="h2">Welcome to StockPulse</Typography>
            <Button variant="contained" color="primary" component={Link} to="/register">
                Sign Up
            </Button>
            <Button variant="contained" color="secondary" component={Link} to="/login" style={{ marginLeft: '1rem' }}>
                Login
            </Button>
        </Box>
    );
};

export default HomePage;
