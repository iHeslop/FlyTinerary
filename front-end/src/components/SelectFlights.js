import React, { useEffect, useState } from "react";
import axios from "axios";
import FlightCard from "./FlightCard";
import Grid from "@mui/material/Grid";

function SelectFlights(props) {
  const [flights, setFlights] = useState([]);

  const options = {
    method: "GET",
    url: "https://priceline-com-provider.p.rapidapi.com/v2/flight/roundTrip",
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
          response.data.getAirFlightRoundTrip.results.result.itinerary_data
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
            <Grid item xs={6} md={3} lg={2} key={key}>
              <FlightCard
                price={flights[key].price_details.source_total_fare}
                name={flights[key].slice_data.slice_0.airline.name}
                currency={flights[key].price_details.source_symbol}
                logo={flights[key].slice_data.slice_0.airline.logo}
              />
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export { SelectFlights };
