import { useState } from "react";
import "./CreateItemModal.styles.css";

import { Button } from "../../../../components/Button/Button";
import { Input } from "../../../../components/Input/Input";
import { Modal } from "../../../../components/Modal/Modal";
import { CreateItemModalProps } from "./types";
import { createItem, fetchFiles } from "../../utilities";
import { useS3ClientContext } from "../../../../hooks/contexts/useS3ClientContext";
import { useWorkingDirectoryContext } from "../../../../hooks/contexts/useWorkingDirectoryContext";
import { useFileItemsContext } from "../../../../hooks/contexts/useFileItemsContext";
import { findFileTreeItemByPath } from "./utilities";

export const CreateItemModal = ({ shouldOpen, closeModal, type }: CreateItemModalProps) => {
	const [itemName, setItemName] = useState("");

	const { setFileItems } = useFileItemsContext();
	const { s3Client, s3ClientCredentials } = useS3ClientContext();
	const { selectedDirectory = null, setSelectedDirectory } = useWorkingDirectoryContext();
	const { bucketName = "" } = s3ClientCredentials ?? {};

	if (!s3Client) {
		return null;
	}

	return (
		<Modal isOpen={shouldOpen} onClose={closeModal}>
			<h2 data-cy="createModalHeader" className="createModalHeader">
				Enter name
			</h2>
			<div className="createModalContent">
				<Input
					id="fileItemNameKey"
					ariaLabel="fileItemName"
					labelName="Name"
					value={itemName}
					onChange={(e) => setItemName(e.target.value)}
					focus
				/>
			</div>
			<div className="createModalFooter">
				<Button
					label="Create"
					onClick={async () => {
						await createItem(
							s3Client,
							bucketName,
							`${selectedDirectory?.fullPath ?? ""}${itemName}`,
							type,
						);
						const fileItemKeys = await fetchFiles(s3Client, bucketName);
						setFileItems(fileItemKeys);
						const updatedDirectory = findFileTreeItemByPath(
							fileItemKeys,
							selectedDirectory?.fullPath ?? "",
						);

						if (updatedDirectory) {
							setSelectedDirectory(updatedDirectory);
						}

						closeModal();
					}}
					isDisabled={itemName === ""}
				/>
			</div>
		</Modal>
	);
};
