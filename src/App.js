import "./App.css";
import NavBar from "./components/NavBar";
import { AppRoutes } from "./routes/AppRoutes";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  return (
    <div className="App darkMode">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AppRoutes />
      </LocalizationProvider>
    </div>
  );
}

export default App;
