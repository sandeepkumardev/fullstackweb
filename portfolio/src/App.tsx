import { BrowserRouter, Route, Routes } from "react-router-dom";
import StopWatch from "./apps/StopWatch";
import Clock from "./apps/Clock";

const App = () => {
  return (
    <div>
      <h1>Navbar</h1>
      <BrowserRouter>
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
