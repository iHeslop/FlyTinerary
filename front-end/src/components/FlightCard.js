import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

function FlightCard(props) {
  return (
    <Card
      sx={{ width: "auto", height: "auto", margin: 4, boxShadow: 10 }}
      elevation={5}
      style={{ backgroundColor: "white" }}
    >
      <CardContent sx={{ display: "flex", flexDirection: "row" }}>
        <Box
          component="img"
          src={props.logo}
          sx={{ width: "10%", height: "10%" }}
        />

        <Typography variant="body1" color="text.primary">
          {props.currency}
        </Typography>
        <Typography variant="body1" color="text.primary">
          {props.price}
        </Typography>
        <Typography variant="body1" color="text.primary">
          {props.duration}
        </Typography>
        <Typography variant="body3" color="text.secondary">
          {props.name}
        </Typography>
        <Typography variant="body3" color="text.secondary">
          {props.depIata1}
        </Typography>
        <Typography variant="body3" color="text.secondary">
          {props.depTime1}
        </Typography>
        <Typography variant="body3" color="text.secondary">
          {props.depDate1}
        </Typography>
        <Typography variant="body3" color="text.secondary">
          {props.arrIata1}
        </Typography>
        <Typography variant="body3" color="text.secondary">
          {props.arrTime1}
        </Typography>
        <Typography variant="body3" color="text.secondary">
          {props.arrDate1}
        </Typography>
        <Typography variant="body3" color="text.secondary">
          {props.depIata2}
        </Typography>
        <Typography variant="body3" color="text.secondary">
          {props.depTime2}
        </Typography>
        <Typography variant="body3" color="text.secondary">
          {props.depDate2}
        </Typography>
        <Typography variant="body3" color="text.secondary">
          {props.arrIata2}
        </Typography>
        <Typography variant="body3" color="text.secondary">
          {props.arrTime2}
        </Typography>
        <Typography variant="body3" color="text.secondary">
          {props.arrDate2}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default FlightCard;
