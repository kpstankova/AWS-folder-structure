import { PropsWithChildren, useEffect, useState } from "react";
import { S3 } from "@aws-sdk/client-s3";

import { S3ClientContext } from "./context";
import { S3Credentials } from "../../hooks/useS3Session/types";

export const S3ClientProvider = ({ children }: PropsWithChildren<object>) => {
	const [s3ClientCredentials, setS3ClientCredentials] = useState<S3Credentials | null>(null);

	const [s3Client, setS3Client] = useState<S3 | null>(null);

	useEffect(() => {
		if (s3ClientCredentials) {
			const { accessKey, secretKey, region } = s3ClientCredentials;

			setS3Client(
				new S3({
					region,
					credentials: { accessKeyId: accessKey, secretAccessKey: secretKey },
				}),
			);
		}
	}, [s3ClientCredentials]);

	return (
		<S3ClientContext.Provider
			value={{
				s3Client,
				setS3Client,
				s3ClientCredentials,
				setS3ClientCredentials,
			}}
		>
			{children}
		</S3ClientContext.Provider>
	);
};
