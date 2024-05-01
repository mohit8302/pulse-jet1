import React from "react";
import ReactSpeedometer from "react-d3-speedometer/slim";
import "./Speedometer.css";

const Speedometer = ({ inletTemp, outletTemp, blowerPressure, exhaustPressure, fuelIntake, smokeQuality }) => {
  return (
    <>
      <div className="Speedometer_Section">
        <div className="Speedometer">
          <div className="Case_Box">
            <h1>Inlet Temperature</h1>
          </div>
          <ReactSpeedometer
            maxValue={1500}
            value={inletTemp}
            needleColor="#00000"
            segments={1}
            ringWidth={20}
            width={230}
            height={230}
            needleHeightRatio={0.7}
            startColor="#003366"
          />
        </div>
        <div className="Speedometer">
          <div className="Case_Box">
            <h1>Outlet Temperature</h1>
          </div>
          <ReactSpeedometer
            maxValue={1500}
            value={outletTemp}
            needleColor="#000000"
            segments={1}
            ringWidth={20}
            width={230}
            height={230}
            needleHeightRatio={0.7}
            startColor="#FF0000"
          />
        </div>
        <div className="Speedometer">
          <div className="Case_Box">
            <h1>Blower Pressure</h1>
          </div>
          <ReactSpeedometer
            maxValue={300}
            value={blowerPressure}
            needleColor="#00000"
            segments={1}
            ringWidth={20}
            width={230}
            height={230}
            needleHeightRatio={0.7}
            startColor="#C0C0C0"
          />
        </div>
        <div className="Speedometer">
          <div className="Case_Box">
            <h1>Exhaust Pressure</h1>
          </div>
          <ReactSpeedometer
            maxValue={300}
            value={exhaustPressure}
            needleColor="#00000"
            segments={1}
            ringWidth={20}
            width={230}
            height={230}
            needleHeightRatio={0.7}
            startColor="#2F4F4F"
          />
        </div>
        <div className="Speedometer">
          <div className="Case_Box">
            <h1>Fuel Intake</h1>
          </div>
          <ReactSpeedometer
            maxValue={5}
            value={fuelIntake}
            needleColor="#00000"
            segments={1}
            ringWidth={20}
            width={230}
            height={230}
            needleHeightRatio={0.7}
            startColor="#FFFFCC"
          />
        </div>
        <div className="Speedometer">
          <div className="Case_Box">
            <h1>Smoke Quality</h1>
          </div>
          <ReactSpeedometer
            maxValue={300}
            value={smokeQuality}
            needleColor="#00000"
            segments={1}
            ringWidth={20}
            width={230}
            height={230}
            needleHeightRatio={0.7}
            startColor="#00FFFF"
          />
        </div>
      </div>
    </>
  );
};

export default Speedometer;
