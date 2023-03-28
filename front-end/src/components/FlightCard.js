import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import axios from "axios";

function FlightCard(props) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const userIdStorage = localStorage.getItem("userId");
    if (userIdStorage) {
      props.setUserId(userIdStorage);
    }
  }, []);

  const handleCardSelect = () => {
    setShowButton(!showButton);
  };

  const handleAddToItinerary = async (event) => {
    event.preventDefault();
    const response = await axios
      .post("http://localhost:4000/flights/create", {
        name: props.name,
        userId: props.userId,
        price: props.price,
        currency: props.currency,
        duration: props.duration,
        logo: props.logo,
        depIata1: props.depIata1,
        depTime1: props.depTime1,
        depDate1: props.depDate1,
        arrIata1: props.arrIata1,
        arrTime1: props.arrTime1,
        arrDate1: props.arrIata1,
        depIata2: props.depIata2,
        depTime2: props.depTime2,
        depDate2: props.depDate2,
        arrIata2: props.arrIata2,
        arrTime2: props.arrTime2,
        arrDate2: props.arrIata2,
      })
      .then((response) => {
        console.log(response);
      });
    alert("Flight added to your Itinerary!");
  };

  return (
    <Card
      sx={{ width: "auto", height: "auto", margin: 4, boxShadow: 10 }}
      elevation={5}
      style={{ backgroundColor: "white" }}
      onClick={handleCardSelect}
    >
      <CardContent sx={{ display: "flex", flexDirection: "row" }}>
        <Box
          component="img"
          src={props.logo}
          sx={{ width: "10%", height: "10%" }}
        />

        <Typography variant="body1" color="text.primary">
          {props.currency}
        </Typography>
        <Typography variant="body1" color="text.primary">
          {props.price}
        </Typography>
        <Typography variant="body1" color="text.primary">
          {props.duration}
        </Typography>
        <Typography variant="body3" color="text.secondary">
          {props.name}
        </Typography>
        <Typography variant="body3" color="text.secondary">
          {props.depIata1}
        </Typography>
        <Typography variant="body3" color="text.secondary">
          {props.depTime1}
        </Typography>
        <Typography variant="body3" color="text.secondary">
          {props.depDate1}
        </Typography>
        <Typography variant="body3" color="text.secondary">
          {props.arrIata1}
        </Typography>
        <Typography variant="body3" color="text.secondary">
          {props.arrTime1}
        </Typography>
        <Typography variant="body3" color="text.secondary">
          {props.arrDate1}
        </Typography>
        <Typography variant="body3" color="text.secondary">
          {props.depIata2}
        </Typography>
        <Typography variant="body3" color="text.secondary">
          {props.depTime2}
        </Typography>
        <Typography variant="body3" color="text.secondary">
          {props.depDate2}
        </Typography>
        <Typography variant="body3" color="text.secondary">
          {props.arrIata2}
        </Typography>
        <Typography variant="body3" color="text.secondary">
          {props.arrTime2}
        </Typography>
        <Typography variant="body3" color="text.secondary">
          {props.arrDate2}
        </Typography>
        {showButton && (
          <Button variant="contained" onClick={handleAddToItinerary}>
            Add to MyItinerary
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export default FlightCard;
