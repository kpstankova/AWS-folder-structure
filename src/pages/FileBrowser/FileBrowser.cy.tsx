import { S3 } from "@aws-sdk/client-s3";
import { RouterProvider, createBrowserRouter } from "react-router";

import { ComponentWithProviderValue } from "../../tests/components/ComponentWithProviderValue";
import { FileBrowser } from "./FileBrowser";
import { S3ClientProvider } from "../../providers/S3ClientProvider/S3ClientProvider";
import { FileItemsProvider } from "../../providers/FileItemsProvider/FileItemsProvider";
import { WorkingDirectoryProvider } from "../../providers/WorkingDirectoryProvider/WorkingDirectoryProvider";
import { useS3ClientContext } from "../../hooks/contexts/useS3ClientContext";

describe("FileBrowser component", () => {
	const getComponent = () =>
		cy.mount(
			<S3ClientProvider>
				<FileItemsProvider>
					<WorkingDirectoryProvider>
						<ComponentWithProviderValue
							contextHook={useS3ClientContext}
							contextValueSetter={({ setS3Client }) => {
								setS3Client(
									new S3({
										region: "mockRegion",
										credentials: {
											accessKeyId: "mockAccessKey",
											secretAccessKey: "mockSecretKey",
										},
									}),
								);
							}}
						>
							<RouterProvider
								router={createBrowserRouter([
									{ element: <FileBrowser />, path: "/*" },
								])}
							/>
						</ComponentWithProviderValue>
					</WorkingDirectoryProvider>
				</FileItemsProvider>
			</S3ClientProvider>,
		);

	it("should render component correctly", () => {
		getComponent();

		cy.dataCy("fileBrowser").should("exist");
		cy.dataCy("fileTree").should("exist");
		cy.dataCy("workingDirectory").should("exist");
	});
});
