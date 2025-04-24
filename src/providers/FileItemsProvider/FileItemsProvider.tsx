import { PropsWithChildren, useState } from "react";
import { FileTreeItem } from "src/pages/FileBrowser/components/FileTreeItem/types";
import { FileItemsContext } from "./context";

export const FileItemsProvider = ({ children }: PropsWithChildren<object>) => {
	const [fileItems, setFileItems] = useState<Array<FileTreeItem>>([]);

	return (
		<FileItemsContext.Provider value={{ fileItems, setFileItems }}>
			{children}
		</FileItemsContext.Provider>
	);
};
