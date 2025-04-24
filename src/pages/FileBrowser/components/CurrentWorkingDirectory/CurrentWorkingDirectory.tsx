import "./CurrentWorkingDirectory.styles.css";
import { MouseEvent, useCallback, useState } from "react";

import { CurrentWorkingDirectoryProps } from "./types";
import { FileItemIcon } from "../FileItemIcon/FileItemIcon";
import { useWorkingDirectoryContext } from "../../../../hooks/contexts/useWorkingDirectoryContext";
import { ContextMenu } from "../../../../components/ContextMenu/ContextMenu";
import { MenuPosition } from "../../../../components/ContextMenu/types";
import { fileContextMenuId } from "./constants";
import { deleteItem } from "./utilities";
import { useS3ClientContext } from "../../../../hooks/contexts/useS3ClientContext";
import { fetchFiles } from "../../utilities";
import { findFileTreeItemByPath } from "../CreateItemModal/utilities";
import { useFileItemsContext } from "../../../../hooks/contexts/useFileItemsContext";
import { FileTreeItem } from "../FileTreeItem/types";

export const CurrentWorkingDirectory = ({ selectedFolder }: CurrentWorkingDirectoryProps) => {
	const { children } = selectedFolder ?? {};

	const { setFileItems } = useFileItemsContext();
	const { s3Client = null, s3ClientCredentials } = useS3ClientContext();
	const { selectedDirectory, setSelectedDirectory } = useWorkingDirectoryContext();

	const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
	const [menuPosition, setMenuPosition] = useState<MenuPosition>({
		xPosition: 0,
		yPosition: 0,
	});
	const [itemToDelete, setItemToDelete] = useState<FileTreeItem>();

	const onContextMenu = useCallback((e: MouseEvent, item: FileTreeItem) => {
		e.preventDefault();
		e.stopPropagation();
		setMenuPosition({ xPosition: e.pageX, yPosition: e.pageY });
		setIsContextMenuOpen(true);
		setItemToDelete(item);
	}, []);

	if (!s3Client) {
		return null;
	}

	return (
		<>
			{selectedFolder ? (
				<span data-cy="selectedDirectoryContent" className="selectedDirectoryContent">
					{children?.map((item) => (
						<div
							data-cy={item.fullPath}
							key={item.fullPath}
							className="selectedDirectoryChildren"
							onDoubleClick={() => setSelectedDirectory(item)}
							onContextMenu={(e) => onContextMenu(e, item)}
						>
							<FileItemIcon type={item.type} size="5x" />
							{item.name}
						</div>
					))}
					<ContextMenu
						id={fileContextMenuId}
						options={[
							{
								label: "Delete",
								onClick: async () => {
									await deleteItem(
										s3ClientCredentials?.bucketName ?? "",
										itemToDelete?.fullPath ?? "",
										s3Client,
										itemToDelete?.type,
									);

									const fileItemKeys = await fetchFiles(
										s3Client,
										s3ClientCredentials?.bucketName ?? "",
									);
									setFileItems(fileItemKeys);
									const updatedDirectory = findFileTreeItemByPath(
										fileItemKeys,
										selectedDirectory?.fullPath ?? "",
									);

									if (updatedDirectory) {
										setSelectedDirectory(updatedDirectory);
									}
								},
							},
						]}
						isOpen={isContextMenuOpen}
						position={menuPosition}
						onClose={() => setIsContextMenuOpen(false)}
					/>
				</span>
			) : null}
		</>
	);
};
