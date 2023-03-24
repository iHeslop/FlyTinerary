import React, { useState } from "react";
import SelectAirports from "../components/SelectAirports";
import HomeScreen from "../components/HomeScreen";

function Home(props) {
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [isRouteShown, setisRouteShown] = useState(false);
  const [isSelectionMade, setIsSelectionMade] = useState(false);

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

  return (
    <div>
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
      />
      <HomeScreen
        departureAirport={departureAirport}
        arrivalAirport={arrivalAirport}
        isRouteShown={isRouteShown}
        isSelectionMade={isSelectionMade}
        setIsSelectionMade={setIsSelectionMade}
      />
    </div>
  );
}

export default Home;
