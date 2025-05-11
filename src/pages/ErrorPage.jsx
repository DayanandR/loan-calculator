import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        px: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Something went wrong in the application
      </Typography>
      <Link to={"/"}>
        <Button sx={{ mt: 2 }} variant="outlined">
          GO HOME
        </Button>
      </Link>
    </Box>
  );
};

export default ErrorPage;
