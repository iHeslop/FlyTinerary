import React, { useEffect, useState } from "react";
import axios from "axios";
import AsyncSelect from "react-select/async";
import Button from "@mui/material/Button";
import { SelectFlights } from "./SelectFlights";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";

function SelectAirports(props) {
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [airports, setAirports] = useState([]);
  const [showFlights, setShowFlights] = useState(false);
  const [selectedDate, setselectedDate] = useState(dayjs());
  const [flightType, setFlightType] = useState("roundTrip");

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
    setShowFlights(false);
    props.setIsSelectionMade(false);
    props.setisRouteShown(false);
    props.clearData();
    setFlightType("roundTrip");
    setselectedDate(dayjs());
  };

  //Flights Code

  const searchFlights = () => {
    setShowFlights(true);
  };

  const handleDateChange = (date) => {
    setselectedDate(date);
  };

  const handleFlightTypeChange = (e) => {
    setFlightType(e.target.value);
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
      <RadioGroup>
        <FormControlLabel
          label="Round Trip"
          value="roundTrip"
          checked={flightType === "roundTrip"}
          control={<Radio />}
          onChange={handleFlightTypeChange}
        />
        <FormControlLabel
          label="One Way"
          value="departures"
          checked={flightType === "departures"}
          control={<Radio />}
          onChange={handleFlightTypeChange}
        />
      </RadioGroup>
      <DatePicker
        label="Select Date"
        format="DD/MM/YYYY"
        dateAdapter={AdapterDayjs}
        value={selectedDate}
        onChange={handleDateChange}
      />

      <Button variant="contained" onClick={searchFlights}>
        Show Flights
      </Button>
      <Button variant="contained" onClick={handleClearSelections}>
        Clear Route
      </Button>
      {showFlights && (
        <SelectFlights
          departureAirport={departureAirport}
          arrivalAirport={arrivalAirport}
          selectedDate={selectedDate}
          flightType={flightType}
        />
      )}
    </div>
  );
}
export default SelectAirports;
