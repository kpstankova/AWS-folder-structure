import "./FileTree.styles.css";

import { FileTreeItem } from "../FileTreeItem/FileTreeItem";
import { useFileItemsContext } from "../../../../hooks/contexts/useFileItemsContext";

export const FileTree = () => {
	const { fileItems } = useFileItemsContext();

	return (
		<>
			{fileItems.map((item) => (
				<FileTreeItem key={item.fullPath} item={item} />
			))}
		</>
	);
};
