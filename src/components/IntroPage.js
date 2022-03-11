import Button from "./Button";

import "./IntroPage.css";

function IntroPage({ startButtonHandler }) {
    return (
        <>
            <h1 className="intro-title">Quizzical</h1>
            <p className="intro-description">Some description if needed</p>
            <Button type="start-quiz" handleClick={startButtonHandler}>
                Start quiz
            </Button>
        </>
    );
}

export default IntroPage;
