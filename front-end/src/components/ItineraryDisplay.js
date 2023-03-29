import React, { useEffect } from "react";
import Globe from "react-globe.gl";

function ItineraryDisplay(props) {
  useEffect(async () => {
    const response = await axios
      .get("http://localhost:4000/flights/", {
        name: props.name,
        userId: props.userId,
        price: props.price,
        currency: props.currency,
        duration: props.duration,
        logo: props.logo,
        depIata1: props.depIata1,
        depTime1: props.depTime1,
        depDate1: props.depDate1,
        arrIata1: props.arrIata1,
        arrTime1: props.arrTime1,
        arrDate1: props.arrIata1,
        depIata2: props.depIata2,
        depTime2: props.depTime2,
        depDate2: props.depDate2,
        arrIata2: props.arrIata2,
        arrTime2: props.arrTime2,
        arrDate2: props.arrIata2,
      })
      .then((response) => {
        console.log(response);
      });
    alert("Flight added to your Itinerary!");
  });

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

  return (
    <div style={{ overflow: "hidden" }}>
      <Globe
        key={props.isRouteShown ? "showRoute" : "hideRoute"}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        arcsData={routeData}
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
    </div>
  );
}
export default ItineraryDisplay;
