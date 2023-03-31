import React, { useEffect, useState } from "react";
import Globe from "react-globe.gl";
import axios from "axios";
import ItineraryFlightCard from "./ItineraryFlightCard";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";

function ItineraryDisplay(props) {
  const userId = localStorage.getItem("userId");
  const [displayFlights, setDisplayFlights] = useState([]);
  const [myFlights, setMyFlights] = useState([]);
  const [airports, setAirports] = useState("");
  const [isLoaded, setisLoaded] = useState(false);
  const [rerender, setRerender] = useState(false);

  // Code for Displaying Saved Flights on Cards
  useEffect(() => {
    async function getDisplayFlights() {
      const response = await axios.get(
        `http://localhost:4000/flights/${userId}`
      );
      const myFlights = response.data.data;
      setDisplayFlights(myFlights);
    }
    getDisplayFlights();
  }, [rerender]);
  console.log(displayFlights);

  // Code for Displaying Saved Flights on Globe
  useEffect(() => {
    async function fetchFlights() {
      const response = await axios.get(
        `http://localhost:4000/flights/${userId}`
      );
      const myDataFlights = response.data.data;
      const updatedFlights = myDataFlights.map((flight) => {
        const { depIata1, arrIata1, arrIata2 } = flight;

        const arrIata = arrIata2 || arrIata1;
        return [depIata1, arrIata];
      });

      setMyFlights(updatedFlights);
    }
    fetchFlights();
  }, [rerender]);

  useEffect(() => {
    async function fetchAirports() {
      if (myFlights.length > 0) {
        const updatedAirports = [];
        for (const [depIata, arrIata] of myFlights) {
          const depResponse = await axios.get(
            `http://localhost:4000/airports/${depIata}`
          );
          const arrResponse = await axios.get(
            `http://localhost:4000/airports/${arrIata}`
          );
          const flight = {
            depAirport: {
              lat: depResponse.data.data[0].lat,
              lon: depResponse.data.data[0].lon,
            },
            arrAirport: {
              lat: arrResponse.data.data[0].lat,
              lon: arrResponse.data.data[0].lon,
            },
          };
          updatedAirports.push(flight);
        }
        setAirports(updatedAirports);
        setisLoaded(true);
      }
    }
    fetchAirports();
  }, [myFlights, rerender]);

  return (
    <div style={{ overflow: "hidden" }}>
      {!isLoaded && airports.length > 0 && <LinearProgress />}
      {isLoaded && airports.length > 0 && (
        <div>
          <Grid wrap="wrap" container spacing={2}>
            {Object.keys(displayFlights).map((key) => (
              <Grid item xs={12} md={12} lg={12} key={key}>
                <ItineraryFlightCard
                  setRerender={setRerender}
                  flightId={displayFlights[key]?.flightId}
                  price={displayFlights[key]?.price}
                  name={displayFlights[key]?.name}
                  currency={displayFlights[key]?.currency}
                  logo={displayFlights[key]?.logo}
                  duration={displayFlights[key]?.duration}
                  ////Flight Details
                  depIata1={displayFlights[key]?.depIata1}
                  arrIata1={displayFlights[key]?.arrIata1}
                  depIata2={displayFlights[key]?.depIata2}
                  arrIata2={displayFlights[key]?.depTime1}
                  arrTime1={displayFlights[key]?.arrTime1}
                  depTime2={displayFlights[key]?.depTime2}
                  arrTime2={displayFlights[key]?.arrTime2}
                  depDate1={displayFlights[key]?.depDate1}
                  arrDate1={displayFlights[key]?.arrDate1}
                  depDate2={displayFlights[key]?.depDate2}
                  arrDate2={displayFlights[key]?.arrDate2}
                />
              </Grid>
            ))}
          </Grid>
          <Globe
            key={rerender ? "showRoute" : "hideRoute"}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            arcsData={airports}
            arcStartLat={(d) => +d.depAirport?.lat}
            arcStartLng={(d) => +d.depAirport?.lon}
            arcEndLat={(d) => +d.arrAirport?.lat}
            arcEndLng={(d) => +d.arrAirport?.lon}
            arcDashLength={0.8}
            arcDashGap={1}
            arcDashInitialGap={() => Math.random()}
            arcDashAnimateTime={4000}
            arcColor={(d) => [`rgba(0, 255, 0, 100)`, `rgba(255, 0, 0, 100)`]}
            arcStroke={0.8}
            arcsTransitionDuration={2}
          />
        </div>
      )}
      {!isLoaded && airports.length === 0 && (
        <div>
          <p>No flights found</p>

          <Globe
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          />
        </div>
      )}
    </div>
  );
}
export default ItineraryDisplay;
