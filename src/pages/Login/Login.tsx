import "./Login.styles.css";
import filesImage from "../../assets/filesImage.png";

import { LoginForm } from "./components/LoginForm/LoginForm";

export const Login = () => {
	return (
		<div className="loginPage">
			<div data-cy="leftSide" className="leftSide">
				<img data-cy="filesImage" src={filesImage} alt="files-image" />
			</div>
			<div data-cy="rightSide" className="rightSide">
				<div data-cy="loginForm" className="loginForm">
					<LoginForm />
				</div>
			</div>
		</div>
	);
};
