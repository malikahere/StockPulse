// // components/Watchlist/Watchlist.tsx
// import React from 'react';
// import { Button, TextField } from '@mui/material' ;

// const WatchlistPage: React.FC = () => {
//   // Fetch watchlist data from backend

//   return (
//     <div>
//       <h2>My Watchlist</h2>
//       {/* Display watchlist items */}
//     </div>
//   );
// }

// export default WatchlistPage;
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, Paper, InputBase, IconButton, Container, Grid } from '@mui/material';
import { Search } from '@mui/icons-material';

const WatchlistPage: React.FC = () => {
    const { watchlistName } = useParams<{ watchlistName: string }>();
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    return (
        <Container>
            <Box textAlign={'center'} sx={{ marginTop: '120px' }}>
                <Typography variant="h5" gutterBottom>
                    Search to Add in Your Watchlist: {watchlistName}
                </Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={9}>
                        <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}>
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Search"
                                inputProps={{ 'aria-label': 'search' }}
                                value={searchQuery}
                                onChange={handleSearchInputChange}
                            />
                            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                                <Search />
                            </IconButton>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default WatchlistPage;
