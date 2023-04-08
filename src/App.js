import React from "react";
import { BrowserRouter as Routers,Routes,Route } from "react-router-dom";

import Dashboard from "./Components/Administration/Dashboard";
import AdminLogin from "./Components/Administration/AdminLogin";
import Home from "./Components/UserServices/Home";

function App() {
  return (
    <div className="App">
      <Routers>
        <Routes>
          
          <Route element={<Dashboard/>}  path="/dashboard/*" />
          <Route element={<AdminLogin/>}  path="/adminlogin" />
          <Route element={<Home/>}  path="/home" />
        </Routes>
      
      </Routers>
    </div>
  );
}

export default App;
