import React, { useEffect, useState } from "react";
import axios from "axios";
import FlightCard from "./FlightCard";
import Grid from "@mui/material/Grid";

function SelectFlights(props) {
  const [flights, setFlights] = useState([]);

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

  useEffect(() => {
    axios
      .request(options)
      .then((response) => {
        setFlights(
          response.data.getAirFlightDepartures.results.result.itinerary_data
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(flights);

  return (
    <div>
      <Grid wrap="wrap" container spacing={2}>
        {Object.keys(flights)
          .slice(0, 6)
          .map((key) => (
            <Grid item xs={12} md={12} lg={12} key={key}>
              <FlightCard
                price={flights[key].price_details.source_total_fare}
                name={flights[key].slice_data.slice_0.airline.name}
                currency={flights[key].price_details.source_symbol}
                logo={flights[key].slice_data.slice_0.airline.logo}
                duration={flights[key].slice_data.slice_0.info.duration}
                ////Flight Details
                depIata1={
                  flights[key].slice_data.slice_0.flight_data.flight_0.departure
                    .airport.code
                }
                arrIata1={
                  flights[key].slice_data.slice_0.flight_data.flight_0.arrival
                    .airport.code
                }
                depIata2={
                  flights[key].slice_data.slice_0.flight_data.flight_1.departure
                    .airport.code
                }
                arrIata2={
                  flights[key].slice_data.slice_0.flight_data.flight_1.arrival
                    .airport.code
                }
                depTime1={
                  flights[key].slice_data.slice_0.flight_data.flight_0.departure
                    .datetime.time_24h
                }
                arrTime1={
                  flights[key].slice_data.slice_0.flight_data.flight_0.arrival
                    .datetime.time_24h
                }
                depTime2={
                  flights[key].slice_data.slice_0.flight_data.flight_1.departure
                    .datetime.time_24h
                }
                arrTime2={
                  flights[key].slice_data.slice_0.flight_data.flight_1.arrival
                    .datetime.time_24h
                }
                depDate1={
                  flights[key].slice_data.slice_0.flight_data.flight_0.departure
                    .datetime.date
                }
                arrDate1={
                  flights[key].slice_data.slice_0.flight_data.flight_0.arrival
                    .datetime.date
                }
                depDate2={
                  flights[key].slice_data.slice_0.flight_data.flight_1.departure
                    .datetime.date
                }
                arrDate2={
                  flights[key].slice_data.slice_0.flight_data.flight_1.arrival
                    .datetime.date
                }
              />
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export { SelectFlights };
