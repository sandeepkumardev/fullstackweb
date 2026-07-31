import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { appRoutes, authRoutes } from "./routes";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Sidebar />
        <Routes>
          {appRoutes.map((route) => (
            <Route path={route.path} element={<route.element />} />
          ))}
          {authRoutes.map((route) => (
            <Route path={route.path} element={<route.element />} />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
