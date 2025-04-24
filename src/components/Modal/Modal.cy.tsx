import { Modal } from "./Modal";
import { ModalProps } from "./types";

describe("Modal component", () => {
	const getComponent = (props: ModalProps) => cy.mount(<Modal {...props} />);

	it("should render component with correct props", () => {
		getComponent({
			isOpen: true,
			onClose: cy.stub().as("mockOnClose"),
		});

		cy.dataCy("modalContent")
			.should("be.visible")
			.should("have.prop", "className", "modalContent");
	});

	it("should fire a callback when the close button is clicked", () => {
		getComponent({
			isOpen: true,
			onClose: cy.stub().as("mockOnClose"),
		});

		cy.dataCy("modalCloseButton").click();
		cy.get("@mockOnClose").should("have.been.called");
	});

	it("should not display the close button when onClose is not passed as a prop", () => {
		getComponent({
			isOpen: true,
		});

		cy.dataCy("modalCloseButton").should("not.exist");
	});
});
