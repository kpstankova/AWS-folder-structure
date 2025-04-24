import { PropsWithChildren, useEffect, useState } from "react";
import { FileTreeItem } from "../../pages/FileBrowser/components/FileTreeItem/types";
import { WorkingDirectoryContext } from "./context";
import { useFileItemsContext } from "../../hooks/contexts/useFileItemsContext";
import { findFileTreeItemByPath } from "../../pages/FileBrowser/components/CreateItemModal/utilities";
import { rootFolderKey } from "../../pages/FileBrowser/constants";

export const WorkingDirectoryProvider = ({ children }: PropsWithChildren<object>) => {
	const { fileItems } = useFileItemsContext();
	const [selectedDirectory, setSelectedDirectory] = useState<FileTreeItem | null>(null);

	useEffect(() => {
		if (!selectedDirectory) {
			const rootDirectory = findFileTreeItemByPath(fileItems, `${rootFolderKey}/`);
			setSelectedDirectory(rootDirectory);
		}
	}, [fileItems, selectedDirectory]);

	return (
		<WorkingDirectoryContext.Provider value={{ selectedDirectory, setSelectedDirectory }}>
			{children}
		</WorkingDirectoryContext.Provider>
	);
};
