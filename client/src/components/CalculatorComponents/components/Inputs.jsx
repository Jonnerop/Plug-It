import React from "react";

const Inputs = ({ power, setPower, cost, setCost, batteryCapacity, setBatteryCapacity, currentCharge, setCurrentCharge, efficiency, setEfficiency }) => (
    <div className="font-Roboto text-base font-bold m-8 mt-0 mb-1">
        {/* Grid Layout for Inputs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <input
                type="number"
                placeholder="Battery capacity (kWh)"
                className="py-2 px-3 rounded w-full"
                value={batteryCapacity}
                onChange={(e) => setBatteryCapacity(e.target.value)}
            />
            <input
                type="number"
                placeholder="Enter charger power (kW)"
                className="py-2 px-3 rounded w-full"
                value={power}
                onChange={(e) => setPower(e.target.value)}
            />
            <input
                type="number"
                placeholder="Current charge (%)"
                className="py-2 px-3 rounded w-full"
                value={currentCharge}
                onChange={(e) => setCurrentCharge(e.target.value)}
            />
            <input
                type="number"
                placeholder="Electricity cost (cnt/kWh)"
                className="py-2 px-3 rounded w-full"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
            />
            <input
                type="number"
                placeholder="Efficiency (%)"
                className="py-2 px-3 rounded w-full"
                value={efficiency}
                onChange={(e) => setEfficiency(e.target.value)}
            />
        </div>
    </div>
);

export default Inputs;
