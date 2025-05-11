import { Box, Typography } from "@mui/material";
import LoanCalculator from "./LoanCalculator";

const Home = () => (
  <Box p={3}>
    <Typography variant="h4">Welcome to the Exchange Rate App</Typography>
    <Typography mt={2}>
      Get live currency exchange rates based on USD.
    </Typography>
    <Box>
      <LoanCalculator />
    </Box>
  </Box>
);
export default Home;
