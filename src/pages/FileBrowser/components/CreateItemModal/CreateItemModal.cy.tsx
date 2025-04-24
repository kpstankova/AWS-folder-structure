
import { S3 } from "@aws-sdk/client-s3";

import { S3ClientProvider } from "../../../../providers/S3ClientProvider/S3ClientProvider";
import { FileTreeItemType } from "../FileTreeItem/types";
import { CreateItemModal } from "./CreateItemModal";
import { FileItemsProvider } from "../../../../providers/FileItemsProvider/FileItemsProvider";
import { WorkingDirectoryProvider } from "../../../../providers/WorkingDirectoryProvider/WorkingDirectoryProvider";
import { ComponentWithProviderValue } from "../../../../tests/components/ComponentWithProviderValue";
import { useS3ClientContext } from "../../../../hooks/contexts/useS3ClientContext";

describe("CreateItemModal component", () => {
	const getComponent = () =>
		cy.mount(
			<S3ClientProvider>
				<FileItemsProvider>
					<WorkingDirectoryProvider>
						<ComponentWithProviderValue
							contextHook={useS3ClientContext}
							contextValueSetter={({ setS3Client }) => {
								setS3Client(
									new S3({
										region: "mockRegion",
										credentials: {
											accessKeyId: "mockAccessKey",
											secretAccessKey: "mockSecretKey",
										},
									}),
								);
							}}
						>
							<CreateItemModal
								shouldOpen={true}
								closeModal={cy.stub()}
								type={FileTreeItemType.File}
							/>
						</ComponentWithProviderValue>
					</WorkingDirectoryProvider>
				</FileItemsProvider>
			</S3ClientProvider>,
		);

	it("should render modal and respond to input", () => {
		getComponent();

		cy.dataCy("createModalHeader").should("have.text", "Enter name");

		cy.contains("button", "Create").should("be.disabled");

		cy.get("#fileItemNameKey").type("my-new-file");

		cy.contains("button", "Create").should("not.be.disabled");
	});
});
