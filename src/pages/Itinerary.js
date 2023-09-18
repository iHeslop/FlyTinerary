import React, { useEffect } from "react";
import ItineraryDisplay from "../components/ItineraryDisplay";

function Itinerary(props) {
  //Getting First Name and UserID from local storage
  useEffect(() => {
    const fNameStorage = localStorage.getItem("fName");
    if (fNameStorage) {
      props.setFname(fNameStorage);
    }
    const userIdStorage = localStorage.getItem("userId");
    if (userIdStorage) {
      props.setUserId(userIdStorage);
    }
  });

  return (
    <div>
      <ItineraryDisplay
        fName={props.fName}
        onFNameChange={props.onFNameChange}
        setFname={props.setFname}
        userId={props.userId}
        setUserId={props.setUserId}
      />
    </div>
  );
}

export default Itinerary;
