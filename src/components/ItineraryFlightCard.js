import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { Button, TextField } from "@mui/material";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import axios from "axios";

function ItineraryFlightCard(props) {
  const [showInfo, setShowInfo] = useState(true);
  const [flightPrice, setFlightPrice] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleShowInput = () => {
    setShowInput(true);
  };

  const handleCloseInput = () => {
    setShowInput(false);
  };

  const handlePriceChange = () => {
    if (flightPrice === "") {
      alert("Please enter a valid price.");
    } else {
      handleSubmit();
      handleCloseInput();
    }
  };

  //Set whether the flight info is displayed or not
  const handleCardSelect = () => {
    setShowInfo(!showInfo);
  };

  //Delete Flight Details from Database by flightID
  const handleDeleteFromItinerary = async (event) => {
    event.preventDefault();
    await axios
      .delete(`http://localhost:4000/flights/${props.flightId}`)
      .then((response) => {
        console.log(response);
      });
    alert("Flight removed from your Itinerary!");
    props.setRerender(!props.rerender);
  };

  //Update flight price in database
  const handleSubmit = async () => {
    await axios
      .put(`http://localhost:4000/flights/${props.flightId}`, {
        price: flightPrice,
      })
      .then((response) => {
        console.log(response);
      });
    alert("Flight price updated!");
    props.setRerender(!props.rerender);
  };

  console.log(flightPrice);
  return (
    <Card
      sx={{
        width: "auto",
        height: "105px",
        m: 1.5,
        boxShadow: 5,
        overflow: "hidden",
        alignItems: "center",
        "&:hover": {
          cursor: "pointer",
          transform: "scale(1.02)",
        },
      }}
      elevation={5}
      style={{ backgroundColor: "white" }}
      onClick={handleCardSelect}
    >
      {showInfo && (
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            mb: -1,
          }}
        >
          <Box sx={{ mr: -4, ml: -3 }}>
            <Box
              component="img"
              src={props.logo}
              sx={{ width: "50%", height: "50%" }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "18%",
            }}
          >
            <Typography variant="h5" color="text.secondary">
              {props.depIata1}
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: "16px" }}>
              {props.depTime1}
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: "12px" }}>
              {props.depDate1}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body3"
              color="text.primary"
              sx={{ fontSize: "12px" }}
            >
              {props.name}
            </Typography>
            <KeyboardDoubleArrowRightIcon />
            <Typography
              variant="body3"
              color="text.secondary"
              sx={{ fontSize: "14px" }}
            >
              {props.duration}
            </Typography>
            <Typography
              variant="body3"
              color="text.secondary"
              sx={{ fontSize: "9px" }}
            >
              DAY | HOUR | MIN
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "18%",
            }}
          >
            <Typography variant="h5" color="text.secondary">
              {props.arrIata3
                ? props.arrIata3
                : props.arrIata2
                ? props.arrIata2
                : props.arrIata1}
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: "16px" }}>
              {props.arrTime3
                ? props.arrTime3
                : props.arrTime2
                ? props.arrTime2
                : props.arrTime1}
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: "12px" }}>
              {props.arrDate3
                ? props.arrDate3
                : props.arrDate2
                ? props.arrDate2
                : props.arrDate1}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{ textAlign: "right" }}
            >
              {props.currency}
              {props.price.toFixed(0)}
            </Typography>
          </Box>
        </CardContent>
      )}
      {!showInfo && (
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",

            gap: 4,
          }}
        >
          <Button
            color="success"
            variant="contained"
            onClick={handleShowInput}
            sx={{
              fontFamily: "Poppins",
              fontSize: "15px",
              m: "auto",
            }}
          >
            Change Flight Price
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleDeleteFromItinerary}
            sx={{
              fontFamily: "Poppins",
              fontSize: "15px",
              m: "auto",
            }}
          >
            Remove from Itinerary
          </Button>
        </CardContent>
      )}
      {showInput && (
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            mb: -1,
            gap: 1,
            height: "70%",
          }}
        >
          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Price"
            type="number"
            fullWidth
            value={flightPrice}
            onChange={(e) => setFlightPrice(e.target.value)}
          />
          <Button
            color="success"
            variant="contained"
            onClick={handlePriceChange}
            sx={{
              fontFamily: "Poppins",
              fontSize: "15px",
            }}
          >
            Submit
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleCloseInput}
            sx={{
              fontFamily: "Poppins",
              fontSize: "15px",
            }}
          >
            Cancel
          </Button>
        </CardContent>
      )}
    </Card>
  );
}

export default ItineraryFlightCard;
