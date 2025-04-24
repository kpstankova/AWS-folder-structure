import "./FileItemIcon.styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons/faFolder";
import { faFile } from "@fortawesome/free-solid-svg-icons/faFile";

import { FileTreeItemType } from "../FileTreeItem/types";
import { FileItemIconProps } from "./types";
export const FileItemIcon = ({
	type,
	size,
	shouldShift = false,
	isInTree = false,
}: FileItemIconProps) => (
	<>
		{type === FileTreeItemType.Folder ? (
			<FontAwesomeIcon
				icon={faFolder}
				data-cy="selectedDirectoryFolder"
				className={`selectedDirectoryFolder ${shouldShift ? "folderIconEmpty" : ""}`}
				size={size}
			/>
		) : (
			<FontAwesomeIcon
				icon={faFile}
				data-cy="selectedDirectoryFile"
				className={`selectedDirectoryFile ${isInTree ? "fileIcon" : ""}`}
				size={size}
			/>
		)}
	</>
);
