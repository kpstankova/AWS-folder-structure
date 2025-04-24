import { Button } from "./Button";
import { ButtonProps } from "./types";

describe("Button component", () => {
	const mockLabel = "mockLabel";

	const getComponent = (props: ButtonProps) => cy.mount(<Button {...props} />);

	it("should render button with correct props", () => {
		getComponent({ label: mockLabel, onClick: cy.stub().as("mockOnClick") });

		cy.dataCy("buttonComponent")
			.should("be.visible")
			.should("have.prop", "className", "buttonStyles")
			.should("have.text", mockLabel);
	});

	it("should fire correct event when button is clicked", () => {
		getComponent({ label: mockLabel, onClick: cy.stub().as("mockOnClick") });

		cy.dataCy("buttonComponent").click();

		cy.get("@mockOnClick").should("have.been.called");
	});

	it("should not fire event on click when button is disabled", () => {
		getComponent({
			label: mockLabel,
			onClick: cy.stub().as("mockOnClick"),
			isDisabled: true,
		});

		cy.dataCy("buttonComponent").click({ force: true });

		cy.get("@mockOnClick").should("have.not.been.called");
	});
});
