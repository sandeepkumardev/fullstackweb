import Navigation from "./components/Navigation";
import Clock from "./pages/Clock";
import Counter from "./pages/Counter";
import Ecomm from "./pages/Ecomm";
import Home from "./pages/Home";
import StopWatch from "./pages/Stopwatch";
import UserForm from "./pages/UserForm";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Clock />
      <StopWatch />
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/counter" Component={Counter} />
          <Route path="/ecomm" element={<Ecomm />} />
          <Route path="/userform" element={<UserForm />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
