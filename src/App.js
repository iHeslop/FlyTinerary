import "./App.css";
import { AppRoutes } from "./routes/AppRoutes";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MobileMessage from "./components/MobileMessage";

function App() {
  return (
    <div className="App darkMode">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {window.innerWidth <= 1280 ? <MobileMessage /> : <AppRoutes />}
      </LocalizationProvider>
    </div>
  );
}

export default App;
