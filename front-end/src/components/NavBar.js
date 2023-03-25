import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { IconButton, Stack } from "@mui/material";
import { Button } from "@mui/material";
import FlightTakeoff from "@mui/icons-material/FlightTakeoff";

function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          href={"/home"}
          size="large"
          edge="start"
          color="inherit"
          aria-label="logo"
        >
          <FlightTakeoff />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexgrow: 1, display: { xs: "none", md: "flex" }, mr: 1 }}
        >
          FlyTinerary
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button color="inherit" href={"/itinerary"}>
            MyItinerary
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
