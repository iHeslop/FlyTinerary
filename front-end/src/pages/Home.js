import React, { useState } from "react";
import SelectAirports from "../components/SelectAirports";
import HomeScreen from "../components/HomeScreen";

function Home(props) {
  const [departureAirport, setDepartureAirport] = useState(null);
  const [arrivalAirport, setArrivalAirport] = useState(null);

  const handleDepartureAirportChange = (selectedOption) => {
    setDepartureAirport(selectedOption);
  };

  const handleArrivalAirportChange = (selectedOption) => {
    setArrivalAirport(selectedOption);
  };

  return (
    <div>
      <SelectAirports
        departureAirport={departureAirport}
        arrivalAirport={arrivalAirport}
        onDepartureAirportChange={handleDepartureAirportChange}
        onArrivalAirportChange={handleArrivalAirportChange}
      />
      <HomeScreen
        departureAirport={departureAirport}
        arrivalAirport={arrivalAirport}
      />
    </div>
  );
}

export default Home;
