// // import React, { useState, useEffect } from 'react';
// // import { Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
// // import axios from 'axios';

// // interface MarketData {
// //     market_type: string;
// //     region: string;
// //     primary_exchanges: string;
// //     local_open: string;
// //     local_close: string;
// //     current_status: string;
// //     notes: string;
// // }

// // interface TickerData {
// //     ticker: string;
// //     price: string;
// //     change_amount: string;
// //     change_percentage: string;
// //     volume: string;
// // }

// // const Market: React.FC = () => {
// //     const [marketData, setMarketData] = useState<MarketData[]>([]);
// //     const [topGainers, setTopGainers] = useState<TickerData[]>([]);
// //     const [topLosers, setTopLosers] = useState<TickerData[]>([]);
// //     const [mostActivelyTraded, setMostActivelyTraded] = useState<TickerData[]>([]);

// //     useEffect(() => {
// //         const fetchMarketData = async () => {
// //             try {
// //                 const responseMarket = await axios.get('https://www.alphavantage.co/query?function=MARKET_STATUS&apikey=LHOAXJY8A88KGR4S');
// //                 const responseGainersLosers = await axios.get('https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=LHOAXJY8A88KGR4S');
// //                 setMarketData(responseMarket.data.markets);
// //                 setTopGainers(responseGainersLosers.data.top_gainers);
// //                 setTopLosers(responseGainersLosers.data.top_losers);
// //                 setMostActivelyTraded(responseGainersLosers.data.most_actively_traded);
// //             } catch (error) {
// //                 console.error('Error fetching market data', error);
// //             }
// //         };

// //         fetchMarketData();
// //     }, []);

// //     const renderTable = (title: string, data: TickerData[]) => (
// //         <>
// //             <Typography variant="h5" gutterBottom>
// //                 {title}
// //             </Typography>
// //             <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
// //                 <Table>
// //                     <TableHead>
// //                         <TableRow>
// //                             <TableCell>Ticker</TableCell>
// //                             <TableCell>Price</TableCell>
// //                             <TableCell>Change Amount</TableCell>
// //                             <TableCell>Change Percentage</TableCell>
// //                             <TableCell>Volume</TableCell>
// //                         </TableRow>
// //                     </TableHead>
// //                     <TableBody>
// //                         {data.map((ticker, index) => (
// //                             <TableRow key={index}>
// //                                 <TableCell>{ticker.ticker}</TableCell>
// //                                 <TableCell>{ticker.price}</TableCell>
// //                                 <TableCell>{ticker.change_amount}</TableCell>
// //                                 <TableCell>{ticker.change_percentage}</TableCell>
// //                                 <TableCell>{ticker.volume}</TableCell>
// //                             </TableRow>
// //                         ))}
// //                     </TableBody>
// //                 </Table>
// //             </TableContainer>
// //         </>
// //     );

// //     return (
// //         <Box padding={3}>
// //             <Typography variant="h4" gutterBottom>
// //                 Global Market Status
// //             </Typography>
// //             <TableContainer component={Paper}>
// //                 <Table>
// //                     <TableHead>
// //                         <TableRow>
// //                             <TableCell>Market Type</TableCell>
// //                             <TableCell>Region</TableCell>
// //                             <TableCell>Primary Exchanges</TableCell>
// //                             <TableCell>Local Open</TableCell>
// //                             <TableCell>Local Close</TableCell>
// //                             <TableCell>Status</TableCell>
// //                             <TableCell>Notes</TableCell>
// //                         </TableRow>
// //                     </TableHead>
// //                     <TableBody>
// //                         {marketData.map((market, index) => (
// //                             <TableRow key={index}>
// //                                 <TableCell>{market.market_type}</TableCell>
// //                                 <TableCell>{market.region}</TableCell>
// //                                 <TableCell>{market.primary_exchanges}</TableCell>
// //                                 <TableCell>{market.local_open}</TableCell>
// //                                 <TableCell>{market.local_close}</TableCell>
// //                                 <TableCell>{market.current_status}</TableCell>
// //                                 <TableCell>{market.notes}</TableCell>
// //                             </TableRow>
// //                         ))}
// //                     </TableBody>
// //                 </Table>
// //             </TableContainer>

// //             {renderTable('Top Gainers', topGainers)}
// //             {renderTable('Top Losers', topLosers)}
// //             {renderTable('Most Actively Traded', mostActivelyTraded)}
// //         </Box>
// //     );
// // };

// // export default Market;
// import React, { useState, useEffect } from 'react';
// import { Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
// import axios from 'axios';

// interface TickerData {
//     ticker: string;
//     price: string;
//     change_amount: string;
//     change_percentage: string;
//     volume: string;
// }

// const Market: React.FC = () => {
//     const [topGainers, setTopGainers] = useState<TickerData[]>([]);
//     const [topLosers, setTopLosers] = useState<TickerData[]>([]);
//     const [mostActivelyTraded, setMostActivelyTraded] = useState<TickerData[]>([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get('https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo');
//                 setTopGainers(response.data.top_gainers);
//                 setTopLosers(response.data.top_losers);
//                 setMostActivelyTraded(response.data.most_actively_traded);
//             } catch (error) {
//                 console.error('Error fetching market data', error);
//             }
//         };

//         fetchData();
//     }, []);

//     const renderTable = (title: string, data: TickerData[]) => (
//         <>
//             <Typography variant="h5" gutterBottom>
//                 {title}
//             </Typography>
//             <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Ticker</TableCell>
//                             <TableCell>Price</TableCell>
//                             <TableCell>Change Amount</TableCell>
//                             <TableCell>Change Percentage</TableCell>
//                             <TableCell>Volume</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {data.map((ticker, index) => (
//                             <TableRow key={index}>
//                                 <TableCell>{ticker.ticker}</TableCell>
//                                 <TableCell>{ticker.price}</TableCell>
//                                 <TableCell>{ticker.change_amount}</TableCell>
//                                 <TableCell>{ticker.change_percentage}</TableCell>
//                                 <TableCell>{ticker.volume}</TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </>
//     );

//     return (
//         <Box padding={3}>
//             {renderTable('Top Gainers', topGainers)}
//             {renderTable('Top Losers', topLosers)}
//             {renderTable('Most Actively Traded', mostActivelyTraded)}
//         </Box>
//     );
// };

// export default Market;

import React, { useState, useEffect } from 'react';
import { Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';

interface MarketData {
    market_type: string;
    region: string;
    primary_exchanges: string;
    local_open: string;
    local_close: string;
    current_status: string;
    notes: string;
}

interface TickerData {
    ticker: string;
    price: string;
    change_amount: string;
    change_percentage: string;
    volume: string;
}

const Market: React.FC = () => {
    const [marketData, setMarketData] = useState<MarketData[]>([]);
    const [topGainers, setTopGainers] = useState<TickerData[]>([]);
    const [topLosers, setTopLosers] = useState<TickerData[]>([]);
    const [mostActivelyTraded, setMostActivelyTraded] = useState<TickerData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const marketResponse = await axios.get('https://www.alphavantage.co/query?function=MARKET_STATUS&apikey=demo');
                const topResponse = await axios.get('https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo');
                
                setMarketData(marketResponse.data.markets);
                setTopGainers(topResponse.data.top_gainers);
                setTopLosers(topResponse.data.top_losers);
                setMostActivelyTraded(topResponse.data.most_actively_traded);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, []);

    const renderMarketTable = () => (
        <>
            <Typography variant="h4" gutterBottom>
                Global Market Open & Close Status
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Market Type</TableCell>
                            <TableCell>Region</TableCell>
                            <TableCell>Primary Exchanges</TableCell>
                            <TableCell>Local Open</TableCell>
                            <TableCell>Local Close</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Notes</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {marketData.map((market, index) => (
                            <TableRow key={index}>
                                <TableCell>{market.market_type}</TableCell>
                                <TableCell>{market.region}</TableCell>
                                <TableCell>{market.primary_exchanges}</TableCell>
                                <TableCell>{market.local_open}</TableCell>
                                <TableCell>{market.local_close}</TableCell>
                                <TableCell>{market.current_status}</TableCell>
                                <TableCell>{market.notes}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );

    const renderTable = (title: string, data: TickerData[]) => (
        <>
            <Typography variant="h5" gutterBottom>
                {title}
            </Typography>
            <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ticker</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Change Amount</TableCell>
                            <TableCell>Change Percentage</TableCell>
                            <TableCell>Volume</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((ticker, index) => (
                            <TableRow key={index}>
                                <TableCell>{ticker.ticker}</TableCell>
                                <TableCell>{ticker.price}</TableCell>
                                <TableCell>{ticker.change_amount}</TableCell>
                                <TableCell>{ticker.change_percentage}</TableCell>
                                <TableCell>{ticker.volume}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );

    return (
        <Box padding={3}>
            {renderMarketTable()}
            {renderTable('Top Gainers', topGainers)}
            {renderTable('Top Losers', topLosers)}
            {renderTable('Most Actively Traded', mostActivelyTraded)}
        </Box>
    );
};

export default Market;
