import "./FileTreeItem.styles.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { FileTreeItemProps } from "./types";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { useWorkingDirectoryContext } from "../../../../hooks/contexts/useWorkingDirectoryContext";
import { FileItemIcon } from "../FileItemIcon/FileItemIcon";

export const FileTreeItem = ({ item }: FileTreeItemProps) => {
	const { setSelectedDirectory } = useWorkingDirectoryContext();

	const [isOpen, setIsOpen] = useState(false);
	const { name, children, type } = item;
	return (
		<li data-cy="fileItemTree" key={name}>
			<span
				data-cy="treeContent"
				className="treeContent"
				onDoubleClick={() => setSelectedDirectory(item)}
			>
				{children && children.length > 0 && (
					<FontAwesomeIcon
						data-cy="chevronDownIcon"
						icon={faChevronDown}
						className={`chevronDownIcon ${isOpen ? "open" : ""}`}
						onClick={() => setIsOpen(!isOpen)}
					/>
				)}
				<FileItemIcon type={type} size="lg" shouldShift={children?.length === 0} isInTree />
				<span className="fileName">{name}</span>
			</span>
			{isOpen && (
				<ul data-cy="fileItem" className="fileItem">
					{children?.map((child, index) => <FileTreeItem item={child} key={`${item.name}${index}`} />)}
				</ul>
			)}
		</li>
	);
};
