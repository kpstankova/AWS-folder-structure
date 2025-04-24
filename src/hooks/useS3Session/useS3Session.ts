import { AES, enc } from "crypto-js";
import { S3 } from "@aws-sdk/client-s3";

import { S3Credentials } from "./types";
import { s3LoginCredentialsKey } from "./constants";
import { useS3ClientContext } from "../contexts/useS3ClientContext";

export const useS3Session = (credentials?: S3Credentials) => {
	const { setS3Client, setS3ClientCredentials } = useS3ClientContext();

	const { accessKey = "", secretKey = "", region = "" } = credentials ?? {};

	const login = () => {
		if (credentials) {
			const json = JSON.stringify(credentials);
			const encryptedCredentials = AES.encrypt(json, accessKey).toString();
			const s3Client = new S3({
				region,
				credentials: { accessKeyId: accessKey, secretAccessKey: secretKey },
			});

			setS3Client(s3Client);
			setS3ClientCredentials(credentials);
			localStorage.setItem(s3LoginCredentialsKey, encryptedCredentials);
		}
	};

	const verifyAccessKey = (verificationAccessKey: string) => {
		const currentS3Credentials = localStorage.getItem(s3LoginCredentialsKey);

		if (!currentS3Credentials) {
			return false;
		}

		try {
			const decryptedS3Credentials = AES.decrypt(
				currentS3Credentials,
				verificationAccessKey,
			).toString(enc.Utf8);

			const { accessKey: decryptedAccessKey }: S3Credentials =
				JSON.parse(decryptedS3Credentials);

			return decryptedAccessKey === verificationAccessKey;
		} catch (err) {
			console.error("Failed to decrypt or parse credentials", err);
			return false;
		}
	};

	return { login, verifyAccessKey };
};
