import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ReactBoxFlip from "react-box-flip";
import { useState } from "react";
import FlightTakeoff from "@mui/icons-material/FlightTakeoff";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../fonts/Poppins-Medium.ttf";

function LoginForm(props) {
  const [cardFlip, setCardFlip] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lName, setLname] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.get("http://localhost:4000/users");
    const users = response.data.data;
    users.forEach((user) => {
      const { email, password } = user;
    });
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      props.onFNameChange(user.fname);
      props.onUserIdChange(user.userId);
      navigate("/home");
    } else {
      setErrorMessage("Invalid email or password! Try Again!");
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    const response = await axios
      .post("http://localhost:4000/users/create", {
        fname: props.fName,
        lname: lName,
        email: email,
        password: password,
      })
      .then((response) => {
        const newUserId = response.data.data.userId;
        console.log(newUserId);
        props.onUserIdChange(newUserId);
      });
    navigate("/home");
  };

  return (
    <div>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          mt: 15,
        }}
      >
        <CssBaseline />
        <ReactBoxFlip isFlipped={cardFlip} flipDirection="horizontal">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: 5,
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              borderRadius: 13,
              padding: 3,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "grey" }}>
              <FlightTakeoff />
            </Avatar>
            <Typography sx={{ fontFamily: "Poppins", fontSize: "35px" }}>
              FlyTinerary
            </Typography>
            <Grid container spacing={1} sx={{}}>
              <Button
                color="primary"
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  width: "50%",
                  fontFamily: "Poppins",
                  fontSize: "18px",
                }}
                onClick={() => {
                  setCardFlip(false);
                }}
              >
                Log In
              </Button>
              <Button
                color="grey"
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  width: "50%",
                  fontFamily: "Poppins",
                  fontSize: "18px",
                }}
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
                id="loginEmail"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMessage("");
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="loginPassword"
                autoComplete="current-password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMessage("");
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, fontFamily: "Poppins", fontSize: "15px" }}
              >
                Log In
              </Button>
              <Typography>{errorMessage}</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: 5,
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              borderRadius: 13,
              padding: 3,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "grey" }}>
              <FlightTakeoff />
            </Avatar>
            <Typography sx={{ fontFamily: "Poppins", fontSize: "35px" }}>
              FlyTinerary
            </Typography>
            <Grid container spacing={1}>
              <Button
                color="grey"
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  width: "50%",
                  fontFamily: "Poppins",
                  fontSize: "18px",
                }}
                onClick={() => {
                  setCardFlip(false);
                }}
              >
                Log In
              </Button>
              <Button
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  width: "50%",
                  fontFamily: "Poppins",
                  fontSize: "18px",
                }}
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
              onSubmit={handleSignUp}
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
                    onChange={(e) => props.onFNameChange(e.target.value)}
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
                    onChange={(e) => setLname(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="signupEmail"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="signupPassword"
                    autoComplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, fontFamily: "Poppins", fontSize: "15px" }}
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        </ReactBoxFlip>
      </Container>
    </div>
  );
}

export default LoginForm;
