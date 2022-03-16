import Button from "./Button";

import "./IntroPage.css";

function IntroPage({ handleQuizStart }) {
    return (
        <>
            <h1 className="intro-title">Quizzical</h1>
            <p className="intro-description">General knowledge questions</p>
            <Button type="start-quiz" handleClick={() => handleQuizStart(true)}>
                Start quiz
            </Button>
        </>
    );
}

export default IntroPage;
