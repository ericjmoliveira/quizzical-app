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
    const backgrounds = [
        {
            backgroundImage: `url(${topBlob}), url(${bottomBlob})`,
        },
        {
            backgroundImage: `url(${topBlobSmall}), url(${bottomBlobSmall})`,
        },
    ];

    const [quiz, setQuiz] = useState();
    const [questionsList, setQuestionsList] = useState([]);

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            .then((response) => response.json())
            .then((data) => setQuestionsList(data.results))
            .catch((error) => console.log(error));
    }, [quiz]);

    function startQuiz() {
        setQuiz((prevQuiz) => !prevQuiz);
    }

    const introPage = <IntroPage startButtonHandler={startQuiz} />;
    const quizPage = (
        <div className="questions-container">
            {questionsList.map((question) => {
                return (
                    <Question
                        key={uuidv4()}
                        title={question.question}
                        correctOption={question.correct_answer}
                        incorrectOptions={question.incorrect_answers}
                    />
                );
            })}
            <Button
                type="check-answers"
                handleClick={(e) => console.log("Checking answers")}
            >
                Check answers
            </Button>
        </div>
    );

    return (
        <div className="App" style={!quiz ? backgrounds[0] : backgrounds[1]}>
            {!quiz ? introPage : quizPage}
        </div>
    );
}

export default App;
