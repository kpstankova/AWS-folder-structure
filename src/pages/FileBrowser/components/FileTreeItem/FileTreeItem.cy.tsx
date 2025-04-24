import { WorkingDirectoryProvider } from "../../../../providers/WorkingDirectoryProvider/WorkingDirectoryProvider";
import { FileTreeItem } from "./FileTreeItem";
import { FileTreeItem as FileTreeItemProp, FileTreeItemType } from "./types";
import { ComponentWithProviderValue } from "../../../../tests/components/ComponentWithProviderValue";
import { useWorkingDirectoryContext } from "../../../../hooks/contexts/useWorkingDirectoryContext";

describe("FileTreeItem component", () => {
	const mockFolderItem: FileTreeItemProp = {
		name: "Folder1",
		type: FileTreeItemType.Folder,
		fullPath: "folder1/",
		children: [
			{
				name: "file.txt",
				type: FileTreeItemType.File,
				fullPath: "folder1/file.txt",
			},
		],
	};

	const mockFileItem: FileTreeItemProp = {
		name: "file.txt",
		type: FileTreeItemType.File,
		fullPath: "file.txt",
		children: [],
	};

	const getComponent = (fileItem: FileTreeItemProp) =>
		cy.mount(
			<WorkingDirectoryProvider>
				<ComponentWithProviderValue
					contextHook={useWorkingDirectoryContext}
					contextValueSetter={(context) => {
						cy.stub(context, "setSelectedDirectory").as("mockSetSelectedDirectory");
					}}
				>
					<FileTreeItem item={fileItem} />
				</ComponentWithProviderValue>
			</WorkingDirectoryProvider>,
		);

	it("should render folder with chevron when it has children", () => {
		getComponent(mockFolderItem);

		cy.dataCy("fileItemTree").should("contain.text", "Folder1");
		cy.dataCy("chevronDownIcon").should("exist");
	});

	it("should toggle child items on chevron click", () => {
		getComponent(mockFolderItem);

		cy.dataCy("chevronDownIcon").click();

		cy.dataCy("fileItem").should("exist");
		cy.dataCy("fileItem").should("contain.text", "file.txt");
	});

	it("should not render chevron for file items", () => {
		getComponent(mockFileItem);

		cy.dataCy("chevronDownIcon").should("not.exist");
	});
});
