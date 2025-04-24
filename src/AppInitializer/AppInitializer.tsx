import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";

import { S3ClientProvider } from "../providers/S3ClientProvider/S3ClientProvider";
import { s3LoginCredentialsKey } from "../hooks/useS3Session/constants";
import { loginPath } from "./constants";
import { ValidateCredentialsModal } from "./components/ValidateCredentialsModal/ValidateCredentialsModal";
import { ContextMenuProvider } from "../providers/ContextMenuProvider/ContextMenuProvider";

export const AppInitializer = () => {
	const navigate = useNavigate();
	const [shouldReauthenticate, setShouldReauthenticate] = useState(false);
	const s3Credentials = localStorage.getItem(s3LoginCredentialsKey);

	useEffect(() => {
		if (s3Credentials) {
			navigate("/");
			setShouldReauthenticate(true);
		} else {
			navigate(`/${loginPath}`);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [navigate]);

	return (
		<S3ClientProvider>
			<ContextMenuProvider>
				{shouldReauthenticate && (
					<ValidateCredentialsModal
						shouldOpen={shouldReauthenticate}
						closeModal={() => setShouldReauthenticate(false)}
					/>
				)}
				<Outlet />
			</ContextMenuProvider>
		</S3ClientProvider>
	);
};
