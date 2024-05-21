// import React, { useState, useEffect } from 'react';

// interface TimeSeriesData {
//   [timestamp: string]: {
//     "1. open": string;
//     "2. high": string;
//     "3. low": string;
//     "4. close": string;
//     "5. volume": string;
//   };
// }

// const StockDashboard: React.FC = () => {
//   const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesData | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetch('http://localhost:8000/stocks/') // Adjust the URL to your backend API endpoint
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => {
//         if (data && data['Time Series (5min)']) {
//           setTimeSeriesData(data['Time Series (5min)']);
//         } else {
//           throw new Error('Invalid response format');
//         }
//         setLoading(false);
//       })
//       .catch(error => {
//         setError(error.message);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   if (!timeSeriesData) {
//     return <p>No stock data available</p>;
//   }

//   return (
//     <div>
//       <h2>Stock Time Series Data (5min)</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Timestamp</th>
//             <th>Open</th>
//             <th>High</th>
//             <th>Low</th>
//             <th>Close</th>
//             <th>Volume</th>
//           </tr>
//         </thead>
//         <tbody>
//           {Object.entries(timeSeriesData).map(([timestamp, values]) => (
//             <tr key={timestamp}>
//               <td>{timestamp}</td>
//               <td>{values["1. open"]}</td>
//               <td>{values["2. high"]}</td>
//               <td>{values["3. low"]}</td>
//               <td>{values["4. close"]}</td>
//               <td>{values["5. volume"]}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default StockDashboard;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, Button, Typography, Box } from '@mui/material';
// import HomePage from './HomePage';
import HomePage from './components/Homepage';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import Market from './components/Market'; 
import NewsItem from './components/News'; 

// import Login from './Login';

const App: React.FC = () => {
    return (
        <Router>
            <Container>
                <Routes>
                    <Route path="/"  element={<HomePage />} />
                    <Route path="/news" element={<NewsItem />} />
                    <Route path="/market"  element={<Market />} />
                    <Route path="/register" element={<Register />} />
                    {/* <Route path="/login"  */}
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </Container>
        </Router>
    );
};

export default App;



