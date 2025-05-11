import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Switch,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState, useContext } from "react";
import { ColorModeContext } from "../components/ThemeProviderWrapper";
import { NavLink } from "react-router-dom";

const pages = [
  { name: "Home", path: "/" },
  { name: "Exchange Rates (LIVE)", path: "/exchange_rates" },
];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const theme = useTheme();
  const { toggleColorMode } = useContext(ColorModeContext);

  const handleOpenNavMenu = (e) => setAnchorElNav(e.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={NavLink}
          to="/"
          sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
        >
          Loan Calculator
        </Typography>

        <Box
          sx={{
            display: {
              xs: "none",
              md: "flex",
              alignContent: "center",
            },
          }}
        >
          {pages.map((page) => (
            <NavLink
              key={page.name}
              to={page.path}
              onClick={handleCloseNavMenu}
              style={({ isActive }) => ({
                textDecoration: "none",
                backgroundColor: isActive
                  ? theme.palette.mode === "dark"
                    ? "#212121"
                    : theme.palette.primary.light
                  : "inherit",
                color: "white",
                fontWeight: isActive ? "bold" : "normal",
              })}
            >
              <MenuItem>{page.name}</MenuItem>
            </NavLink>
          ))}
          <Switch
            checked={theme.palette.mode === "dark"}
            onChange={toggleColorMode}
          />
        </Box>

        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton color="inherit" onClick={handleOpenNavMenu}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorElNav}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
          >
            {pages.map((page) => (
              <MenuItem
                key={page.name}
                onClick={handleCloseNavMenu}
                component={NavLink}
                to={page.path}
              >
                {page.name}
              </MenuItem>
            ))}
            <MenuItem>
              <Switch
                checked={theme.palette.mode === "dark"}
                onChange={toggleColorMode}
              />
              <Typography variant="body2" ml={1}>
                Dark Mode
              </Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
