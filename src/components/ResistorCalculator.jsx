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

function convertToScientificNotation(num, digits) {
    const lookForScientificNotation = [
        { value: 1, prefix: "" },
        { value: 1e3, prefix: "k" },
        { value: 1e6, prefix: "M" },
        { value: 1e9, prefix: "G" },
        { value: 1e12, prefix: "T" },
        { value: 1e15, prefix: "P" },
        { value: 1e18, prefix: "E" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookForScientificNotation.slice().reverse().find(item => num >= item.value);
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.prefix : "0";
}

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
        const scientificValue = convertToScientificNotation(value, 2);
        const tolerance =
            toleranceColor === "gold"
                ? "±5% tolerance"
                : toleranceColor === "silver"
                    ? "±10% tolerance"
                    : toleranceColor === "none"
                        ? "±20% tolerance"
                        : `±${colorValues[toleranceColor]}% tolerance`;
        setResistanceValue(`${scientificValue} ohms ${tolerance}`);
    }, [firstDigitColor, secondDigitColor, multiplierColor, toleranceColor]);

    return (
        <div>

            <figure>
                <blockquote class="blockquote text-center m-5 fs-4">
                    <p>
                    <span className="text-teal2">Welcome to Resistora,</span><span className="text-pink2"> dear guest,</span><br />
                    <span className="text-teal2">Where colors and codes</span><span className="text-pink2"> are put to the test,</span><br />
                    <span className="text-teal2">Calculating resistors with ease</span><span className="text-pink2"> and speed,</span><br />
                    <span className="text-teal2">Let our Colorband</span><span className="text-pink2"> Calculator take the lead!</span><br />
                    </p>
                </blockquote>
            </figure>

            <div className="row mt-5 mx-5  bg bg-white2 p-2 pt-3">
                <div className="col-md">
                    <div className="form-floating">
                        <select id="firstDigitBand" className="form-select text-teal2 border border-primary" aria-label="Floating label select example" onChange={(e) => setFirstDigitColor(e.target.value)}>
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
                        <label htmlFor="firstDigitBand" className="mb-2 text-pink1">First Band</label>
                    </div>
                </div>

                <div className="col-md">
                    <div className="form-floating">
                        <select id="secondDigitBand" className="form-select text-teal2 border border-primary" aria-label="Default select example" onChange={(e) => setSecondDigitColor(e.target.value)}>
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
                        <label htmlFor="secondDigitBand" className="form-floating text-pink1">Second Band</label>
                    </div>
                </div>

                <div className="col-md">
                    <div className="form-floating">
                        <select id="multiplierDigitBand" className="form-select text-teal2 border border-primary" aria-label="Default select example" onChange={(e) => setMultiplierColor(e.target.value)}>
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
                        <label htmlFor="multiplierDigitBand" className="form-floating text-pink1">Multiplier Band</label>
                    </div>
                </div>

                <div className="col-md">
                    <div className="form-floating">
                        <select id="ToleranceDigitBand" className="form-select text-teal2 border border-secondary" aria-label="Default select example" onChange={(e) => setToleranceColor(e.target.value)}>
                            <option className="bg bg-gold" value="gold">Gold</option>
                            <option className="bg bg-silver" value="silver">Silver</option>
                            <option className="bg bg-teal2 text-white" value="teal">None</option>
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
                        <label htmlFor="ToleranceDigitBand" className="form-floating text-pink1">Tolerance Color</label>
                    </div>
                </div>

            </div>

            <div className="display-5 text-teal2 text-center mx-5 mb-3 bg bg-white2 p-2 border-bottom border-secondary">Resistor Value:
                <span className="text-pink2"> {resistanceValue}</span>
            </div>

            <div className="mb-5">
                <ResistorAnimation
                    firstDigitColor={firstDigitColor}
                    secondDigitColor={secondDigitColor}
                    multiplierColor={multiplierColor}
                    toleranceColor={toleranceColor}
                />
            </div>

        </div>
    );
}
