import Home from "../pages/Home";
import Itinerary from "../pages/Itineray";
import Login from "../pages/Login";
import Flights from "../pages/Flights";
import PageNotFound from "../pages/PageNotFound";

import { Route, Routes } from "react-router-dom";

export const AppRoutes = (props) => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
    </Routes>
  );
};
