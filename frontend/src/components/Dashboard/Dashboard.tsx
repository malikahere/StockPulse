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


import React, { useState, useEffect } from 'react';
import { Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';

const StockDashboard: React.FC = () => {
  const [stocks, setStocks] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch data from Django backend
    fetch('http://localhost:8000/stocks/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setStocks(data); // Update state with fetched data
      })
      .catch((error) => {
        setError(error.message); // Set error state if fetching fails
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>; // Display error message if fetching fails
  }

  return (
    <div>
      <Typography align='center' variant="h4">Stock Dashboard</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Timestamp</TableCell>
              <TableCell>Open</TableCell>
              <TableCell>High</TableCell>
              <TableCell>Low</TableCell>
              <TableCell>Close</TableCell>
              <TableCell>Volume</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stocks.map((stock, index) => (
              <TableRow key={index}>
                <TableCell>{stock.timestamp}</TableCell>
                <TableCell>{stock.open}</TableCell>
                <TableCell>{stock.high}</TableCell>
                <TableCell>{stock.low}</TableCell>
                <TableCell>{stock.close}</TableCell>
                <TableCell>{stock.volume}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default StockDashboard;
