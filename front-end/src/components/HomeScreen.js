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
    <div>
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
      />
      <Globe
        key={props.isRouteShown ? "showRoute" : "hideRoute"}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        arcsData={routeData}
        arcStartLat={routeData[0]?.depPort?.lat}
        arcStartLng={routeData[0]?.depPort?.lon}
        arcEndLat={routeData[0]?.arrPort?.lat}
        arcEndLng={routeData[0]?.arrPort?.lon}
        arcDashLength={0.5}
        arcDashGap={1}
        arcDashInitialGap={() => Math.random()}
        arcDashAnimateTime={3000}
        arcColor={(d) => [`rgba(0, 255, 0, 100)`, `rgba(255, 0, 0, 100)`]}
        arcStroke={1}
        arcsTransitionDuration={0}
      />
    </div>
  );
}

export default HomeScreen;
