import React from "react";
import "./Dashboard.css";
import Header from "../../components/Header/Header";
import Speedometer from "../../components/Speedometer/Speedometer";
import { AmbientTemperature } from "../../components/ambientTemp";
import socketIOClient from "socket.io-client";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
import ThreeScene from "../Model";
import { Spinner } from "../../components/spinner";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const ENDPOINT =
  "https://pulse-backend-ag3fk60ce-mohits-projects-173e27ad.vercel.app/server.js";

const Dashboard = () => {
  const [inTemperature, setInTemperature] = useState([]);
  const [outTemperature, setOutTemperature] = useState([]);
  const [exhaustPressure, setexhaustPressure] = useState([]);
  const [fuelRate, setfuelRate] = useState([]);
  const [smokeQuality, setSmokeQuality] = useState([]);
  const [blowerPressure, setBlowerPressure] = useState([]);

  const [arduinoData, setArduinoData] = useState({
    inletTemp: 123,
    outletTemp: 834,
    blowerPressure: 134,
    exhaustPressure: 230,
    fuelIntake: 3,
    smokeQuality: 230,
  });
  const [lineGraphData, setLineGraphData] = useState({
    labels: ["0"],
    datasets: [
      {
        label: "Temperature",
        data: [0],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  });
  useEffect(() => {
    updateInletTemp();
    updateOutletTemp();
    updateExhaustPre();
    updateFuelRate();

    const intervalId = setInterval(() => {
      updateInletTemp();
      updateOutletTemp();
      updateExhaustPre();
      updateFuelRate();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setInTemperature((prevTemperature) => {
      const newTemperatureQueue = [...prevTemperature, arduinoData.inletTemp];
      if (newTemperatureQueue.length > 8) {
        newTemperatureQueue.shift();
      }
      return newTemperatureQueue;
    });
  }, [arduinoData.inletTemp]);
  useEffect(() => {
    setOutTemperature((prevTemperature) => {
      const newTemperatureQueue = [...prevTemperature, arduinoData.outletTemp];
      if (newTemperatureQueue.length > 8) {
        newTemperatureQueue.shift();
      }
      return newTemperatureQueue;
    });
  }, [arduinoData.outletTemp]);
  useEffect(() => {
    setexhaustPressure((prevPressure) => {
      const newPressureQueue = [...prevPressure, arduinoData.exhaustPressure];
      if (newPressureQueue.length > 8) {
        newPressureQueue.shift();
      }
      return newPressureQueue;
    });
  }, [arduinoData.exhaustPressure]);
  useEffect(() => {
    setfuelRate((prevFuel) => {
      const newFuelQueue = [...prevFuel, arduinoData.fuelIntake];
      if (newFuelQueue.length > 8) {
        newFuelQueue.shift();
      }
      return newFuelQueue;
    });
  }, [arduinoData.fuelIntake]);
  const updateInletTemp = () => {
    const newInletTemp = Math.floor(Math.random() * 1501);

    setArduinoData((prevData) => ({
      ...prevData,
      inletTemp: newInletTemp,
    }));
  };
  const updateOutletTemp = () => {
    const newInletTemp = Math.floor(Math.random() * 1501);

    setArduinoData((prevData) => ({
      ...prevData,
      outletTemp: newInletTemp,
    }));
  };
  const updateExhaustPre = () => {
    const newInletPre = Math.floor(Math.random() * 1501);

    setArduinoData((prevData) => ({
      ...prevData,
      exhaustPressure: newInletPre,
    }));
  };
  const updateFuelRate = () => {
    const newInletFuel = Math.floor(Math.random() * 1501);

    setArduinoData((prevData) => ({
      ...prevData,
      fuelIntake: newInletFuel,
    }));
  };

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    socket.on("arduino-data", (data) => {
      // console.log(data);
      setInTemperature(data.inletTemp);
      setOutTemperature(data.outletTemp);
      setExhaustPressure(data.exhaustPressure);
      setFuelIntake(data.fuelIntake);
      setSmokeQuality(data.smokeQuality);

      setLineGraphData((prevData) => {
        const newData = {
          labels: [...prevData.labels, data.outletTemp],
          datasets: [
            {
              ...prevData.datasets[0],
              data: [...prevData.datasets[0].data, data.inletTemp],
            },
          ],
        };
        return newData;
      });
    });
    return () => {
      socket.disconnect(); // Clean up socket connection when component unmounts
    };
  }, []);

  return (
    <>
      <Header />
      <div className="Main_Section">
        <Speedometer
          inletTemp={arduinoData.inletTemp}
          outletTemp={arduinoData.outletTemp}
          blowerPressure={arduinoData.blowerPressure}
          exhaustPressure={arduinoData.exhaustPressure}
          fuelIntake={arduinoData.fuelIntake}
          smokeQuality={arduinoData.smokeQuality}
        />
        <AmbientTemperature />
        <div className="Line_Section">
          <div className="LineGraphs">
            <div className="LineChart">
              <Line
                data={{
                  labels: [1, 2, 3, 4, 5, 6, 7, 8],
                  datasets: [
                    {
                      label: "Inlet Temp",
                      data: inTemperature,
                      backgroundColor: "rgb(53, 162, 235)",
                      borderColor: "rgba(53, 162, 235, 0.5)",
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
                      text: "Outlet Temperature Vs Inlet Temperature ",
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
            <div className="LineChart">
              <Line
                data={{
                  labels: [1, 2, 3, 4, 5, 6, 7, 8],
                  datasets: [
                    {
                      label: "Exhaust Pressure",
                      data: exhaustPressure,
                      backgroundColor: "green",
                      borderColor: "green",
                      borderWidth: 1,
                    },
                    {
                      label: "Fuel Rate",
                      data: fuelRate,
                      backgroundColor: "gold",
                      borderColor: "gold",
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
                      text: "Exhaust Pressure Vs Fuel Rate ",
                    },
                  },
                  scales: {
                    x: {
                      min: 0,
                      max: 8,
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
          <div
            className="LineGraphs"
            style={{ marginTop: "100px", marginBottom: "50px" }}
          >
            <div className="LineChart">
              <Line
                data={{
                  labels: [1, 2, 3, 4, 5, 6, 7, 8],
                  datasets: [
                    {
                      label: "Exhaust Pressure",
                      data: exhaustPressure,
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
      </div>
    </>
  );
};

export default Dashboard;
