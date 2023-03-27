import NavBar from "../components/NavBar";
import React, { useEffect } from "react";
import { Typography } from "@mui/material";

function Itinerary(props) {
  useEffect(() => {
    const fNameStorage = localStorage.getItem("fName");
    if (fNameStorage) {
      props.setFname(fNameStorage);
    }
  }, []);

  return (
    <div>
      <Typography>My Itinerary</Typography>
      <Typography>Welcome {props.fName}!</Typography>
    </div>
  );
}

export default Itinerary;
