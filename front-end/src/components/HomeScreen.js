import React from "react";
import Globe from "react-globe.gl";
import axios from "axios";
import { useEffect, useState, useRef } from "react";

function HomeScreen(props) {
  return (
    <Globe
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
    />
  );
}

export default HomeScreen;
