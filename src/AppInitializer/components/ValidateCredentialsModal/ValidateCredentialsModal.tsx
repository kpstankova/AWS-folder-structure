import "./ValidateCredentialsModal.styles.css";
import { useState } from "react";
import { useNavigate } from "react-router";
import { AES, enc } from "crypto-js";

import { Modal } from "../../../components/Modal/Modal";
import { Input } from "../../../components/Input/Input";
import { Button } from "../../../components/Button/Button";
import { useS3Session } from "../../../hooks/useS3Session/useS3Session";
import { fileBrowserPath, loginPath } from "../../constants";
import { ValidateCredentialsModalProps } from "./types";
import { useS3ClientContext } from "../../../hooks/contexts/useS3ClientContext";
import { s3LoginCredentialsKey } from "../../../hooks/useS3Session/constants";

export const ValidateCredentialsModal = ({
	shouldOpen,
	closeModal,
}: ValidateCredentialsModalProps) => {
	const navigate = useNavigate();

	const [accessKey, setAccessKey] = useState("");
	const { setS3ClientCredentials } = useS3ClientContext();
	const { verifyAccessKey } = useS3Session();

	return (
		<Modal isOpen={shouldOpen}>
			<h2 className="verificationModalHeader">Validate credentials</h2>
			<div className="verificationModalContent">
				<Input
					id="accessKeyValidation"
					ariaLabel="accessKey"
					labelName="Access Key"
					value={accessKey}
					onChange={(e) => setAccessKey(e.target.value)}
					focus
				/>
			</div>
			<div className="verificationModalFooter">
				<Button
					label="Verify"
					onClick={() => {
						const isValidAccessKey = verifyAccessKey(accessKey);
						if (isValidAccessKey) {
							const s3Credentials = localStorage.getItem(s3LoginCredentialsKey);
							navigate(`/${fileBrowserPath}`);
							setS3ClientCredentials(
								JSON.parse(
									AES.decrypt(s3Credentials ?? "", accessKey).toString(enc.Utf8),
								),
							);
						} else {
							alert("Wrong access key, log in again");
							navigate(`/${loginPath}`);
							localStorage.removeItem(s3LoginCredentialsKey);
						}
						closeModal();
					}}
					isDisabled={accessKey === ""}
				/>
			</div>
		</Modal>
	);
};
