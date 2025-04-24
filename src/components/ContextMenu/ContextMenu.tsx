import "./ContextMenu.styles.css";
import { useEffect } from "react";

import { ContextMenuProps } from "./types";
import { useContextMenuContext } from "../../hooks/contexts/useContextMenuContext";

export const ContextMenu = ({ id, options, position, isOpen, onClose }: ContextMenuProps) => {
	const { openMenu, closeMenu, isMenuOpen } = useContextMenuContext();

	const { xPosition, yPosition } = position;

	useEffect(() => {
		if (isOpen) {
			openMenu(id);
		} else {
			closeMenu(id);
		}
	}, [isOpen, id, openMenu, closeMenu]);

	useEffect(() => {
		const handleClick = () => onClose();
		document.addEventListener("click", handleClick);
		return () => document.removeEventListener("click", handleClick);
	}, [onClose]);

	if (!isMenuOpen(id)) {
		return null;
	}

	return (
		<ul
			data-cy="contextMenu"
			style={{ top: yPosition, left: xPosition }}
			className="contextMenu"
		>
			{options.map(({ label, onClick }) => (
				<li
					data-cy={`contextMenuItem-${label}`}
					key={label}
					className="contextMenuItem"
					onClick={() => {
						onClick();
						onClose();
					}}
				>
					{label}
				</li>
			))}
		</ul>
	);
};
