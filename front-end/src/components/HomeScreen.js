import React from "react";
import Globe from "react-globe.gl";

function HomeScreen(props) {
  return (
    <Globe
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
    />
  );
}

export default HomeScreen;
