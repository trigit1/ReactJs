import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthView from "./Views/AuthView";
import Dashboard from "./Views/Dashboard";
import "antd/dist/reset.css";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthView />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
