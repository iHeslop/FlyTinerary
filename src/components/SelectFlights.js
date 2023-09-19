import React, { useEffect, useState } from "react";
import axios from "axios";
import FlightCard from "./FlightCard";
import { Typography, Box, Button, Grid, LinearProgress } from "@mui/material";

function SelectFlights(props) {
  const [flights, setFlights] = useState([]);
  const [isLoaded, setisLoaded] = useState(false);

  const options = {
    method: "GET",
    url:
      "https://priceline-com-provider.p.rapidapi.com/v2/flight/" +
      props.flightType +
      "",
    params: {
      departure_date: props.selectedDate,
      adults: "1",
      sid: "iSiX639",
      origin_airport_code: props.departureAirport.iata,
      destination_airport_code: props.arrivalAirport.iata,
      currency: "AUD",
    },
    headers: {
      "X-RapidAPI-Key": "d5d47b738amsh0218173db374270p186c18jsnae1665f158e0",
      "X-RapidAPI-Host": "priceline-com-provider.p.rapidapi.com",
    },
  };

  //Getting flights data from API
  useEffect(() => {
    axios
      .request(options)
      .then((response) => {
        const apiFlightType = props.apiFlightType;
        setFlights(response.data[apiFlightType].results.result.itinerary_data);
        setisLoaded(true);
      })
      .catch((error) => {
        console.error(error);
        setFlights([]);
        setisLoaded(true);
      });
  }, [props.showFlights]);

  //Previous button
  const handlePrevClick = () => {
    if (props.currentIndex > 0) {
      props.setCurrentIndex(props.currentIndex - 6);
    }
  };
  //Next button
  const handleNextClick = () => {
    if (props.currentIndex < Object.keys(flights).length - 6) {
      props.setCurrentIndex(props.currentIndex + 6);
    }
  };

  return (
    <div>
      {!isLoaded && <LinearProgress sx={{ marginTop: "3%" }} />}
      {isLoaded && flights.length === 0 && (
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontSize: "20px",
            textAlign: "center",
            marginTop: "3%",
          }}
        >
          No Flights Found
        </Typography>
      )}
      {isLoaded && flights.length !== 0 && (
        <div>
          <div style={{ height: "280px", overflowY: "scroll" }}>
            <Box wrap="wrap">
              {Object.keys(flights)
                .slice(props.currentIndex, props.currentIndex + 6)
                .map((key) => (
                  <Grid item xs={12} md={12} lg={12} key={key}>
                    <FlightCard
                      userId={props.userId}
                      setUserId={props.setUserId}
                      price={flights[key].price_details.source_total_fare}
                      name={flights[key].slice_data.slice_0.airline.name}
                      currency={flights[key].price_details.source_symbol}
                      logo={flights[key].slice_data.slice_0.airline.logo}
                      duration={flights[key].slice_data.slice_0.info.duration}
                      ////Flight Details
                      depIata1={
                        flights[key].slice_data.slice_0.flight_data.flight_0
                          .departure.airport.code
                      }
                      arrIata1={
                        flights[key].slice_data.slice_0.flight_data.flight_0
                          .arrival.airport.code
                      }
                      depIata2={
                        flights[key].slice_data.slice_0.flight_data.flight_1
                          ?.departure.airport.code
                      }
                      arrIata2={
                        flights[key].slice_data.slice_0.flight_data.flight_1
                          ?.arrival.airport.code
                      }
                      arrIata3={
                        flights[key].slice_data.slice_0.flight_data.flight_2
                          ?.arrival.airport.code
                      }
                      depTime1={
                        flights[key].slice_data.slice_0.flight_data.flight_0
                          .departure.datetime.time_24h
                      }
                      arrTime1={
                        flights[key].slice_data.slice_0.flight_data.flight_0
                          .arrival.datetime.time_24h
                      }
                      depTime2={
                        flights[key].slice_data.slice_0.flight_data.flight_1
                          ?.departure.datetime.time_24h
                      }
                      arrTime2={
                        flights[key].slice_data.slice_0.flight_data.flight_1
                          ?.arrival.datetime.time_24h
                      }
                      arrTime3={
                        flights[key].slice_data.slice_0.flight_data.flight_2
                          ?.arrival.datetime.time_24h
                      }
                      depDate1={
                        flights[key].slice_data.slice_0.flight_data.flight_0
                          .departure.datetime.date
                      }
                      arrDate1={
                        flights[key].slice_data.slice_0.flight_data.flight_0
                          .arrival.datetime.date
                      }
                      depDate2={
                        flights[key].slice_data.slice_0.flight_data.flight_1
                          ?.departure.datetime.date
                      }
                      arrDate2={
                        flights[key].slice_data.slice_0.flight_data.flight_1
                          ?.arrival.datetime.date
                      }
                      arrDate3={
                        flights[key].slice_data.slice_0.flight_data.flight_2
                          ?.arrival.datetime.date
                      }
                    />
                  </Grid>
                ))}
            </Box>
          </div>
          <Box
            justifyContent="center"
            sx={{
              paddingTop: "3%",
              maxWidth: "100%",
              flexGrow: 1,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "5%",
            }}
          >
            <Button
              style={{ backgroundColor: "grey" }}
              variant="contained"
              onClick={handlePrevClick}
            >
              Prev
            </Button>
            <Typography>
              {props.currentIndex} - {props.currentIndex + 6}
            </Typography>

            <Button
              style={{ backgroundColor: "grey" }}
              variant="contained"
              onClick={handleNextClick}
            >
              Next
            </Button>
          </Box>
        </div>
      )}
    </div>
  );
}

export { SelectFlights };
