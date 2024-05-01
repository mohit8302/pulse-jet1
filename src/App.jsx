import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import Dashboard from "./pages/Dashboard/Dashboard";
import Dashboard2 from "./pages/Dashboard2/Dashboard2";
import socketIOClient from 'socket.io-client';
import React,{useState,useEffect} from "react";
import D2 from "./pages/Dashboard2/d2";
import ThreeScene from "./pages/Model";


const ENDPOINT = 'http://localhost:5173';
function App() {
  const [arduinoData, setArduinoData] = useState(null);

  useEffect(() => {
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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard2" element={<Dashboard2 />} />
          <Route path="/model" element={<ThreeScene/>} />
          <Route path="/d2" element={<D2/>} />
        </Routes>
      </BrowserRouter>
      {arduinoData && <p>Data from Arduino: {arduinoData}</p>}
    </>
  );
}

export default App;
