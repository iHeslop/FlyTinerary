import React, { useState } from "react";
import HomeScreen from "../components/HomeScreen";

function Home(props) {
  return (
    <div>
      <HomeScreen
        fName={props.fName}
        onFNameChange={props.onFNameChange}
        setFname={props.setFname}
        userId={props.userId}
        setUserId={props.setUserId}
      />
    </div>
  );
}

export default Home;
