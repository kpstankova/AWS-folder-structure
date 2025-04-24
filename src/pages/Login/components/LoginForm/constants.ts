import { LoginFieldName } from "./types";

export const loginFormFields: Record<LoginFieldName, string> = {
	[LoginFieldName.BucketName]: "Bucket Name",
	[LoginFieldName.SecretKey]: "Secret Key",
	[LoginFieldName.AccessKey]: "Access Key",
	[LoginFieldName.Region]: "Region",
};
