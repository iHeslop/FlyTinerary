import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import { Button } from "@mui/material";
import FlightTakeoff from "@mui/icons-material/FlightTakeoff";
import "../fonts/Poppins-Medium.ttf";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { Menu, MenuItem } from "@mui/material";

function NavBar(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    const fNameStorage = localStorage.getItem("fName");
    if (fNameStorage) {
      props.setFname(fNameStorage);
    }
  }, []);
  return (
    <AppBar
      position="absolute"
      width="100%"
      sx={{
        backgroundColor: "rgba(237, 231, 225, 0.85)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <IconButton
            href={"/home"}
            edge="start"
            color="rgba(8, 14, 44, 1)"
            aria-label="logo"
          >
            <FlightTakeoff
              style={{ fontSize: 30, color: "rgba(8, 14, 44, 1)" }}
            />
          </IconButton>
          <Typography
            component="div"
            color="rgba(8, 14, 44, 1)"
            sx={{
              ml: 1,
              fontFamily: "Poppins",
              fontSize: "25px",
            }}
          >
            FlyTinerary
          </Typography>
        </Box>

        <Typography sx={{ fontFamily: "Poppins" }} color="rgba(8, 14, 44, 1)">
          Welcome {props.fName}!
        </Typography>
        <div sx={{ display: "flex", alignItems: "center" }}>
          <Button
            href={"/itinerary"}
            sx={{
              fontFamily: "Poppins",
              ml: 1,
              mr: 1.5,
              color: "rgba(8, 14, 44, 1)",
              fontSize: "25px",
              textTransform: "inherit",
            }}
          >
            MyItinerary
          </Button>
          <IconButton
            onClick={handleMenuOpen}
            edge="start"
            color="rgba(8, 14, 44, 1)"
            aria-label="logo"
          >
            <PermIdentityIcon
              style={{ fontSize: 30, color: "rgba(8, 14, 44, 1)" }}
            />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem
              onClick={handleLogout}
              style={{
                fontFamily: "Poppins",
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
