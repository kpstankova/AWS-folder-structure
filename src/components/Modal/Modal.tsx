import "./Modal.styles.css";
import { PropsWithChildren } from "react";

import { ModalProps } from "./types";

export const Modal = ({ isOpen, onClose, children }: PropsWithChildren<ModalProps>) => {
	if (!isOpen) {
		return null;
	}

	return (
		<div className="modalOverlay">
			<div data-cy="modalContent" className="modalContent">
				{onClose && (
					<button
						data-cy="modalCloseButton"
						className="modalCloseButton"
						onClick={onClose}
					>
						x
					</button>
				)}
				{children}
			</div>
		</div>
	);
};
