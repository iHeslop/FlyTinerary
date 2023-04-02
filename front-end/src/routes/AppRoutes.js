import Home from "../pages/Home";
import Login from "../pages/Login";
import Itinerary from "../pages/Itinerary";
import PageNotFound from "../pages/PageNotFound";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

export const AppRoutes = () => {
  const [fName, setFname] = useState("");
  const [userId, setUserId] = useState("");

  //First Name Set at highest level
  const handlefNameChange = (newFname) => {
    setFname(newFname);
    localStorage.setItem("fName", newFname);
  };
  //UserId Set at highest level
  const handleUserIdChange = (newUserId) => {
    setUserId(newUserId);
    localStorage.setItem("userId", newUserId);
  };

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <Login
            fName={fName}
            userId={userId}
            onFNameChange={handlefNameChange}
            onUserIdChange={handleUserIdChange}
          />
        }
      />

      <Route
        path="/home"
        element={
          <Home
            fName={fName}
            onFNameChange={handlefNameChange}
            setFname={setFname}
            userId={userId}
            setUserId={setUserId}
          />
        }
      />

      <Route
        path="/itinerary"
        element={
          <Itinerary
            fName={fName}
            setFname={setFname}
            userId={userId}
            setUserId={setUserId}
          />
        }
      />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
