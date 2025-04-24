export enum LoginFieldName {
  BucketName = "bucketName",
  SecretKey = "secretKey",
  AccessKey = "accessKey",
  Region = "region",
}

export interface LoginField {
  name: LoginFieldName;
  label: string;
}

export type FormData = Record<LoginFieldName, string>;
