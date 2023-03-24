import React, { useEffect, useState } from "react";
import axios from "axios";
import AsyncSelect from "react-select/async";
import Button from "@mui/material/Button";

function SelectAirports(props) {
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [airports, setAirports] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/airports/").then((response) => {
      setAirports(response.data.data);
    });
  }, []);

  const filterAirports = (inputValue, selectedOption) => {
    const filteredAirports = airports.filter((i) =>
      i.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    if (selectedOption) {
      return filteredAirports.filter((i) => i.id !== selectedOption.value);
    } else {
      return filteredAirports;
    }
  };

  const loadAirports = (inputValue, callback, selectedOption) => {
    const filteredAirports = filterAirports(inputValue, selectedOption);
    const options = filteredAirports.slice(0, 5).map((airport) => ({
      label: airport.name,
      value: airport.id,
      lat: airport.lat,
      lon: airport.lon,
      iata: airport.iata,
    }));

    if (inputValue === "") {
      let defaultOptions = airports.slice(0, 5).map((airport) => ({
        label: airport.name,
        value: airport.id,
        lat: airport.lat,
        lon: airport.lon,
        iata: airport.iata,
      }));
      callback(defaultOptions);
    } else {
      setTimeout(() => {
        callback(options);
      }, 1000);
    }
  };
  const handleDepartureAirportChange = (selectedOption) => {
    if (selectedOption && selectedOption.value !== arrivalAirport?.value) {
      setDepartureAirport(selectedOption);
      props.onDepartureAirportChange(selectedOption);
    }
  };

  const handleArrivalAirportChange = (selectedOption) => {
    if (selectedOption && selectedOption.value !== departureAirport?.value) {
      setArrivalAirport(selectedOption);
      props.onArrivalAirportChange(selectedOption);
    }
  };

  const handleClearSelections = () => {
    setDepartureAirport("");
    setArrivalAirport("");
    props.setIsSelectionMade(false);
    props.setisRouteShown(false);
  };

  const handleShowRouteClick = () => {
    if (departureAirport && arrivalAirport) {
      props.setSelectedAirports(departureAirport, arrivalAirport);
      props.setisRouteShown(true);
      props.setIsSelectionMade(true);
    }
  };

  return (
    <div>
      <h4>From</h4>
      <AsyncSelect
        cacheOptions
        placeholder={"Sydney..."}
        loadOptions={loadAirports}
        defaultOptions={true}
        value={departureAirport}
        onChange={handleDepartureAirportChange}
      />
      <h4>To</h4>
      <AsyncSelect
        cacheOptions
        placeholder={"London..."}
        loadOptions={(inputValue, callback) =>
          loadAirports(inputValue, callback, departureAirport)
        }
        defaultOptions={true}
        value={arrivalAirport}
        onChange={handleArrivalAirportChange}
      />
      <Button variant="contained" onClick={handleShowRouteClick}>
        Show Route
      </Button>
      <Button variant="contained" onClick={handleClearSelections}>
        Clear Route
      </Button>
    </div>
  );
}
export default SelectAirports;
