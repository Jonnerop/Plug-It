import { useState } from "react";

export const useCalculator = () => {
    const [power, setPower] = useState("");
    const [cost, setCost] = useState("");
    const [batteryCapacity, setBatteryCapacity] = useState("");
    const [currentCharge, setCurrentCharge] = useState("");
    const [targetCharge, setTargetCharge] = useState(100);
    const [efficiency, setEfficiency] = useState(90);
    const [errorMessage, setErrorMessage] = useState("");
    const [result, setResult] = useState(null);

    const calculateCharging = () => {
        const capacity = parseFloat(batteryCapacity);
        const current = parseFloat(currentCharge);
        const target = parseFloat(targetCharge);
        const pow = parseFloat(power);
        const cos = parseFloat(cost) * 0.01; // Convert to €/kWh
        const eff = parseFloat(efficiency) / 100;

        if (
            isNaN(capacity) || 
            isNaN(current) || 
            isNaN(pow) || 
            isNaN(cos) || 
            isNaN(eff)
        ) {
            setErrorMessage("Please fill in all fields with valid values.");
            return;
        }

        if (!pow || !eff) {
            setErrorMessage("Power and efficiency must be greater than zero.");
            return;
        }

        if (current < 0 || current > 100) {
            setErrorMessage("Charge value must be between 0 and 100%");
            return;
        }

        setErrorMessage("");

        const energyNeeded = capacity * ((target - current) / 100);
        const chargingTime = energyNeeded / (pow * eff);
        const chargingCost = energyNeeded * cos;

        setResult({
            time: chargingTime.toFixed(2),
            cost: chargingCost.toFixed(2),
            inputs: {
                power: pow,
                cost: cos,
                batteryCapacity: capacity,
                currentCharge: current,
            }
        });
    };

    const resetCalculator = () => {
        setPower("");
        setCost("");
        setBatteryCapacity("");
        setCurrentCharge("");
        setEfficiency(90);
        setTargetCharge(100);
        setErrorMessage("");
        setResult(null);
    };

    const handleSliderChange = (newTargetCharge) => {
        const capacity = parseFloat(batteryCapacity);
        const current = parseFloat(currentCharge);
        const pow = parseFloat(power);
        const cos = parseFloat(cost) * 0.01; // Convert to euros
        const eff = parseFloat(efficiency) / 100;

        const energyNeeded = capacity * ((newTargetCharge - current) / 100);
        const chargingTime = energyNeeded / (pow * eff);
        const chargingCost = energyNeeded * cos;

        setResult({
            time: chargingTime.toFixed(2),
            cost: chargingCost.toFixed(2),
            inputs: result.inputs,
        });

        setTargetCharge(newTargetCharge);
    };

    return {
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
        setResult,
        errorMessage,
        setErrorMessage,
        calculateCharging,
        resetCalculator,
        handleSliderChange
    };
};
