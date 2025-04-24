import "./App.styles.css";
import { createBrowserRouter, RouterProvider } from "react-router";

import { Login } from "../pages/Login/Login";
import { S3ClientProvider } from "../providers/S3ClientProvider/S3ClientProvider";
import { FileBrowser } from "../pages/FileBrowser/FileBrowser";
import { AppInitializer } from "../AppInitializer/AppInitializer";
import { fileBrowserPath, loginPath } from "../AppInitializer/constants";
import { WorkingDirectoryProvider } from "../providers/WorkingDirectoryProvider/WorkingDirectoryProvider";
import { FileItemsProvider } from "../providers/FileItemsProvider/FileItemsProvider";
import { ErrorBoundary } from "../components/ErrorBoundary/ErrorBoundary";

export const App = () => {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <AppInitializer />,
			children: [
				{ path: loginPath, element: <Login /> },
				{
					path: fileBrowserPath,
					element: (
						<FileItemsProvider>
							<WorkingDirectoryProvider>
								<FileBrowser />
							</WorkingDirectoryProvider>
						</FileItemsProvider>
					),
				},
			],
		},
	]);

	return (
		<ErrorBoundary>
			<S3ClientProvider>
				<RouterProvider router={router} />
			</S3ClientProvider>
		</ErrorBoundary>
	);
};
