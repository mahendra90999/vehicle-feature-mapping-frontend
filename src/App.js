import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import VehicleAdd from "./pages/VehicleAdd";
import FeatureAdd from "./pages/FeatureAdd";
import CountryAdd from "./pages/CountryAdd";
import MappingAdd from "./pages/MappingAdd";

function App() {

  const isAuthenticated = () => {
    const token = localStorage.getItem("accessToken");
    return token && token!=="undefined";
  };


  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />

        <Route
          path="/home"
          element={
            isAuthenticated() ? <Home /> : <Navigate to="/login" />
          }
        />
        
        <Route path="/addVehicle" element={isAuthenticated() ? <VehicleAdd /> : <Navigate to="/login"/>} />

        <Route path="/addfeature" element={isAuthenticated() ? <FeatureAdd /> : <Navigate to="/login"/>} />

        <Route path="/addcountry" element={isAuthenticated() ? <CountryAdd /> : <Navigate to="/login"/>} />
        
        <Route path="/addMapping" element={isAuthenticated() ? <MappingAdd /> : <Navigate to="/login"/>} />

        <Route path="*" element={<Navigate to="/home" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
