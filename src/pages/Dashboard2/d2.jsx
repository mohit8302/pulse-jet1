import React, { useState, useEffect } from "react";
 // Import the function for specific impulse calculation
import "./Dashboard2.css";
import Header from "../../components/Header/Header";
import Up from "../../assets/Up.png";
import Down from "../../assets/Down.png";
import { calculateCOP, calculateConnectiveHT, calculateReynoldsNumber, calculateEfficiency, calculatePrRatio, calculateSpStRatio, calculateMachNumber, calculateSpecificImpulse} from "./formulas";

const D2 = () => {
const [connectiveHT, setConnectiveHT] = useState(0);
  const [cop, setCOP] = useState(0);
const [reynoldsNumber, setReynoldsNumber] = useState(0);
const [efficiency, setEfficiency] = useState(0);
const [prRatio, setPrRatio] = useState(0);
const [spStRatio, setSpStRatio] = useState(0);
const [machNumber, setMachNumber] = useState(0);
const [specificImpulse, setSpecificImpulse] = useState(0);
const [outTemperature, setOutTemperature] = useState([]);
const exitVelocity = 127.52;

  const critical = 40;
  const [arduinoData, setArduinoData] = useState({
    inletTemp: 700,
    outletTemp: 500,
    blowerPressure:230,
    exhaustPressure: 180,
    fuelIntake: 3,
    smokeQuality: 80,
  });

  const exhaustPressure = 100; // Example value
  const outletTemp=212
  const tempAtCC=1500
  const amplitudeDamping = 0.6324;
  const phaseShift=8.43 +'\u00B0' ;
  const pressureAtCC=12000;

  useEffect(() => {
    // Calculate specific impulse with hardcoded values
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

    const newSpecificImpulse = calculateSpecificImpulse(arduinoData.exhaustPressure,arduinoData.fuelIntake);
    setSpecificImpulse(newSpecificImpulse);
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <>
      <Header />
      <div className="Value">
        <h2>Specific Impulse</h2>
        <div className="Case_Box">
          <h1>{specificImpulse}</h1>
        </div>
        <img
          src={critical > specificImpulse ? Up : Down}
          alt="Arrow UP"
        />
      </div>
      <div className="Value">
        <h2>Pressure Ratio</h2>
        <div className="Case_Box">
          <h1>{prRatio}</h1>
        </div>
        <img
          src={critical > prRatio ? Up : Down}
          alt="Arrow UP"
        />
      </div>
      <div className="Value">
        <h2>Efficiecny</h2>
        <div className="Case_Box">
          <h1>{efficiency}</h1>
        </div>
        <img
          src={critical > efficiency ? Up : Down}
          alt="Arrow UP"
        />
      </div>
      <div className="Value">
        <h2>Specific fuel Consumption </h2>
        <div className="Case_Box">
          <h1>{cop}</h1>
        </div>
        <img
          src={critical > cop ? Up : Down}
          alt="Arrow UP"
        />
      </div>
      <div className="Value">
        <h2>Heat Added per unit mass </h2>
        <div className="Case_Box">
          <h1>{connectiveHT}</h1>
        </div>
        <img
          src={critical > connectiveHT ? Up : Down}
          alt="Arrow UP"
        />
      </div>
      <div className="Value">
        <h2>renolds no.</h2>
        <div className="Case_Box">
          <h1>{reynoldsNumber}</h1>
        </div>
        <img
          src={critical > reynoldsNumber ? Up : Down}
          alt="Arrow UP"
        />
      </div>
      <div className="Value">
        <h2>Mach No.</h2>
        <div className="Case_Box">
          <h1>{machNumber}</h1>
        </div>
        <img
          src={critical > machNumber ? Up : Down}
          alt="Arrow UP"
        />
      </div>
      <div className="Value">
        <h2>sp/sp</h2>
        <div className="Case_Box">
          <h1>{spStRatio}</h1>
        </div>
        <img
          src={critical > spStRatio ? Up : Down}
          alt="Arrow UP"
        />
      </div>
    </>
  );
};

export default D2;
