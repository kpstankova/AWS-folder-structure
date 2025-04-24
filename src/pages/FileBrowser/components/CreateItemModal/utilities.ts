import { FileTreeItem } from "../FileTreeItem/types";

export const findFileTreeItemByPath = (
	items: Array<FileTreeItem>,
	fullPath: string,
): FileTreeItem | null => {
	if (items.length === 0) {
		return null;
	}

	const [currentItem, ...rest] = items;

	if (currentItem.fullPath === fullPath) {
		return currentItem;
	}

	if (currentItem.children) {
		const foundInChildren = findFileTreeItemByPath(currentItem.children, fullPath);
		if (foundInChildren) {
			return foundInChildren;
		}
	}

	return findFileTreeItemByPath(rest, fullPath);
};
