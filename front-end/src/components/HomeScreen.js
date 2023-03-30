import React, { useState } from "react";
import Globe from "react-globe.gl";
import SelectAirports from "../components/SelectAirports";
import NavBar from "../components/NavBar";

function HomeScreen(props) {
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [isRouteShown, setisRouteShown] = useState(false);
  const [isSelectionMade, setIsSelectionMade] = useState(false);

  const clearData = () => {
    setDepartureAirport("");
    setArrivalAirport("");
  };

  const handleDepartureAirportChange = (selectedOption) => {
    if (selectedOption && selectedOption.value !== arrivalAirport?.value) {
      setDepartureAirport(selectedOption);
    }
  };

  const handleArrivalAirportChange = (selectedOption) => {
    if (selectedOption && selectedOption.value !== departureAirport?.value) {
      setArrivalAirport(selectedOption);
    }
  };

  const routeData = [
    {
      depPort: {
        lat: departureAirport?.lat,
        lon: departureAirport?.lon,
        iata: departureAirport?.iata,
      },
      arrPort: {
        lat: arrivalAirport?.lat,
        lon: arrivalAirport?.lon,
        iata: arrivalAirport?.iata,
      },
    },
  ];
  return (
    <div style={{ overflow: "hidden" }}>
      <NavBar
        fName={props.fName}
        onFNameChange={props.onFNameChange}
        setFname={props.setFname}
      />
      <SelectAirports
        departureAirport={departureAirport}
        arrivalAirport={arrivalAirport}
        onDepartureAirportChange={handleDepartureAirportChange}
        onArrivalAirportChange={handleArrivalAirportChange}
        setSelectedAirports={(departure, arrival) => {
          setDepartureAirport(departure);
          setArrivalAirport(arrival);
        }}
        setisRouteShown={setisRouteShown}
        isSelectionMade={isSelectionMade}
        setIsSelectionMade={setIsSelectionMade}
        clearData={clearData}
        userId={props.userId}
        setUserId={props.setUserId}
      />
      <Globe
        key={props.isRouteShown ? "showRoute" : "hideRoute"}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        // Arcs Code
        arcsData={routeData}
        arcLabel={() =>
          `${routeData[0]?.depPort?.iata} &#8594; ${routeData[0]?.arrPort?.iata}`
        }
        arcStartLat={routeData[0]?.depPort?.lat}
        arcStartLng={routeData[0]?.depPort?.lon}
        arcEndLat={routeData[0]?.arrPort?.lat}
        arcEndLng={routeData[0]?.arrPort?.lon}
        arcDashLength={0.8}
        arcDashGap={1}
        arcDashInitialGap={() => Math.random()}
        arcDashAnimateTime={4000}
        arcColor={(d) => [`rgba(0, 255, 0, 0.5)`, `rgba(255, 0, 0, 0.5)`]}
        arcsTransitionDuration={2}
        arcStroke={0.8}
      />
    </div>
  );
}

export default HomeScreen;
