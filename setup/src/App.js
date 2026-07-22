import Navigation from "./components/Navigation";
import Counter from "./pages/Counter";
import Ecomm from "./pages/Ecomm";
import Home from "./pages/Home";
import UserForm from "./pages/UserForm";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/counter" Component={Counter} />
          <Route path="/ecomm" element={<Ecomm />} />
          <Route path="/userform" element={<UserForm />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
        <h1>Footer</h1>
      </BrowserRouter>
    </div>
  );
}

export default App;
