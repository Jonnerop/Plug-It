import React from "react";

const Results = ({
  result,
  targetCharge,
  handleSliderChange,
  resetCalculator,
}) => (
  <div className="m-4 text-center lg:text-left bg-gradient-to-r from-gray-800 to-gray-900 p-4 rounded-lg shadow-md">
    <h2 className="font-Orbitron text-xl text-electricBlue font-semibold mb-4">
      Charging Time and Cost
    </h2>

    <div className="grid grid-cols-2 gap-4 text-white font-Roboto text-sm mb-4">
      <div className="bg-gray-700 p-3 rounded-md shadow-sm">
        <p>Battery Capacity:</p>
        <strong className="text-electricBlue">
          {result.inputs.batteryCapacity} kWh
        </strong>
      </div>
      <div className="bg-gray-700 p-3 rounded-md shadow-sm">
        <p>Charger Power:</p>
        <strong className="text-electricBlue">{result.inputs.power} kW</strong>
      </div>
      <div className="bg-gray-700 p-3 rounded-md shadow-sm">
        <p>Electricity Cost:</p>
        <strong className="text-electricBlue">
          {result.inputs.cost} €/kWh
        </strong>
      </div>
      <div className="bg-gray-700 p-3 rounded-md shadow-sm">
        <p>Current Charge:</p>
        <strong className="text-electricBlue">
          {result.inputs.currentCharge} %
        </strong>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4 text-white font-Roboto text-sm mb-4">
      <div className="bg-gray-700 p-3 rounded-md shadow-sm">
        <p>Charging Time:</p>
        <strong className="text-green-400">{result.time} hours</strong>
      </div>
      <div className="bg-gray-700 p-3 rounded-md shadow-sm">
        <p>Charging Cost:</p>
        <strong className="text-green-400">{result.cost} €</strong>
      </div>
    </div>

    <div className="flex flex-col items-center lg:items-start mt-4">
      <label className="text-white font-Roboto text-sm mb-2">
        Adjust Target Charge:{" "}
        <span className="text-electricBlue">{targetCharge}%</span>
      </label>
      <input
        type="range"
        min={parseFloat(result.inputs.currentCharge) + 1}
        max={100}
        value={targetCharge}
        onChange={(e) => handleSliderChange(e.target.value)}
        className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #06b6d4 ${
            ((targetCharge - result.inputs.currentCharge) /
              (100 - result.inputs.currentCharge)) *
            100
          }%, #4b5563 ${
            ((targetCharge - result.inputs.currentCharge) /
              (100 - result.inputs.currentCharge)) *
            100
          }%)`,
        }}
      />
    </div>

    <button
      onClick={resetCalculator}
      className="font-Roboto bg-lilac rounded-lg text-sm py-2 px-8 mt-4 text-white hover:bg-darkLilac hover:scale-105 transition duration-300 shadow-md"
    >
      Calculate Again
    </button>
  </div>
);

export default Results;
