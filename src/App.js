import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import IntroPage from "./components/IntroPage";
import Question from "./components/Question";
import Button from "./components/Button";

import topBlob from "./assets/top-blob.png";
import bottomBlob from "./assets/bottom-blob.png";
import topBlobSmall from "./assets/top-blob-small.png";
import bottomBlobSmall from "./assets/bottom-blob-small.png";

import "./App.css";

function App() {
    // Design background images used
    const backgrounds = [
        { backgroundImage: `url(${topBlob}), url(${bottomBlob})` },
        { backgroundImage: `url(${topBlobSmall}), url(${bottomBlobSmall})` },
    ];

    // States
    const [quiz, setQuiz] = useState(false);
    const [rawData, setRawData] = useState([]);
    const [questionsList, setQuestionsList] = useState([]);
    const [userAnswers, setUserAnswers] = useState(["", "", "", ""]);
    const [checkStart, setCheckStart] = useState(false);
    const [score, setScore] = useState(0);
    const [newGame, setNewGame] = useState(false);

    // Fetches the data from the OTDB API
    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            .then((response) => response.json())
            .then((data) => setRawData(data.results))
            .catch((error) => console.log(error));
    }, [newGame]);

    // Manipulates the data received, shuffles the options, decodes the texts
    useEffect(() => {
        function shuffleOptions() {
            let newQuestionList = [...rawData];

            for (let i = 0; i < newQuestionList.length; i++) {
                let newQuestionObj = { ...newQuestionList[i] };
                newQuestionObj.options = newQuestionObj.incorrect_answers;

                const randomIndex = Math.floor(Math.random() * 4);
                newQuestionObj.options.splice(randomIndex, 0, newQuestionObj.correct_answer);

                newQuestionObj.question = decodeEntities(newQuestionObj.question);
                newQuestionObj.options = newQuestionObj.options.map((option) =>
                    decodeEntities(option)
                );
                newQuestionObj.correct_answer = decodeEntities(newQuestionObj.correct_answer);

                newQuestionList[i] = newQuestionObj;
            }

            console.log(newQuestionList);

            setQuestionsList(newQuestionList);
        }

        shuffleOptions();
    }, [rawData]);

    // Decodes HTML entities in the text given
    function decodeEntities(text) {
        const textArea = document.createElement("textArea");
        textArea.innerHTML = text;
        return textArea.value;
    }

    // Styles to be applied in the option buttons
    const optStyles = [
        { backgroundColor: "inherit", border: "1px solid #4d5b9e" }, // Default
        { backgroundColor: "#d6dBf5", border: "none" }, // Selected
        { backgroundColor: "#94d7a2", border: "none" }, // Correct
        { backgroundColor: "#f8bcbc", border: "none" }, // Wrong
        { backgroundColor: "inherit", border: "1px solid #4d5b9e", opacity: 0.5 }, // None
    ];

    // Handles the style of the option buttons
    function setStyling(index, opt) {
        // Boolean variables to be used in the conditionals
        const defaultCheck = !checkStart && userAnswers[index] === "";
        const selectedCheck = !checkStart && userAnswers[index] === opt;
        const correctCheck = checkStart && questionsList[index].correct_answer === opt;
        const wrongCheck =
            checkStart && questionsList[index].correct_answer !== opt && opt === userAnswers[index];
        const noneAboveCheck =
            checkStart && opt !== userAnswers[index] && opt !== questionsList[index].correct_answer;

        if (defaultCheck) return optStyles[0];
        if (selectedCheck) return optStyles[1];
        if (correctCheck) return optStyles[2];
        if (wrongCheck) return optStyles[3];
        if (noneAboveCheck) return optStyles[4];
    }

    // Switches to the quiz page
    function startQuiz() {
        setQuiz((prevQuiz) => !prevQuiz);
    }

    // Gets user answer from the questions components
    function getUserAnswer(index, userOption) {
        const newUserAnswers = [...userAnswers];
        newUserAnswers[index] = userOption;

        setUserAnswers(newUserAnswers);
    }

    // Calculates the user score
    function checkScore() {
        setCheckStart((prevCheckButton) => !prevCheckButton);
        for (let i = 0; i < userAnswers.length; i++) {
            if (userAnswers[i] === questionsList[i].correct_answer) {
                setScore((prevScore) => prevScore + 1);
            }
        }
    }

    // Restarts the game
    function playAgain() {
        setNewGame((prevNewGame) => !prevNewGame);
        setCheckStart((prevCheckButton) => !prevCheckButton);
        setScore(0);
    }

    // Renders the intro and quiz pages
    const introPage = <IntroPage startButtonHandler={startQuiz} />;
    const quizPage = (
        <div className="questions-container">
            {questionsList.map((question) => {
                return (
                    <Question
                        key={uuidv4()}
                        index={questionsList.indexOf(question)}
                        title={question.question}
                        options={question.options}
                        handleStyle={setStyling}
                        handleAnswers={getUserAnswer}
                    />
                );
            })}
            {!checkStart ? (
                <Button type="check-answers" handleClick={checkScore}>
                    Check answers
                </Button>
            ) : (
                <div className="score-container">
                    <p className="score">You scored {score}/5 correct answers</p>
                    <Button type="play-again" handleClick={playAgain}>
                        Play again
                    </Button>
                </div>
            )}
        </div>
    );

    return (
        <div className="App" style={!quiz ? backgrounds[0] : backgrounds[1]}>
            {!quiz ? introPage : quizPage}
        </div>
    );
}

export default App;
