import { S3 } from "@aws-sdk/client-s3";
import { S3Credentials } from "../../hooks/useS3Session/types";

export interface S3ClientContextProps {
  s3Client: S3 | null;
  s3ClientCredentials: S3Credentials | null;
  setS3Client: (client: S3) => void;
  setS3ClientCredentials: (clientCredentials: S3Credentials) => void;
}
