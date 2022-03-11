import "./Question.css";

function Question({ title, correctOption, incorrectOptions }) {
    const questionTitle = decodeEntities(title);
    const correctAnswer = decodeEntities(correctOption);
    const options = incorrectOptions.map((opt) => decodeEntities(opt));

    const randomIndex = Math.floor(Math.random() * 4);
    if (options.length === 3) options.splice(randomIndex, 0, correctAnswer);

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
                <button>{options[0]}</button>
                <button>{options[1]}</button>
                <button>{options[2]}</button>
                <button>{options[3]}</button>
            </div>
        </div>
    );
}

export default Question;
