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



  
  export {};