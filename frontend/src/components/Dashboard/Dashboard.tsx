// components/Dashboard/Dashboard.tsx
// import React, { useEffect, useState } from 'react';
// import { Card, CardContent, Typography } from '@mui/material';
// import axios from 'axios';

// const DashboardPage: React.FC = () => {
//   const [stocks, setStocks] = useState<any[]>([]);

//   useEffect(() => {
//     // Fetch stock data from backend
//     axios.get('/api/stocks')
//       .then(response => {
//         setStocks(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching stock data:', error);
//       });
//   }, []);

//   return (
//     <div>
//       <h2>Dashboard</h2>
//       {stocks.map(stock => (
//         <Card key={stock.symbol}>
//           <CardContent>
//             <Typography variant="h5">{stock.symbol}</Typography>
//             <Typography variant="body1">Price: {stock.close}</Typography>
//             {/* Display other stock information */}
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// }

// export default DashboardPage;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';

// interface Stock {
//   timestamp: string;
//   open: number;
//   high: number;
//   low: number;
//   close: number;
//   volume: number;
// }

// const StockDashboard: React.FC = () => {
//   const [stocks, setStocks] = useState<Stock[]>([]);

//   useEffect(() => {
//     const fetchStockData = async () => {
//       try {
//         const response = await axios.get('http://127.0.0.1:8000/stocks/');
//         console.log(response.data);
//         setStocks(response.data);
//       } catch (error) {
//         console.error('Error fetching stock data:', error);
//       }
//     };

  //   fetchStockData();
  // }, []);

  import React from 'react';
  import { AppBar, Toolbar, Typography, Box,Button, Container, Grid, Paper, Tabs, Tab, IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Avatar, FormControl, Select, MenuItem as SelectMenuItem, SelectChangeEvent } from '@mui/material';
  import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

  import { Search } from '@mui/icons-material';
  
  const Dashboard: React.FC = () => {
      const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
      const [watchlist, setWatchlist] = React.useState<string>('');

      const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
          setAnchorEl(event.currentTarget);
      };
  
      const handleClose = () => {
          setAnchorEl(null);
      };

      const handleWatchlistChange = (event: SelectChangeEvent<string>) => {
        setWatchlist(event.target.value);
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
                          // sx={{ marginRight: '20px' }}
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
                      <Typography  variant="h5" gutterBottom>
                          Search for a Company 🔍
                      </Typography>
                      <Grid container spacing={2} alignItems="center">
                          <Grid item xs={9}>
                              {/* Add search bar here */}
                          </Grid>
                          <Grid textAlign={'center'}   item xs={3}>
                            <FormControl fullWidth  >
                                <Select
                                    value={watchlist}
                                    onChange={handleWatchlistChange}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Select Watchlist' }}
                                >
                                    <SelectMenuItem value="" disabled>
                                        My Watchlists 🔽
                                    </SelectMenuItem>
                                    {/* Add watchlist options here */}
                                    <SelectMenuItem value="watchlist1">Watchlist 1</SelectMenuItem>
                                    <SelectMenuItem value="watchlist2">Watchlist 2</SelectMenuItem>
                                    <SelectMenuItem value="watchlist3">Watchlist 3</SelectMenuItem>
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
  
  