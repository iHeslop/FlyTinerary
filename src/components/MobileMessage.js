import React from "react";
import Typography from "@mui/material/Typography";
import { Card } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import FlightTakeoff from "@mui/icons-material/FlightTakeoff";
import Video from "../assets/Pexels Videos 1851190.mp4";

function MobileMessage() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <video
        autoPlay
        muted
        loop
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          minWidth: "100%",
          minHeight: "100%",
          width: "auto",
          height: "100%",
          transform: "translate(-50%, -50%)",
          zIndex: -1,
        }}
      >
        <source src={Video} type="video/mp4" />
      </video>
      <Card
        sx={{
          width: "75%",
          height: "30%",
          left: "50%",
          position: "absolute",
          zIndex: 1,
          borderRadius: "1%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "rgba(237, 231, 225, 0.85)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "15px",
        }}
      >
        <Avatar sx={{ m: 3, bgcolor: "grey" }}>
          <FlightTakeoff />
        </Avatar>
        <Typography variant="h5" color="text.secondary">
          Please use this application on a desktop computer.
        </Typography>
      </Card>
    </div>
  );
}

export default MobileMessage;
