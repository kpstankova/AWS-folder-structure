import "./Button.styles.css";

import { ButtonProps } from "./types";

export const Button = ({ label, onClick, isDisabled = false }: ButtonProps) => (
	<button
		data-cy="buttonComponent"
		className="buttonStyles"
		onClick={onClick}
		disabled={isDisabled}
	>
		{label}
	</button>
);
