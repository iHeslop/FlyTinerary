import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import { Typography } from "@mui/material";
import Video from "../assets/Pexels Videos 1851190.mp4";

function Login(props) {
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
          width: "100%",
          height: "auto",
          transform: "translate(-50%, -50%)",
          zIndex: -1,
        }}
      >
        <source src={Video} type="video/mp4" />
      </video>
      <LoginForm fName={props.fName} onFNameChange={props.onFNameChange} />
    </div>
  );
}

export default Login;
