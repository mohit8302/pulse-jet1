import React, { useState, useEffect } from "react";

import socketIOClient from "socket.io-client";
import "./Dashboard2.css";
import Header from "../../components/Header/Header";
import Up from "../../assets/Up.png";
import Down from "../../assets/Down.png";
import { calculateCOP, calculateConnectiveHT, calculateReynoldsNumber, calculateEfficiency, calculatePrRatio, calculateSpStRatio, calculateMachNumber, calculateSpecificImpulse} from "./formulas";
import {useParams} from "react-router-dom";



import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
// import { useDashboard2 } from "../../hooks";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ENDPOINT = "http://localhost:5173";

const Dashboard2 = () => {

  const critical = 40;
  const [arduinoData, setArduinoData] = useState({
    inletTemp: 700,
    outletTemp: 500,
    blowerPressure:230,
    exhaustPressure: 180,
    fuelIntake: 3,
    smokeQuality: 80,
  });
const [cop, setCOP] = useState(0);
const [connectiveHT, setConnectiveHT] = useState(0);
const [reynoldsNumber, setReynoldsNumber] = useState(0);
const [efficiency, setEfficiency] = useState(0);
const [prRatio, setPrRatio] = useState(0);
const [spStRatio, setSpStRatio] = useState(0);
const [machNumber, setMachNumber] = useState(0);
const [specificImpulse, setSpecificImpulse] = useState(0);
const [outTemperature, setOutTemperature] = useState([]);
  const exitVelocity = 127.52;


const tempAtCC=1500
const pressureAtCC=12000 
const amplitudeDamping = 0.6324;
const phaseShift=8.43 +'\u00B0' ;
const updateOutletTemp = () => {
  const newInletTemp = Math.floor(Math.random() * 1501);

  setArduinoData((prevData) => ({
    ...prevData,
    outletTemp: newInletTemp,
  }));
};

useEffect(() => {
  updateOutletTemp();
 

  const intervalId = setInterval(() => {
    updateOutletTemp();
  
  }, 5000);

  return () => clearInterval(intervalId);
}, []);


useEffect(() => {
  const socket = socketIOClient(ENDPOINT);
  
  const newSpecificImpulse = calculateSpecificImpulse(arduinoData.exhaustPressure,arduinoData.fuelIntake);
    setSpecificImpulse(newSpecificImpulse);
    const newCOP = calculateCOP(arduinoData.outletTemp,arduinoData.blowerPressure,arduinoData.exhaustPressure,arduinoData.inletTemp,tempAtCC,arduinoData.fuelIntake,machNumber);
    setCOP(newCOP);
    
    // Calculate and update other values here
    const newConnectiveHT = calculateConnectiveHT(arduinoData.outletTemp,tempAtCC,arduinoData.exhaustPressure);
    setConnectiveHT(newConnectiveHT);

  
    const newReynoldsNumber = calculateReynoldsNumber(exitVelocity);
    setReynoldsNumber(newReynoldsNumber);

    const newEfficiency = calculateEfficiency(arduinoData.blowerPressure,arduinoData.fuelIntake,arduinoData.inletTemp,arduinoData.outletTemp,machNumber,arduinoData.exhaustPressure);
    setEfficiency(newEfficiency);

    const newPrRatio = calculatePrRatio(machNumber);
    setPrRatio(newPrRatio);

    const newSpStRatio = calculateSpStRatio(arduinoData.inletTemp,arduinoData.outletTemp,arduinoData.blowerPressure,arduinoData.exhaustPressure);
    setSpStRatio(newSpStRatio);

    const newMachNumber = calculateMachNumber(exitVelocity);
    setMachNumber(newMachNumber);



  socket.on("arduino-data", (data) => {
    setArduinoData(data);
    
    //Calculate COP whenever inlet or outlet temperature changes
    const newCOP = calculateCOP(connectiveHT,efficiency,arduinoData.outletTemp,arduinoData.blowerPressure,arduinoData.exhaustPressure,arduinoData.inletTemp);
    setCOP(newCOP);
    
    // Calculate and update other values here
    const newConnectiveHT = calculateConnectiveHT(arduinoData.outletTemp,tempAtCC,arduinoData.exhaustPressure);
    setConnectiveHT(newConnectiveHT);


    const newReynoldsNumber = calculateReynoldsNumber(exitVelocity);
    setReynoldsNumber(newReynoldsNumber);

    const newEfficiency = calculateEfficiency(arduinoData.blowerPressure,arduinoData.fuelIntake,arduinoData.inletTemp,arduinoData.outletTemp,machNumber,arduinoData.exhaustPressure);
    setEfficiency(newEfficiency);

    const newPrRatio = calculatePrRatio(machNumber);
    setPrRatio(newPrRatio);

    const newSpStRatio = calculateSpStRatio(arduinoData.inletTemp,arduinoData.outletTemp,arduinoData.blowerPressure,arduinoData.exhaustPressure);
    setSpStRatio(newSpStRatio);

    const newMachNumber = calculateMachNumber(exitVelocity);
    setMachNumber(newMachNumber);

    const newSpecificImpulse = calculateSpecificImpulse(arduinoData.exhaustPressure,arduinoData.fuelIntake);
    setSpecificImpulse(newSpecificImpulse);

  });
 
  return () => {
    socket.disconnect(); // Clean up socket connection when component unmounts
  };
}, []);
useEffect(() => {
  setOutTemperature((prevTemperature) => {
    const newTemperatureQueue = [...prevTemperature, arduinoData.outletTemp];
    if (newTemperatureQueue.length > 8) {
      newTemperatureQueue.shift();
    }
    return newTemperatureQueue;
  });
}, [arduinoData.outletTemp]);


  return (
    <>
      <Header />
      <div className="Dash_Main">
        <div className="Value_Section">
           <div className="Values">
           <div className="Value">
              <h2>Specific Fuel Consumption :</h2>
              <div className="Case_Box">
                <h1>{cop}</h1>
              </div>
              <img
                src={critical > arduinoData.COP ? Up : Down}
                alt="Arrow UP"
              />
            </div>
            <div className="Value">
              <h2>Heat added per unit mass :</h2>
              <div className="Case_Box">
                <h1>{connectiveHT}</h1>
              </div>
              <img
                src={critical > connectiveHT ? Up : Down}
                alt="Arrow UP"
              />
            </div>
            <div className="Value">
              <h2>Exit Velocity :</h2>
              <div className="Case_Box">
                <h1>{exitVelocity}</h1>
              </div>
              <img
                src={critical > exitVelocity ? Up : Down}
                alt="Arrow UP"
              />
            </div>
            <div className="Value">
              <h2>Reynold's Number :</h2>
              <div className="Case_Box">
                <h1>{reynoldsNumber}</h1>
              </div>
              <img
                src={critical > reynoldsNumber ? Up : Down}
                alt="Arrow UP"
              />
            </div>
            <div className="Value">
              <h2>Efficiency :</h2>
              <div className="Case_Box">
                <h1>{efficiency}</h1>
              </div>
              <img
                src={critical > efficiency ? Up : Down}
                alt="Arrow UP"
              />
            </div>
            <div className="Value">
              <h2>Pressure Ratio :</h2>
              <div className="Case_Box">
                <h1>{prRatio}</h1>
              </div>
              <img
                src={critical > prRatio ? Up : Down}
                alt="Arrow UP"
              />
            </div>
            <div className="Value">
              <h2>δP/δT Ratio :</h2>
              <div className="Case_Box">
                <h1>{spStRatio}</h1>
              </div>
              <img
                src={critical > spStRatio ? Up : Down}
                alt="Arrow UP"
              />
            </div>
            <div className="Value">
              <h2>Mach Number :</h2>
              <div className="Case_Box">
                <h1>{machNumber}</h1>
              </div>
              <img
                src={critical > machNumber ? Up : Down}
                alt="Arrow UP"
              />
            </div>
            <div className="Value">
              <h2>Amplitude Damping :</h2>
              <div className="Case_Box">
                <h1>{amplitudeDamping}</h1>
              </div>
              <img
                src={critical > amplitudeDamping ? Up : Down}
                alt="Arrow UP"
              />
            </div>
            <div className="Value">
              <h2>Specific Impulse :</h2>
              <div className="Case_Box">
                <h1>{specificImpulse}</h1>
              </div>
              <img
                src={critical > specificImpulse ? Up : Down}
                alt="Arrow UP"
              />
            </div>
            <div className="Value">
              <h2>Phase Shift :</h2>
              <div className="Case_Box">
                <h1>{phaseShift}</h1>
              </div>
              <img
                src={critical > phaseShift ? Up : Down}
                alt="Arrow UP"
              />
            </div>
          </div>
        </div>
        <div className="Graph_Section">
          <div className="Graphs">
          <Line
                data={{
                  labels: [1,2,3,4,5,6,7,8],
                  datasets: [
                    {
                      label: "Exhaust Pressure",
                      data: exitVelocity,
                      backgroundColor: "green",
                      borderColor: "green",
                      borderWidth: 1,
                    },
                    {
                      label: "Outlet Temp",
                      data: outTemperature,
                      backgroundColor: "red",
                      borderColor: "red",
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "bottom",
                    },
                    title: {
                      display: true,
                      text: "Exit Velocity Vs Outlet Temperature ",
                    },
                  },
                  scales: {
                    x: {
                      min: 0,
                      max: 1500,
                    },
                    y: {
                      min: 0,
                      max: 1500,
                    },
                  },
                }}
              />
              <Line
                data={{
                  labels: [1,2,3,4,5,6,7,8],
                  datasets: [
                    {
                      label: "Exhaust Pressure",
                      data: exitVelocity,
                      backgroundColor: "green",
                      borderColor: "green",
                      borderWidth: 1,
                    },
                    {
                      label: "Outlet Temp",
                      data: outTemperature,
                      backgroundColor: "red",
                      borderColor: "red",
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "bottom",
                    },
                    title: {
                      display: true,
                      text: "Exhaust Pressure Vs Outlet Temperature ",
                    },
                  },
                  scales: {
                    x: {
                      min: 0,
                      max: 1500,
                    },
                    y: {
                      min: 0,
                      max: 1500,
                    },
                  },
                }}
              />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard2;
