import { FileTreeItemType } from "../FileTreeItem/types";
import { FileItemIcon } from "./FileItemIcon";

describe("FileItemIcon", () => {
	it("should render a folder icon when type is Folder", () => {
		cy.mount(<FileItemIcon type={FileTreeItemType.Folder} size="lg" />);
		cy.dataCy("selectedDirectoryFolder")
			.should("exist")
			.and("not.have.class", "folderIconEmpty");
	});

	it("should render a folder icon with shift class when shouldShift is true", () => {
		cy.mount(<FileItemIcon type={FileTreeItemType.Folder} size="lg" shouldShift />);
		cy.dataCy("selectedDirectoryFolder").should("have.class", "folderIconEmpty");
	});

	it("should render a file icon when type is not Folder", () => {
		cy.mount(<FileItemIcon type={FileTreeItemType.File} size="lg" />);
		cy.dataCy("selectedDirectoryFile").should("exist").and("not.have.class", "fileIcon");
	});

	it("should render a file icon with fileIcon class when isInTree is true", () => {
		cy.mount(<FileItemIcon type={FileTreeItemType.File} size="lg" isInTree />);
		cy.dataCy("selectedDirectoryFile").should("have.class", "fileIcon");
	});
});
