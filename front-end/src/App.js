import "./App.css";
import NavBar from "./components/NavBar";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  return (
    <div className="App darkMode">
      <AppRoutes />
    </div>
  );
}

export default App;
