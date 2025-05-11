import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  CircularProgress,
} from "@mui/material";

const ExchangeRates = () => {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_LOAN_EXCHANGE_API);
        const data = res.data.conversion_rates;
        setRates(Object.entries(data));
      } catch (err) {
        console.error("Failed to fetch exchange rates:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Live Exchange Rates (Base: USD)
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Currency</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Rate</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rates
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(([currency, rate]) => (
                    <TableRow key={currency}>
                      <TableCell>{currency}</TableCell>
                      <TableCell align="right">{rate}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={rates.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 20, 50]}
          />
        </Paper>
      )}
    </Box>
  );
};

export default ExchangeRates;
