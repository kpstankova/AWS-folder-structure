import { Input } from "./Input";
import { InputProps } from "./types";

describe("Input component", () => {
	const mockId = "mockId";
	const mockLabel = "mockLabel";
	const getComponent = (props: InputProps) => cy.mount(<Input {...props} />);

	it("should render component with correct props", () => {
		getComponent({
			id: mockId,
			ariaLabel: mockLabel,
			labelName: mockLabel,
			value: "mockValue",
			onChange: cy.stub().as("mockOnChange"),
		});

		cy.dataCy("inputContainer")
			.should("be.visible")
			.should("have.prop", "className", "inputContainer")
			.dataCy("inputComponent")
			.should("be.visible")
			.should("have.prop", "id", mockId)
			.should("have.prop", "type", "text")
			.should("have.prop", "className", "inputText");
	});
});
