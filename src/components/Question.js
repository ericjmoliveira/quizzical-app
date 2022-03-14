import { useState } from "react";
import "./Question.css";

function Question(props) {
    const questionTitle = decodeEntities(props.title);
    const correctAnswer = decodeEntities(props.correctOption);

    const [optStyles, setOptStyles] = useState([
        { backgroundColor: "inherit", border: "1px solid #4d5b9e" },
        { backgroundColor: "inherit", border: "1px solid #4d5b9e" },
        { backgroundColor: "inherit", border: "1px solid #4d5b9e" },
        { backgroundColor: "inherit", border: "1px solid #4d5b9e" },
    ]);
    const [options, setOptions] = useState(props.incorrectOptions.map((opt) => decodeEntities(opt)));
    const [shuffle, setShuffle] = useState(true);

    if (shuffle) shuffleOptions();

    // Shuffles the options in order to display on the screen
    function shuffleOptions() {
        const shuffledOptions = [...options, correctAnswer];
        shuffledOptions.sort(() => Math.random() - 0.5);
        setOptions(shuffledOptions);
        setShuffle(false);

        console.log(correctAnswer);
    }

    // Highlights user option
    function highlightUserOption(e) {
        let newStyles = [
            { backgroundColor: "inherit", border: "1px solid #4d5b9e" },
            { backgroundColor: "inherit", border: "1px solid #4d5b9e" },
            { backgroundColor: "inherit", border: "1px solid #4d5b9e" },
            { backgroundColor: "inherit", border: "1px solid #4d5b9e" },
        ];

        let optChoosenStyle = { ...optStyles[e.target.id] };
        optChoosenStyle.backgroundColor = "#d6dbf5";
        optChoosenStyle.border = "none";
        newStyles[e.target.id] = optChoosenStyle;

        setOptStyles(newStyles);
    }

    // Decodes HTML entities that come from the API text
    function decodeEntities(text) {
        const textArea = document.createElement("textArea");
        textArea.innerHTML = text;
        return textArea.value;
    }

    return (
        <div className="question-container">
            <div className="title-container">
                <h2 className="question-title">{questionTitle}</h2>
            </div>
            <div className="options-container">
                <button id={0} onClick={highlightUserOption} style={optStyles[0]}>
                    {options[0]}
                </button>
                <button id={1} onClick={highlightUserOption} style={optStyles[1]}>
                    {options[1]}
                </button>
                <button id={2} onClick={highlightUserOption} style={optStyles[2]}>
                    {options[2]}
                </button>
                <button id={3} onClick={highlightUserOption} style={optStyles[3]}>
                    {options[3]}
                </button>
            </div>
        </div>
    );
}

export default Question;
