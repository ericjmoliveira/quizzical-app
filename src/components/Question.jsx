import './Question.scss';

function Question({ index, title, options, handleStyle, handleAnswers, checkState }) {
    // Send answer to the App component
    function sendAnswer(e) {
        const userOption = e.target.textContent;
        handleAnswers(index, userOption);
    }

    return (
        <div className="question__container">
            <div className="title__container">
                <h2 className="question__title">{title}</h2>
            </div>
            <div className="options__container">
                <button
                    onClick={!checkState ? sendAnswer : undefined}
                    style={handleStyle(index, options[0])}
                >
                    {options[0]}
                </button>
                <button
                    onClick={!checkState ? sendAnswer : undefined}
                    style={handleStyle(index, options[1])}
                >
                    {options[1]}
                </button>
                <button
                    onClick={!checkState ? sendAnswer : undefined}
                    style={handleStyle(index, options[2])}
                >
                    {options[2]}
                </button>
                <button
                    onClick={!checkState ? sendAnswer : undefined}
                    style={handleStyle(index, options[3])}
                >
                    {options[3]}
                </button>
            </div>
        </div>
    );
}

export default Question;
