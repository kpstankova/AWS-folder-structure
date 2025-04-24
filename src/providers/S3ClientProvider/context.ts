import { createContext } from "react";

import { S3ClientContextProps } from "./types";

export const S3ClientContext = createContext<S3ClientContextProps>({
	s3Client: null,
	s3ClientCredentials: null,
	setS3ClientCredentials: () => undefined,
	setS3Client: () => undefined,
});
