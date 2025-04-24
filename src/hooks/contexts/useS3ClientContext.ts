import { useContext } from "react";

import { S3ClientContext } from "../../providers/S3ClientProvider/context";

export const useS3ClientContext = () => useContext(S3ClientContext);
