import { S3 } from "@aws-sdk/client-s3";

import { FileItemsProvider } from "../../../../providers/FileItemsProvider/FileItemsProvider";
import { S3ClientProvider } from "../../../../providers/S3ClientProvider/S3ClientProvider";
import { WorkingDirectoryProvider } from "../../../../providers/WorkingDirectoryProvider/WorkingDirectoryProvider";
import { CurrentWorkingDirectory } from "./CurrentWorkingDirectory";
import { FileTreeItem, FileTreeItemType } from "../FileTreeItem/types";
import { ComponentWithProviderValue } from "../../../../tests/components/ComponentWithProviderValue";
import { useS3ClientContext } from "../../../../hooks/contexts/useS3ClientContext";

describe("CurrentWorkingDirectory component", () => {
	const mockSelectedFolder: FileTreeItem = {
		name: "mockFolderName",
		type: FileTreeItemType.Folder,
		fullPath: "root/",
		children: [
			{
				name: "mockFileName",
				type: FileTreeItemType.File,
				fullPath: "root/mockFolderName",
			},
		],
	};
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
							<CurrentWorkingDirectory selectedFolder={mockSelectedFolder} />
						</ComponentWithProviderValue>
					</WorkingDirectoryProvider>
				</FileItemsProvider>
			</S3ClientProvider>,
		);

	it("should render the selected folder content", () => {
		getComponent();

		cy.dataCy("selectedDirectoryContent").should("exist");
		cy.dataCy("root/").should("be.visible");
	});
});
