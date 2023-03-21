import Home from "../pages/Home";

import { Route, Routes } from "react-router-dom";

export const AppRoutes = (props) => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
    </Routes>
  );
};
