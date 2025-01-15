import React from "react";
import { useCalculator } from "./calculatorHooks/useCalculator";
import Inputs from "./components/Inputs";
import Results from "./components/Results";
import logo from "../../assets/images/logo_no_bg.png";

const Calculator = () => {
  const {
    power,
    setPower,
    cost,
    setCost,
    batteryCapacity,
    setBatteryCapacity,
    currentCharge,
    setCurrentCharge,
    targetCharge,
    setTargetCharge,
    efficiency,
    setEfficiency,
    result,
    errorMessage,
    calculateCharging,
    resetCalculator,
    handleSliderChange,
  } = useCalculator();

  return (
    <div className="relative ml-10 md:ml-0 mr-10 lg:ml-0 mt-8 md:mt-0 rounded-md shadow-xl shadow-lightGreen lg:w-calculatorWidth overflow-hidden bg-gradient-to-b from-darkerBlue to-darkBlue">
      {result ? (
        <Results
          result={result}
          targetCharge={targetCharge}
          handleSliderChange={handleSliderChange}
          resetCalculator={resetCalculator}
        />
      ) : (
        <div className="relative z-20 flex flex-col">
          <div className="m-8 text-center lg:text-left">
            <h2 className="font-Orbitron text-xl text-electricBlue font-medium">
              Calculate the time and cost of charging your car
            </h2>
          </div>
          <Inputs
            power={power}
            setPower={setPower}
            cost={cost}
            setCost={setCost}
            batteryCapacity={batteryCapacity}
            setBatteryCapacity={setBatteryCapacity}
            currentCharge={currentCharge}
            setCurrentCharge={setCurrentCharge}
            efficiency={efficiency}
            setEfficiency={setEfficiency}
          />
          {/* Error message */}
          {errorMessage && (
            <p className="text-red-500 text-center font-Roboto text-lg mt-2">
              {errorMessage}
            </p>
          )}
          <div className="flex justify-between items-center pb-4">
            <button
              onClick={calculateCharging}
              className="font-Roboto bg-lilac rounded-lg text-xl py-1 px-12 ml-8 text-white hover:bg-darkLilac hover:text-white transition duration-500 mt-4"
            >
              Calculate
            </button>
            <img src={logo} alt="logo" className="w-20 pr-8 mt-2" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Calculator;
