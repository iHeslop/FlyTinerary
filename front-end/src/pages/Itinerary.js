import NavBar from "../components/NavBar";
import React, { useEffect } from "react";
import { Typography } from "@mui/material";

function Itinerary(props) {
  useEffect(() => {
    const fNameStorage = localStorage.getItem("fName");
    if (fNameStorage) {
      props.setFname(fNameStorage);
    }
    const userIdStorage = localStorage.getItem("userId");
    if (userIdStorage) {
      props.setUserId(userIdStorage);
    }
  }, []);

  return (
    <div>
      <NavBar
        fName={props.fName}
        onFNameChange={props.onFNameChange}
        setFname={props.setFname}
      />
      <Typography>My Itinerary</Typography>
      <Typography>
        Welcome {props.fName}! Your user id is: {props.userId}
      </Typography>
    </div>
  );
}

export default Itinerary;
