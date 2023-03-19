import ResistorAnimation from "./ResistorAnimation";

import { useEffect, useState } from "react";

const colorValues = {
    black: 0,
    brown: 1,
    red: 2,
    orange: 3,
    yellow: 4,
    green: 5,
    blue: 6,
    violet: 7,
    gray: 8,
    white: 9,
    gold: -1,
    silver: -2,
    none: 20
};

export default function ResistorCalculator() {
    const [firstDigitColor, setFirstDigitColor] = useState("brown");
    const [secondDigitColor, setSecondDigitColor] = useState("black");
    const [multiplierColor, setMultiplierColor] = useState("red");
    const [toleranceColor, setToleranceColor] = useState("gold");
    const [resistanceValue, setResistanceValue] = useState("");

    useEffect(() => {
        const value =
            (colorValues[firstDigitColor] * 10 + colorValues[secondDigitColor]) *
            10 ** colorValues[multiplierColor];
        const tolerance =
            toleranceColor === "gold"
                ? "+5% tolerance"
                : toleranceColor === "silver"
                    ? "+10% tolerance"
                    : toleranceColor === "none"
                        ? "+20% tolerance"
                        : `+${colorValues[toleranceColor]}% tolerance`;
        setResistanceValue(`${value} ohms ${tolerance}`);
    }, [firstDigitColor, secondDigitColor, multiplierColor, toleranceColor]);

    return (
        <div>
            <ResistorAnimation
                firstDigitColor={firstDigitColor}
                secondDigitColor={secondDigitColor}
                multiplierColor={multiplierColor}
                toleranceColor={toleranceColor}
            />

            <div className="row mt-5 mx-5">

                <div className="col-md">
                    <div className="form-floating">
                        <select id="firstDigitBand" className="form-select" aria-label="Floating label select example" onChange={(e) => setFirstDigitColor(e.target.value)}>
                            <option className="bg bg-black text-white" value="black">Black</option>
                            <option className="bg bg-brown" value="brown" selected>Brown</option>
                            <option className="bg bg-red" value="red">Red</option>
                            <option className="bg bg-orange" value="orange">Orange</option>
                            <option className="bg bg-yellow" value="yellow">Yellow</option>
                            <option className="bg bg-green" value="green">Green</option>
                            <option className="bg bg-blue" value="blue">Blue</option>
                            <option className="bg bg-violet" value="violet">Violet</option>
                            <option className="bg bg-gray" value="gray">Gray</option>
                            <option className="bg bg-white" value="white">White</option>
                        </select>
                        <label htmlFor="firstDigitBand" className="mb-2">First Band</label>
                    </div>
                </div>

                <div className="col-md">
                    <div className="form-floating">
                        <select id="secondDigitBand" className="form-select" aria-label="Default select example" onChange={(e) => setSecondDigitColor(e.target.value)}>
                            <option className="bg bg-black text-white" value="black">Black</option>
                            <option className="bg bg-brown" value="brown">Brown</option>
                            <option className="bg bg-red" value="red">Red</option>
                            <option className="bg bg-orange" value="orange">Orange</option>
                            <option className="bg bg-yellow" value="yellow">Yellow</option>
                            <option className="bg bg-green" value="green">Green</option>
                            <option className="bg bg-blue" value="blue">Blue</option>
                            <option className="bg bg-violet" value="violet">Violet</option>
                            <option className="bg bg-gray" value="gray">Gray</option>
                            <option className="bg bg-white" value="white">White</option>
                        </select>
                        <label htmlFor="secondDigitBand" className="form-floating">Second Band</label>
                    </div>
                </div>



                <div className="col-md">
                    <div className="form-floating">
                        <select id="multiplierDigitBand" className="form-select" aria-label="Default select example" onChange={(e) => setMultiplierColor(e.target.value)}>
                            <option className="bg bg-black text-white" value="black">Black</option>
                            <option className="bg bg-brown" value="brown">Brown</option>
                            <option className="bg bg-red" value="red">Red</option>
                            <option className="bg bg-orange" value="orange">Orange</option>
                            <option className="bg bg-yellow" value="yellow">Yellow</option>
                            <option className="bg bg-green" value="green">Green</option>
                            <option className="bg bg-blue" value="blue">Blue</option>
                            <option className="bg bg-violet" value="violet">Violet</option>
                            <option className="bg bg-gray" value="gray">Gray</option>
                            <option className="bg bg-white" value="white">White</option>
                        </select>
                        <label htmlFor="multiplierDigitBand" className="form-floating">Multiplier Band</label>
                    </div>
                </div>



                <div className="col-md">
                    <div className="form-floating">
                        <select id="ToleranceDigitBand" className="form-select" aria-label="Default select example" onChange={(e) => setToleranceColor(e.target.value)}>
                            <option className="bg bg-gold" value="gold">Gold</option>
                            <option className="bg bg-silver" value="silver">Silver</option>
                            <option className="bg bg-white2" value="none">None</option>
                            <option className="bg bg-black text-white" value="black">Black</option>
                            <option className="bg bg-brown" value="brown">Brown</option>
                            <option className="bg bg-red" value="red">Red</option>
                            <option className="bg bg-orange" value="orange">Orange</option>
                            <option className="bg bg-yellow" value="yellow">Yellow</option>
                            <option className="bg bg-green" value="green">Green</option>
                            <option className="bg bg-blue" value="blue">Blue</option>
                            <option className="bg bg-violet" value="violet">Violet</option>
                            <option className="bg bg-gray" value="gray">Gray</option>
                            <option className="bg bg-white" value="white">White</option>
                        </select>
                        <label htmlFor="ToleranceDigitBand" className="form-floating">Tolerance Color</label>
                    </div>
                </div>

            </div>
            <div className="display-5 text-teal2">Resistor Value: {resistanceValue}</div>
        </div>
    );
}
