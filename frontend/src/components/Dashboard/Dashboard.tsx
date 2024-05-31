import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Container, Grid, Paper, IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Avatar, FormControl, Select, MenuItem as SelectMenuItem, SelectChangeEvent, InputBase } from '@mui/material';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { Add, Search } from '@mui/icons-material';

const Dashboard: React.FC = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [watchlist, setWatchlist] = React.useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [userWatchlists, setUserWatchlists] = useState<string[]>(['Watchlist 1', 'Watchlist 2', 'Watchlist 3']);
    const navigate = useNavigate();

    const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleWatchlistChange = (event: SelectChangeEvent<string>) => {
      if (event.target.value === 'add_new') {
          // Logic to add a new watchlist (e.g., open a dialog to enter watchlist name)
          const newWatchlistName = prompt("Enter the name of the new watchlist:");
          if (newWatchlistName) {
              setUserWatchlists([...userWatchlists, newWatchlistName]);
              setWatchlist(newWatchlistName);
                navigate(`/watchlist/${newWatchlistName}`);
          }
      } else {
          setWatchlist(event.target.value);
      }
  };
    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div>
            <AppBar position="static" color="info">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        STOCKPULSE
                    </Typography>
                    <Button color="inherit" component={Link} to="/">
                        Home
                    </Button>
                    <Button color="inherit" component={Link} to="/market">
                        Market
                    </Button>
                    <Button color="inherit" component={Link} to="/news">
                        News
                    </Button>
                    <div></div>
                    <IconButton
                        size="large"
                        edge="end"
                        color="inherit"
                        onClick={handleMenuClick}
                    >
                        <Avatar />
                    </IconButton>
                    <Menu
                        id="user-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'user-menu',
                        }}
                    >
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                {/* Add icon for changing username */}
                            </ListItemIcon>
                            <ListItemText primary="Change Username" />
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                {/* Add icon for changing password */}
                            </ListItemIcon>
                            <ListItemText primary="Change Password" />
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                {/* Add icon for logout */}
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Container>
                <Box textAlign={'center'} sx={{ marginTop: '120px' }}>
                    <Typography variant="h5" gutterBottom>
                        Search for a Company 🔍
                    </Typography>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={9}>
                            {/* Search Input */}
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
                        <Grid textAlign={'center'} item xs={3}>
                            <FormControl fullWidth>
                            <Select
                                    value={watchlist}
                                    onChange={handleWatchlistChange}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Select Watchlist' }}
                                >
                                    <SelectMenuItem value="" disabled>
                                        My Watchlists 🔽
                                    </SelectMenuItem>
                                    <SelectMenuItem value="add_new">
                                        <ListItemIcon>
                                            <Add />
                                        </ListItemIcon>
                                        <ListItemText primary="Add Watchlist" />
                                    </SelectMenuItem>
                                    {userWatchlists.map((watchlistName, index) => (
                                        <SelectMenuItem key={index} value={watchlistName}>
                                            {watchlistName}
                                        </SelectMenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </div>
    );
};

export default Dashboard;
