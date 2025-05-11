import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [termYears, setTermYears] = useState(5);
  const [emi, setEmi] = useState(null);
  const [currency, setCurrency] = useState("USD");
  const [conversionRates, setConversionRates] = useState({});
  const [amortizationData, setAmortizationData] = useState([]);

  const fetchConversionRates = async () => {
    const res = await axios.get(import.meta.env.VITE_LOAN_EXCHANGE_API);
    setConversionRates(res.data.conversion_rates);
  };

  useEffect(() => {
    fetchConversionRates();
  }, []);

  const calculateEMI = () => {
    const principal = Number(loanAmount);
    const annualInterest = Number(interestRate);
    const monthlyInterest = annualInterest / 12 / 100;
    const months = Number(termYears) * 12;

    const emiCalc =
      (principal * monthlyInterest * Math.pow(1 + monthlyInterest, months)) /
      (Math.pow(1 + monthlyInterest, months) - 1);

    setEmi(emiCalc.toFixed(2));

    let balance = principal;
    const schedule = [];

    for (let month = 1; month <= months; month++) {
      const interest = balance * monthlyInterest;
      const principalPaid = emiCalc - interest;
      balance -= principalPaid;
      schedule.push({
        month,
        principal: principalPaid,
        interest,
        balance: balance < 0 ? 0 : balance,
      });
    }

    setAmortizationData(schedule);
  };

  const resetTable = () => {
    setLoanAmount("");
    setInterestRate("");
    setTermYears("");
    setEmi(null);
    setAmortizationData([]);
  };

  const convertedEMI =
    emi && conversionRates[currency]
      ? (emi * conversionRates[currency]).toFixed(2)
      : "0.00";

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        Loan Calculator Dashboard
      </Typography>

      <Box display="flex" gap={2} mb={2}>
        <TextField
          label="Loan Amount"
          type="number"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
        />
        <TextField
          label="Interest Rate (%)"
          type="number"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
        />
        <TextField
          label="Term (Years)"
          type="number"
          value={termYears}
          onChange={(e) => setTermYears(e.target.value)}
        />
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={calculateEMI}
        sx={{ mb: 4 }}
      >
        CALCULATE
      </Button>

      {emi && (
        <>
          <Typography variant="h6">Monthly EMI: ${emi}</Typography>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Box>
              <Typography variant="caption">Currency</Typography>
              <br />
              <Select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                {Object.keys(conversionRates).map((cur) => (
                  <MenuItem key={cur} value={cur}>
                    {cur}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Typography>
              Converted EMI: {convertedEMI} {currency}
            </Typography>
            <Box flex={1} />
            <Button
              variant="outlined"
              color="secondary"
              onClick={resetTable}
              sx={{ borderColor: "#c94bf4", color: "#c94bf4" }}
            >
              RESET TABLE
            </Button>
          </Box>

          <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Month</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Principal</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Interest</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Remaining Balance</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {amortizationData.map((item) => (
                  <TableRow key={item.month}>
                    <TableCell>{item.month}</TableCell>
                    <TableCell>
                      {(item.principal * conversionRates[currency]).toFixed(2)}{" "}
                      {currency}
                    </TableCell>
                    <TableCell>
                      {(item.interest * conversionRates[currency]).toFixed(2)}{" "}
                      {currency}
                    </TableCell>
                    <TableCell>
                      {(item.balance * conversionRates[currency]).toFixed(2)}{" "}
                      {currency}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  );
};

export default LoanCalculator;
