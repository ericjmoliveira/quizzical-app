import "./Question.css";

function Question(props) {
    const questionTitle = decodeEntities(props.title);
    const correctAnswer = decodeEntities(props.correctOption);
    const options = props.incorrectOptions.map((opt) => decodeEntities(opt));

    // const randomIndex = Math.floor(Math.random() * 4);
    // if (options.length === 3) options.splice(randomIndex, 0, correctAnswer);

    options.push(correctAnswer);

    function decodeEntities(text) {
        const textArea = document.createElement("textArea");
        textArea.innerHTML = text;
        return textArea.value;
    }

    const sendAnswers = (e) => {
        props.handleAnswers(props.index, e.target.textContent, correctAnswer);
    };

    return (
        <div className="question-container">
            <div className="title-container">
                <h2 className="question-title">{questionTitle}</h2>
            </div>
            <div className="options-container">
                <button onClick={sendAnswers}>{options[0]}</button>
                <button onClick={sendAnswers}>{options[1]}</button>
                <button onClick={sendAnswers}>{options[2]}</button>
                <button onClick={sendAnswers}>{options[3]}</button>
            </div>
        </div>
    );
}

export default Question;
