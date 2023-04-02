import { Link } from "react-router-dom";
import background from "../assets/beautiful-sky-with-clouds.jpg";
import { Typography } from "@mui/material";
import "../fonts/Poppins-Medium.ttf";

function PageNotFound() {
  return (
    <div
      className="PageNotFound"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <Typography sx={{ fontFamily: "Poppins", fontSize: "50px" }}>
        Page Not Found
      </Typography>
      <Typography sx={{ fontFamily: "Poppins", fontSize: "18px" }}>
        What were you looking for? Maybe going back <Link to="/home">home</Link>{" "}
        will help you find it.
      </Typography>
    </div>
  );
}

export default PageNotFound;
