import React, { useEffect, useState } from "react";
import axios from "axios";
import AsyncSelect from "react-select/async";

function SelectAirports(props) {
  const [departureAirport, setDepartureAirport] = useState(null);
  const [arrivalAirport, setArrivalAirport] = useState(null);

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
    const options = filteredAirports
      .slice(0, 5)
      .map((airport) => ({ label: airport.name, value: airport.id }));

    if (inputValue === "") {
      let defaultOptions = airports
        .slice(0, 5)
        .map((airport) => ({ label: airport.name, value: airport.id }));
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

  return (
    <div>
      <h4>From</h4>
      <AsyncSelect
        cacheOptions
        placeholder={"Sydney..."}
        loadOptions={loadAirports}
        defaultOptions
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
        defaultOptions
        value={arrivalAirport}
        onChange={handleArrivalAirportChange}
      />
    </div>
  );
}
export default SelectAirports;
