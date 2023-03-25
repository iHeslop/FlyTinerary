import Home from "../pages/Home";
import Login from "../pages/Login";
import Itinerary from "../pages/Itinerary";
import PageNotFound from "../pages/PageNotFound";

import { Route, Routes } from "react-router-dom";

export const AppRoutes = (props) => {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />

      <Route path="/home" element={<Home />} />

      <Route path="/itinerary" element={<Itinerary />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
