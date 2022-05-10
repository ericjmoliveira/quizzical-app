import Button from './Button';

import './IntroPage.scss';

function IntroPage({ handleQuizStart }) {
    return (
        <>
            <h1 className="intro__title">Quizzical</h1>
            <p className="intro__description">General knowledge questions</p>
            <Button type="start-quiz" handleClick={() => handleQuizStart(true)}>
                Start quiz
            </Button>
        </>
    );
}

export default IntroPage;
