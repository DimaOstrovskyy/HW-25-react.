import "./App.css";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

const App = () => (
  <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
    <Navbar />
    <main className="grow">
      <Outlet />
    </main>
  </div>
);

App.propTypes = {};

export default App;
