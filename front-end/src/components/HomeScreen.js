import React from "react";
import Globe from "react-globe.gl";
import { useEffect, useState, useRef } from "react";

function HomeScreen(props) {
  const departureAirport = props.departureAirport;
  const arrivalAirport = props.arrivalAirport;

  const routeData = [
    {
      depPort: {
        lat: departureAirport?.lat,
        lon: departureAirport?.lon,
        iata: departureAirport?.iata,
      },
      arrPort: {
        lat: arrivalAirport?.lat,
        lon: arrivalAirport?.lon,
        iata: arrivalAirport?.iata,
      },
    },
  ];

  console.log(routeData[0].arrPort.lat);

  return (
    <Globe
      key={props.isRouteShown ? "showRoute" : "hideRoute"}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
      arcsData={routeData}
      arcLabel={`${routeData[0]?.depPort?.iata} &#8594; ${routeData[0]?.arrPort?.iata}`}
      arcStartLat={routeData[0]?.depPort?.lat}
      arcStartLng={routeData[0]?.depPort?.lon}
      arcEndLat={routeData[0]?.arrPort?.lat}
      arcEndLng={routeData[0]?.arrPort?.lon}
      arcDashLength={0.5}
      arcDashGap={1}
      arcDashInitialGap={() => Math.random()}
      arcDashAnimateTime={3000}
      arcColor={(d) => [`rgba(0, 255, 0, 100)`, `rgba(255, 0, 0, 100)`]}
      arcStroke={1}
      arcsTransitionDuration={0}
    />
  );
}

export default HomeScreen;
