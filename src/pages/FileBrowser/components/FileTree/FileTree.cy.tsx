import { useFileItemsContext } from "../../../../hooks/contexts/useFileItemsContext";
import { FileItemsProvider } from "../../../../providers/FileItemsProvider/FileItemsProvider";
import { ComponentWithProviderValue } from "../../../../tests/components/ComponentWithProviderValue";
import { FileTreeItem, FileTreeItemType } from "../FileTreeItem/types";
import { FileTree } from "./FileTree";

describe("FileTree component", () => {
	const mockFileItems: Array<FileTreeItem> = [
		{ fullPath: "folder1/", name: "folder1", type: FileTreeItemType.Folder },
		{
			fullPath: "folder1/file.txt",
			name: "file.txt",
			type: FileTreeItemType.File,
		},
	];

	const getComponent = (fileItems = mockFileItems) =>
		cy.mount(
			<FileItemsProvider>
				<ComponentWithProviderValue
					contextHook={useFileItemsContext}
					contextValueSetter={({ setFileItems }) => setFileItems(fileItems)}
				>
					<FileTree />
				</ComponentWithProviderValue>
			</FileItemsProvider>,
		);
	it("should render nothing when fileItems is empty", () => {
		getComponent([]);

		cy.dataCy("fileItemTree").should("not.exist");
	});

	it("should render one FileTreeItem per file item", () => {
		getComponent();

		cy.dataCy("fileItemTree").should("have.length", mockFileItems.length);
	});
});
