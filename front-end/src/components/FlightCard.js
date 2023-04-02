import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import axios from "axios";

function FlightCard(props) {
  const [showInfo, setShowInfo] = useState(true);

  useEffect(() => {
    const userIdStorage = localStorage.getItem("userId");
    if (userIdStorage) {
      props.setUserId(userIdStorage);
    }
  }, []);

  const handleCardSelect = () => {
    setShowInfo(!showInfo);
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
        arrDate1: props.arrDate1,
        depIata2: props.depIata2,
        depTime2: props.depTime2,
        depDate2: props.depDate2,
        arrIata2: props.arrIata2,
        arrTime2: props.arrTime2,
        arrDate2: props.arrDate2,
        arrDate3: props.arrDate3,
        arrIata3: props.arrIata3,
        arrTime3: props.arrTime3,
      })
      .then((response) => {
        console.log(response);
      });
    alert("Flight added to your Itinerary!");
  };

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
            mb: -1,
            height: "75%",
          }}
        >
          <Button
            color="success"
            variant="contained"
            onClick={handleAddToItinerary}
            sx={{
              fontFamily: "Poppins",
              fontSize: "15px",
            }}
          >
            Add to MyItinerary
          </Button>
        </CardContent>
      )}
    </Card>
  );
}

export default FlightCard;
