import { BrowserRouter, Route, Routes } from "react-router-dom";
import StopWatch from "./apps/StopWatch";
import Clock from "./apps/Clock";
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/stopwatch" element={<StopWatch />} />
          <Route path="/clock" element={<Clock />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
