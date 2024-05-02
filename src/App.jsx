import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import Dashboard from "./pages/Dashboard/Dashboard";
import Dashboard2 from "./pages/Dashboard2/Dashboard2";
import React,{useState,useEffect} from "react";
import ThreeScene from "./pages/Model";


// Make a GET request to fetch data from the backend




  return (
    <>
      <BrowserRouter>
        <Routes>
         
          <Route path="/" element={<Signup/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />
          <Route
            path="/dashboard2"
            element={<Dashboard2  />}
          />
          <Route path="/model" element={<ThreeScene/>} />
          <Route path="/d2" element={<D2/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
