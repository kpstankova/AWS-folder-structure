import { useState } from "react";
import { useNavigate } from "react-router";
import "./LoginForm.styles.css";

import { Input } from "../../../../components/Input/Input";
import { LoginFieldName, FormData } from "./types";
import { useS3Session } from "../../../../hooks/useS3Session/useS3Session";
import { Button } from "../../../../components/Button/Button";
import { fileBrowserPath } from "../../../../AppInitializer/constants";
import { loginFormFields } from "./constants";

export const LoginForm = () => {
	const [formData, setFormData] = useState<FormData>(() => {
		return Object.keys(loginFormFields).reduce((acc, key) => {
			acc[key as LoginFieldName] = "";
			return acc;
		}, {} as FormData);
	});

	const navigate = useNavigate();
	const { login } = useS3Session(formData);

	return (
		<div data-cy="loginContainer" className="loginContainer">
			<h2 data-cy="mainHeader">Lets Connect to Your S3 Bucket</h2>
			<h4 data-cy="secondaryHeader">Fill in your access details below</h4>
			{Object.entries(loginFormFields).map(([name, label]) => {
				return (
					<Input
						key={name}
						id={name}
						ariaLabel={name}
						labelName={label}
						value={formData[name as LoginFieldName]}
						onChange={(e) =>
							setFormData({
								...formData,
								[name]: e?.target?.value,
							})
						}
					/>
				);
			})}
			<Button
				onClick={() => {
					login();
					navigate(`/${fileBrowserPath}`);
				}}
				label="Let's Go"
				isDisabled={Object.values(formData).some((value) => value.trim() === "")}
			/>
		</div>
	);
};
