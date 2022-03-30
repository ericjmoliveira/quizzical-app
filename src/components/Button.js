import './Button.css';

function Button({ type, handleClick, children }) {
	return (
		<button className={type} onClick={handleClick}>
			{children}
		</button>
	);
}

export default Button;
