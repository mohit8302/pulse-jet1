import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import Dashboard from "./pages/Dashboard/Dashboard";
import Dashboard2 from "./pages/Dashboard2/Dashboard2";
import socketIOClient from 'socket.io-client';
import React,{useState,useEffect} from "react";
import D2 from "./pages/Dashboard2/d2";
import ThreeScene from "./pages/Model";
import axios from 'axios';

// Make a GET request to fetch data from the backend

const ENDPOINT = 'http://localhost:5173';
function App() {
  const [arduinoData, setArduinoData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/api/data')
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
    const socket = socketIOClient(ENDPOINT);

    // Listen for Arduino data
    socket.on('arduino-data', (data) => {
      setArduinoData(data);
    });

    return () => {
      socket.disconnect(); // Clean up socket connection when component unmounts
    };
  }, []);


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
      {arduinoData && (
        <div>
          <p>Data from Arduino:</p>
          <ul>
            <li>Inlet Temperature: {arduinoData.inletTemp}</li>
            <li>Outlet Temperature: {arduinoData.outletTemp}</li>
            <li>Blower Pressure: {arduinoData.blowerPressure}</li>
            <li>Exhaust Pressure: {arduinoData.exhaustPressure}</li>
            <li>Fuel Intake: {arduinoData.fuelIntake}</li>
            <li>Smoke Quality: {arduinoData.smokeQuality}</li>
          </ul>
        </div>
      )}
    </>
  );
}

export default App;
