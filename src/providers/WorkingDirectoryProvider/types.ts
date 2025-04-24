import { FileTreeItem } from "../../pages/FileBrowser/components/FileTreeItem/types";

export interface WorkingDirectoryContextProps {
	selectedDirectory: FileTreeItem | null;
	setSelectedDirectory: (directory: FileTreeItem) => void;
}
