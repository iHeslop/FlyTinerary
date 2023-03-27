import Home from "../pages/Home";
import Login from "../pages/Login";
import Itinerary from "../pages/Itinerary";
import PageNotFound from "../pages/PageNotFound";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

export const AppRoutes = () => {
  const [fName, setFname] = useState("");
  const handlefNameChange = (newFname) => {
    setFname(newFname);
    localStorage.setItem("fName", newFname);
  };

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={<Login fName={fName} onFNameChange={handlefNameChange} />}
      />

      <Route
        path="/home"
        element={
          <Home
            fName={fName}
            onFNameChange={handlefNameChange}
            setFname={setFname}
          />
        }
      />

      <Route
        path="/itinerary"
        element={<Itinerary fName={fName} setFname={setFname} />}
      />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
