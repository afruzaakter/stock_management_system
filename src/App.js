import { Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Navbar from "./pages/Shared/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import SignUp from "./pages/Auth/SignUp";

function App() {
  return (
    <Navbar>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/dashboard" element={<Dashboard />}>
          
        </Route>
      </Routes>
    </Navbar>
  );
}

export default App;
