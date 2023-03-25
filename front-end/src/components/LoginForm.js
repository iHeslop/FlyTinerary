import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ReactBoxFlip from "react-box-flip";
import { useState } from "react";
import FlightTakeoff from "@mui/icons-material/FlightTakeoff";

const theme = createTheme();
function LoginForm() {
  const [cardFlip, setCardFlip] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{ mt: 10 }}>
        <CssBaseline />
        <ReactBoxFlip isFlipped={cardFlip} flipDirection="horizontal">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: 5,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <FlightTakeoff />
            </Avatar>
            <Grid container spacing={1} xs={12} sm={6}>
              <Button
                variant="contained"
                sx={{ mt: 3, mb: 2, width: "50%" }}
                onClick={() => {
                  setCardFlip(false);
                }}
              >
                Log In
              </Button>
              <Button
                variant="contained"
                sx={{ mt: 3, mb: 2, width: "50%" }}
                onClick={() => {
                  setCardFlip(true);
                }}
              >
                Sign Up
              </Button>
            </Grid>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: 5,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <FlightTakeoff />
            </Avatar>
            <Grid container spacing={1} xs={12} sm={6}>
              <Button
                variant="contained"
                sx={{ mt: 3, mb: 2, width: "50%" }}
                onClick={() => {
                  setCardFlip(false);
                }}
              >
                Log In
              </Button>
              <Button
                variant="contained"
                sx={{ mt: 3, mb: 2, width: "50%" }}
                onClick={() => {
                  setCardFlip(true);
                }}
              >
                Sign Up
              </Button>
            </Grid>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        </ReactBoxFlip>
      </Container>
    </ThemeProvider>
  );
}

export default LoginForm;
