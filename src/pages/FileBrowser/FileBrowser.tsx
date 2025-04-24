import "./FileBrowser.styles.css";
import { MouseEvent, useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons/faRightFromBracket";
import { useNavigate } from "react-router";

import { createRootFolder, fetchFiles } from "./utilities";
import { useS3ClientContext } from "../../hooks/contexts/useS3ClientContext";
import { FileTree } from "./components/FileTree/FileTree";
import { CurrentWorkingDirectory } from "./components/CurrentWorkingDirectory/CurrentWorkingDirectory";
import { useWorkingDirectoryContext } from "../../hooks/contexts/useWorkingDirectoryContext";
import { ContextMenu } from "../../components/ContextMenu/ContextMenu";
import { MenuPosition } from "../../components/ContextMenu/types";
import { fileBrowserContextMenuId } from "./constants";
import { FileTreeItemType } from "./components/FileTreeItem/types";
import { CreateItemModal } from "./components/CreateItemModal/CreateItemModal";
import { useFileItemsContext } from "../../hooks/contexts/useFileItemsContext";
import { findFileTreeItemByPath } from "./components/CreateItemModal/utilities";
import { loginPath } from "../../AppInitializer/constants";
import { s3LoginCredentialsKey } from "../../hooks/useS3Session/constants";

export const FileBrowser = () => {
	const navigate = useNavigate();
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [itemToCreateType, setItemToCreateType] = useState(FileTreeItemType.Folder);
	const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
	const [menuPosition, setMenuPosition] = useState<MenuPosition>({
		xPosition: 0,
		yPosition: 0,
	});

	const { s3Client = null, s3ClientCredentials } = useS3ClientContext();
	const { selectedDirectory = null, setSelectedDirectory } = useWorkingDirectoryContext();

	const { bucketName = "" } = s3ClientCredentials ?? {};

	const { fileItems, setFileItems } = useFileItemsContext();

	const handleContextMenu = useCallback((e: MouseEvent) => {
		e.preventDefault();
		setMenuPosition({ xPosition: e.pageX, yPosition: e.pageY });
		setIsContextMenuOpen(true);
	}, []);

	useEffect(() => {
		if (s3Client && bucketName) {
			createRootFolder(s3Client, bucketName);
		}
	}, [bucketName, s3Client]);

	useEffect(() => {
		if (s3Client && bucketName) {
			const loadItems = async () => {
				const fileItemKeys = await fetchFiles(s3Client, bucketName);
				setFileItems(fileItemKeys);
			};
			loadItems();
		}
	}, [bucketName, s3Client, setFileItems]);

	useEffect(() => {
		const rootDirectory = findFileTreeItemByPath(fileItems, selectedDirectory?.fullPath ?? "");
		if (rootDirectory) {
			setSelectedDirectory(rootDirectory);
		}
	}, [fileItems, selectedDirectory?.fullPath, setSelectedDirectory]);

	return (
		<>
			<nav className="navigationComponent">
				<FontAwesomeIcon
					icon={faRightFromBracket}
					onClick={() => {
						navigate(`/${loginPath}`);
						localStorage.removeItem(s3LoginCredentialsKey);
					}}
					size="lg"
				/>
			</nav>
			<div data-cy="fileBrowser" className="fileBrowser">
				<div data-cy="fileTree" className="fileTree">
					<FileTree />
				</div>
				<div className="divider" />
				<div
					data-cy="workingDirectory"
					className="workingDirectory"
					onContextMenu={handleContextMenu}
				>
					<CurrentWorkingDirectory selectedFolder={selectedDirectory!} />
					<ContextMenu
						id={fileBrowserContextMenuId}
						options={[
							{
								label: "Create file",
								onClick: () => {
									setIsCreateModalOpen(true);
									setItemToCreateType(FileTreeItemType.File);
								},
							},
							{
								label: "Create folder",
								onClick: () => {
									setIsCreateModalOpen(true);
									setItemToCreateType(FileTreeItemType.Folder);
								},
							},
						]}
						isOpen={isContextMenuOpen}
						position={menuPosition}
						onClose={() => setIsContextMenuOpen(false)}
					/>
					<CreateItemModal
						type={itemToCreateType}
						shouldOpen={isCreateModalOpen}
						closeModal={() => setIsCreateModalOpen(false)}
					/>
				</div>
			</div>
		</>
	);
};
