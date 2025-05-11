import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

const App = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

export default App;
