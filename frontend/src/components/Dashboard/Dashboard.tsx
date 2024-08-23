
import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Avatar, Menu, MenuItem, ListItemIcon, ListItemText, Container, Box, Grid, Paper, InputBase, IconButton as MuiIconButton, FormControl, InputLabel, Select, MenuItem as MuiMenuItem, SelectChangeEvent } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate instead of useHistory
import SearchIcon from '@mui/icons-material/Search';
import Add from '@mui/icons-material/Add';
import { addToWatchlist } from '../Watchlist/WatchlistActions'; // Adjust import path
import axios from 'axios';

const Dashboard: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [watchlist, setWatchlist] = useState<string>('');
    const [userWatchlists, setUserWatchlists] = useState<string[]>([]);
    const [showPrompt, setShowPrompt] = useState(false);
    const [newWatchlistTitle, setNewWatchlistTitle] = useState('');
    const [isWatchlistFetched, setIsWatchlistFetched] = useState(false);
    const navigate = useNavigate(); // Use useNavigate hook
    const userId = localStorage.getItem('userId');
    if (userId) {
        console.log('User ID:', userId);
      } else {
        console.log('No user ID found in localStorage.');
      }

    useEffect(() => {
        if (userId) {
            fetchWatchlists();
        }
    }, [userId]);
    // , { params: { user_id: userId } }
    const fetchWatchlists = async () => {
        try {
            // const response = await axios.get('http://127.0.0.1:8000/watchlist/uid/${userId}/' );
            const response = await axios.get(`http://127.0.0.1:8000/watchlist/uid/${userId}/`, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('authToken')}`

                }
            });
            const watchlistTitles = response.data.map((watchlist: { title: string }) => watchlist.title);
            setUserWatchlists(watchlistTitles);
            setIsWatchlistFetched(true);
        } catch (error) {
            console.error('Error fetching watchlists:', error);
        }
    };
    
    const handlePromptSubmit = async () => {
        if (newWatchlistTitle) {
            try {
                await addToWatchlist(newWatchlistTitle);
                
                    setWatchlist(newWatchlistTitle);
                    setShowPrompt(false);
                    navigate(`/watchlist/${newWatchlistTitle}`);
                
            } catch (error) {
                console.error('Error adding watchlist:', error);
                // Additional user-friendly error handling
                alert('Failed to add watchlist. Please try again.');
            }
        }
    };

    const handlePromptCancel = () => {
        setShowPrompt(false);
    };

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleWatchlistChange = async (event: SelectChangeEvent<string>) => {
        const selectedWatchlist = event.target.value as string;
        if (selectedWatchlist === 'add_new') {
            setShowPrompt(true);
        } else {
            if (!isWatchlistFetched) {
                await fetchWatchlists();
            }
            setWatchlist(selectedWatchlist);
            navigate(`/watchlist/${selectedWatchlist}`); // Use navigate to change route
        }
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
                            <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}>
                                <InputBase
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder="Enter company name"
                                    value={searchQuery}
                                    onChange={handleSearchInputChange}
                                    inputProps={{ 'aria-label': 'search for company' }}
                                />
                                <MuiIconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={() => {/* Handle search action */}}>
                                    <SearchIcon />
                                </MuiIconButton>
                            </Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth>
                                <InputLabel id="watchlist-select-label">Watchlists</InputLabel>
                                <Select
                                    labelId="watchlist-select-label"
                                    id="watchlist-select"
                                    value={watchlist}
                                    onChange={handleWatchlistChange}
                                    inputProps={{ 'aria-label': 'select watchlist' }}
                                >
                                    <MuiMenuItem value="">
                                        <em>Select Watchlist</em>
                                    </MuiMenuItem>
                                    {userWatchlists.map((name) => (
                                        <MuiMenuItem key={name} value={name}>
                                            {name}
                                        </MuiMenuItem>
                                    ))}
                                    <MuiMenuItem value="add_new">
                                        <em>Add New Watchlist</em>
                                    </MuiMenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    {showPrompt && (
                        <div>
                            <input
                                type="text"
                                placeholder="Enter new watchlist title"
                                value={newWatchlistTitle}
                                onChange={(e) => setNewWatchlistTitle(e.target.value)}
                            />
                            <button onClick={handlePromptSubmit}>Submit</button>
                            <button onClick={handlePromptCancel}>Cancel</button>
                        </div>
                    )}
                </Box>
            </Container>
        </div>
    );
};

export default Dashboard;
    