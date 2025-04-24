import { InputProps } from "./types";
import "./Input.styles.css";

export const Input = ({ id, ariaLabel, labelName, value, onChange, focus = false }: InputProps) => {
	return (
		<div data-cy="inputContainer" className="inputContainer">
			<input
				id={id}
				data-cy="inputComponent"
				type="text"
				aria-label={ariaLabel}
				className="inputText"
				onChange={onChange}
				autoFocus={focus}
			/>
			<span className={`floatingLabel ${value ? "active" : ""}`}>{labelName}</span>
		</div>
	);
};
