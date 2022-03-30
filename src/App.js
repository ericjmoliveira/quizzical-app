import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import IntroPage from './components/IntroPage';
import Question from './components/Question';
import Button from './components/Button';

import topBlob from './assets/top-blob.png';
import bottomBlob from './assets/bottom-blob.png';
import topBlobSmall from './assets/top-blob-small.png';
import bottomBlobSmall from './assets/bottom-blob-small.png';

import './App.css';

function App() {
	// Design background images used
	const backgrounds = [
		{ backgroundImage: `url(${topBlob}), url(${bottomBlob})` },
		{ backgroundImage: `url(${topBlobSmall}), url(${bottomBlobSmall})` },
	];

	const [quiz, setQuiz] = useState(false);
	const [rawData, setRawData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [questionsList, setQuestionsList] = useState([]);
	const [userAnswers, setUserAnswers] = useState(['', '', '', '']);
	const [checkStart, setCheckStart] = useState(false);
	const [score, setScore] = useState(0);
	const [newGame, setNewGame] = useState(false);

	// Fetches the data from the OTDB API
	useEffect(() => {
		fetch('https://opentdb.com/api.php?amount=5&type=multiple')
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

			setQuestionsList(newQuestionList);
			setLoading(false);
		}

		shuffleOptions();
	}, [rawData]);

	// Decodes HTML entities
	function decodeEntities(text) {
		const textArea = document.createElement('textArea');
		textArea.innerHTML = text;

		return textArea.value;
	}

	// Styles to be applied in the option buttons
	const optionStyles = [
		{ backgroundColor: 'inherit', border: '1px solid #4d5b9e' }, // Default
		{ backgroundColor: '#d6dBf5', border: 'none', cursor: 'auto' }, // Selected
		{ backgroundColor: '#94d7a2', border: 'none', cursor: 'auto' }, // Correct
		{ backgroundColor: '#f8bcbc', border: 'none', cursor: 'auto' }, // Wrong
		{ backgroundColor: 'inherit', border: '1px solid #4d5b9e', opacity: 0.5, cursor: 'auto' }, // None of the above
	];

	// Handles the style of the option buttons
	function setOptionStyle(index, option) {
		const defaultCheck = !checkStart && userAnswers[index] === '';
		const selectedCheck = !checkStart && userAnswers[index] === option;
		const correctCheck = checkStart && questionsList[index].correct_answer === option;
		const wrongCheck =
			checkStart &&
			questionsList[index].correct_answer !== option &&
			option === userAnswers[index];
		const noneAboveCheck =
			checkStart &&
			option !== userAnswers[index] &&
			option !== questionsList[index].correct_answer;

		if (defaultCheck) return optionStyles[0];
		if (selectedCheck) return optionStyles[1];
		if (correctCheck) return optionStyles[2];
		if (wrongCheck) return optionStyles[3];
		if (noneAboveCheck) return optionStyles[4];
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
		setLoading(true);
		setCheckStart((prevCheckButton) => !prevCheckButton);
		setScore(0);
	}

	const introPage = <IntroPage handleQuizStart={setQuiz} />;
	const quizPage = loading ? (
		<p className="loading">Loading questions...</p>
	) : (
		<div className="questions__container">
			{questionsList.map((question) => {
				return (
					<Question
						key={uuidv4()}
						index={questionsList.indexOf(question)}
						title={question.question}
						options={question.options}
						handleStyle={setOptionStyle}
						handleAnswers={getUserAnswer}
					/>
				);
			})}
			{!checkStart ? (
				<Button type="check-answers" handleClick={checkScore}>
					Check answers
				</Button>
			) : (
				<div className="score__container">
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
