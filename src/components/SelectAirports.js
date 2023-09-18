import React, { useEffect, useState } from "react";
import axios from "axios";
import AsyncSelect from "react-select/async";
import Button from "@mui/material/Button";
import { SelectFlights } from "./SelectFlights";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Radio, FormControlLabel, Typography, Box, Card } from "@mui/material";
import "../fonts/Poppins-Medium.ttf";

function SelectAirports(props) {
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [airports, setAirports] = useState([]);
  const [showFlights, setShowFlights] = useState(false);
  const [selectedDate, setselectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [flightType, setFlightType] = useState("roundTrip");
  const [apiFlightType, setApiFlightType] = useState("getAirFlightRoundTrip");
  const [currentIndex, setCurrentIndex] = useState(0);

  //Get Airports data from Database
  useEffect(() => {
    axios.get("http://localhost:4000/airports/").then((response) => {
      setAirports(response.data.data);
    });
  }, []);

  //Search function/filter through data
  const filterAirports = (inputValue, selectedOption) => {
    const filteredAirports = airports
      .filter(
        (i) =>
          i.name.toLowerCase().includes(inputValue.toLowerCase()) ||
          i.city?.toLowerCase().includes(inputValue.toLowerCase())
      )
      .sort((a, b) => {
        const aIndex = a.name.toLowerCase().indexOf(inputValue.toLowerCase());
        const bIndex = b.name.toLowerCase().indexOf(inputValue.toLowerCase());
        return aIndex - bIndex;
      });
    if (selectedOption) {
      return filteredAirports.filter((i) => i.id !== selectedOption.value);
    } else {
      return filteredAirports;
    }
  };

  //Map found airports and set variables for display on globe
  const loadAirports = (inputValue, callback, selectedOption) => {
    const filteredAirports = filterAirports(inputValue, selectedOption);
    const options = filteredAirports.map((airport) => ({
      label: airport.name,
      value: airport.id,
      lat: airport.lat,
      lon: airport.lon,
      iata: airport.iata,
    }));

    if (inputValue === "") {
      let defaultOptions = airports.map((airport) => ({
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

  //Set Departure Airport value on user input
  const handleDepartureAirportChange = (selectedOption) => {
    if (selectedOption && selectedOption.value !== arrivalAirport?.value) {
      setDepartureAirport(selectedOption);
      props.onDepartureAirportChange(selectedOption);
    }
  };

  //Set Arrival Airport value on user input
  const handleArrivalAirportChange = (selectedOption) => {
    if (selectedOption && selectedOption.value !== departureAirport?.value) {
      setArrivalAirport(selectedOption);
      props.onArrivalAirportChange(selectedOption);
    }
  };

  //Reset variables on Clear
  const handleClearSelections = () => {
    setDepartureAirport("");
    setArrivalAirport("");
    setShowFlights(false);
    props.setIsSelectionMade(false);
    props.setisRouteShown(false);
    props.clearData();
    setFlightType("roundTrip");
    setApiFlightType("getAirFlightRoundTrip");
    setselectedDate(dayjs());
    setCurrentIndex(0);
  };

  //Flights Display/Index Code
  const searchFlights = () => {
    setShowFlights(true);
    setCurrentIndex(0);
  };

  //Set Date for API call
  const handleDateChange = (date) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    setselectedDate(formattedDate);
    console.log(formattedDate);
  };

  //Set Flight Type for API call
  const handleFlightTypeChange = (e) => {
    setFlightType(e.target.value);
    if (e.target.value === "departures") {
      setApiFlightType("getAirFlightDepartures");
    } else {
      setApiFlightType("getAirFlightRoundTrip");
    }
  };

  return (
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
          top: "53%",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(237, 231, 225, 0.85)",
        }}
      >
        <Typography sx={{ fontFamily: "Poppins", fontSize: "20px" }}>
          Search Flights
        </Typography>
        <Box
          spacing={2}
          sx={{ paddingTop: "1%", maxWidth: "100%", flexGrow: 1 }}
        >
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: "15px",
              mb: "1%",
              textAlign: "left",
            }}
          >
            From:
          </Typography>
          <AsyncSelect
            cacheOptions
            placeholder={"Sydney..."}
            loadOptions={loadAirports}
            defaultOptions={true}
            value={departureAirport}
            onChange={handleDepartureAirportChange}
            menuPlacement="auto"
            maxMenuHeight={120}
          />
        </Box>
        <Box
          spacing={1}
          alignItems="center"
          sx={{ paddingTop: "1%", maxWidth: "100%", flexGrow: 1 }}
        >
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: "15px",
              mb: "1%",
              textAlign: "left",
            }}
          >
            To:
          </Typography>
          <AsyncSelect
            cacheOptions
            placeholder={"London..."}
            loadOptions={(inputValue, callback) =>
              loadAirports(inputValue, callback, departureAirport)
            }
            defaultOptions={true}
            value={arrivalAirport}
            onChange={handleArrivalAirportChange}
            menuPlacement="auto"
            maxMenuHeight={120}
          />
        </Box>
        <Box
          spacing={1}
          alignItems="center"
          sx={{
            paddingTop: "3%",
            maxWidth: "100%",
            flexGrow: 1,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: "15px",
              textAlign: "left",
              marginRight: "7%",
            }}
          >
            Date:
          </Typography>
          <DatePicker
            format="DD/MM/YYYY"
            dateAdapter={AdapterDayjs}
            value={dayjs(selectedDate)}
            onChange={handleDateChange}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            paddingTop: "1%",
            justifyContent: "center",
          }}
        >
          <FormControlLabel
            label={
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "15px",
                }}
              >
                Round Trip
              </Typography>
            }
            value="roundTrip"
            checked={flightType === "roundTrip"}
            control={<Radio />}
            onChange={handleFlightTypeChange}
          />
          <FormControlLabel
            label={
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "15px",
                }}
              >
                One Way
              </Typography>
            }
            value="departures"
            checked={flightType === "departures"}
            control={<Radio />}
            onChange={handleFlightTypeChange}
          />
        </Box>
        <Box
          alignItems="center"
          sx={{
            paddingTop: "1%",
            maxWidth: "100%",
            flexGrow: 1,
            display: "flex",
            gap: "15%",
            justifyContent: "center",
            mb: "3%",
          }}
        >
          <Button
            color="success"
            variant="contained"
            onClick={searchFlights}
            sx={{
              fontFamily: "Poppins",
              fontSize: "15px",
            }}
          >
            Show Flights
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleClearSelections}
            sx={{
              fontFamily: "Poppins",
              fontSize: "15px",
            }}
          >
            Clear Route
          </Button>
        </Box>
        <Typography
          sx={{ fontFamily: "Poppins", fontSize: "20px", textAlign: "left" }}
        >
          Flights:
        </Typography>
        {showFlights && (
          <SelectFlights
            departureAirport={departureAirport}
            arrivalAirport={arrivalAirport}
            selectedDate={selectedDate}
            flightType={flightType}
            apiFlightType={apiFlightType}
            userId={props.userId}
            setUserId={props.setUserId}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            showFlights={showFlights}
          />
        )}
      </Card>
    </div>
  );
}
export default SelectAirports;
