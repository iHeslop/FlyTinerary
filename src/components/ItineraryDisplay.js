import React, { useEffect, useState } from "react";
import Globe from "react-globe.gl";
import axios from "axios";
import ItineraryFlightCard from "./ItineraryFlightCard";
import Grid from "@mui/material/Grid";
import { Card, Button } from "@mui/material";
import NavBar from "../components/NavBar";
import Typography from "@mui/material/Typography";

function ItineraryDisplay(props) {
  const userId = localStorage.getItem("userId");
  const [displayFlights, setDisplayFlights] = useState([]);
  const [myFlights, setMyFlights] = useState([]);
  const [airports, setAirports] = useState("");
  const [isLoaded, setisLoaded] = useState(false);
  const [rerender, setRerender] = useState(false);

  // Code for Displaying Saved Flights on FlightCards
  useEffect(() => {
    async function getDisplayFlights() {
      const response = await axios.get(
        `http://localhost:4000/flights/${userId}`
      );
      const myFlights = response.data.data;
      setDisplayFlights(myFlights);
    }
    getDisplayFlights();
  }, [rerender, userId]);

  // Code for Displaying Saved Flights on Globe
  useEffect(() => {
    console.log("Fetching Airports");
    async function fetchFlights() {
      const response = await axios.get(
        `http://localhost:4000/flights/${userId}`
      );
      const myDataFlights = response.data.data;
      const updatedFlights = myDataFlights.map((flight) => {
        const { depIata1, arrIata1, arrIata2, arrIata3 } = flight;

        const arrIata = arrIata3 ? arrIata3 : arrIata2 ? arrIata2 : arrIata1;
        return [depIata1, arrIata];
      });

      setMyFlights(updatedFlights);
    }
    fetchFlights();
  }, [rerender, userId]);

  useEffect(() => {
    async function fetchAirports() {
      console.log("Fetching Airports");
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
              iata: depResponse.data.data[0].iata,
            },
            arrAirport: {
              lat: arrResponse.data.data[0].lat,
              lon: arrResponse.data.data[0].lon,
              iata: arrResponse.data.data[0].iata,
            },
          };
          updatedAirports.push(flight);
        }
        setAirports(updatedAirports);
        setisLoaded(true);
        setRerender(true);
      }
    }
    fetchAirports();
  }, [myFlights, rerender]);

  return (
    <div style={{ overflow: "hidden", position: "relative" }}>
      <NavBar
        fName={props.fName}
        onFNameChange={props.onFNameChange}
        setFname={props.setFname}
      />
      {isLoaded && airports.length !== 0 && (
        <div>
          <Card
            sx={{
              width: "23%",
              height: "75%",
              left: "3%",
              padding: "1%",
              position: "absolute",
              zIndex: 1,
              borderRadius: "1%",
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(237, 231, 225, 0.85)",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: "20px",
                textAlign: "left",
              }}
            >
              Saved Flights:
            </Typography>
            <Grid wrap="wrap">
              {Object.keys(displayFlights).map((key) => (
                <Grid item xs={12} md={12} lg={12} key={key}>
                  <ItineraryFlightCard
                    rerender={rerender}
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
                    arrIata2={displayFlights[key]?.arrIata2}
                    depTime1={displayFlights[key]?.depTime1}
                    arrTime1={displayFlights[key]?.arrTime1}
                    depTime2={displayFlights[key]?.depTime2}
                    arrTime2={displayFlights[key]?.arrTime2}
                    depDate1={displayFlights[key]?.depDate1}
                    arrDate1={displayFlights[key]?.arrDate1}
                    depDate2={displayFlights[key]?.depDate2}
                    arrDate2={displayFlights[key]?.arrDate2}
                    arrDate3={displayFlights[key]?.arrDate3}
                    arrTime3={displayFlights[key]?.arrTime3}
                    arrIata3={displayFlights[key]?.arrIata3}
                  />
                </Grid>
              ))}
            </Grid>
          </Card>

          <Globe
            style={{
              position: "fixed",
              width: "100%",
              height: "100%",
              zIndex: "0",
            }}
            key={rerender ? "showRoute" : "hideRoute"}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            arcsData={airports}
            arcLabel={(d) =>
              `${d.depAirport?.iata} &#8594; ${d.arrAirport?.iata}`
            }
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
          <Card
            sx={{
              width: "23%",
              height: "75%",
              left: "3%",
              padding: "1%",
              position: "absolute",
              zIndex: 1,
              borderRadius: "1%",
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(237, 231, 225, 0.85)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ fontFamily: "Poppins", fontSize: "30px" }}>
              No Flights Found
            </Typography>
            <Button
              href={"/home"}
              variant="outlined"
              sx={{
                fontFamily: "Poppins",
                ml: 1,
                mr: 1.5,
                mt: 1,
                color: "rgba(8, 14, 44, 1)",
                fontSize: "20px",
                textTransform: "inherit",
              }}
            >
              Find Flights
            </Button>
          </Card>

          <Globe
            style={{
              position: "fixed",
              width: "100%",
              height: "100%",
              zIndex: "0",
            }}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          />
        </div>
      )}
    </div>
  );
}
export default ItineraryDisplay;
