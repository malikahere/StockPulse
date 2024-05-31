import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, Container, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

interface OHLCVData {
    timestamp: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

const StockPage: React.FC = () => {
    const { stockSymbol } = useParams<{ stockSymbol: string }>();
    const [ohlcvData, setOhlcvData] = useState<OHLCVData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchStockDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/stocks/`);
                const stockData = response.data;
                const parsedData: OHLCVData[] = Object.keys(stockData).map((timestamp) => ({
                    timestamp,
                    open: parseFloat(stockData[timestamp]["1. open"]),
                    high: parseFloat(stockData[timestamp]["2. high"]),
                    low: parseFloat(stockData[timestamp]["3. low"]),
                    close: parseFloat(stockData[timestamp]["4. close"]),
                    volume: parseFloat(stockData[timestamp]["5. volume"]),
                }));
                setOhlcvData(parsedData);
            } catch (error) {
                console.error('Error fetching stock details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStockDetails();
    }, [stockSymbol]);

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Container>
            <Box textAlign="center" marginTop={4}>
                <Typography variant="h4">Stock Details for {stockSymbol}</Typography>
                <TableContainer component={Paper} style={{ marginTop: 16 }}>
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
                            {ohlcvData.map((data) => (
                                <TableRow key={data.timestamp}>
                                    <TableCell>{data.timestamp}</TableCell>
                                    <TableCell>{data.open}</TableCell>
                                    <TableCell>{data.high}</TableCell>
                                    <TableCell>{data.low}</TableCell>
                                    <TableCell>{data.close}</TableCell>
                                    <TableCell>{data.volume}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    );
};

export default StockPage;
