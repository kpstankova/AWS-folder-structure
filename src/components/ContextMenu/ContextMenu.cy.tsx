import { ContextMenuProvider } from "../../providers/ContextMenuProvider/ContextMenuProvider";
import { useContextMenuContext } from "../../hooks/contexts/useContextMenuContext";
import { ComponentWithProviderValue } from "../../tests/components/ComponentWithProviderValue";
import { ContextMenu } from "./ContextMenu";
import { ContextMenuProps } from "./types";

describe("ContextMenu component", () => {
	const mockOptions = [{ label: "Option1", onClick: cy.stub }];
	const mockProps: ContextMenuProps = {
		id: "mockId",
		options: mockOptions,
		position: { xPosition: 5, yPosition: 10 },
		isOpen: true,
		onClose: cy.stub,
	};

	const getComponent = (props = mockProps) =>
		cy.mount(
			<ContextMenuProvider>
				<ComponentWithProviderValue
					contextHook={useContextMenuContext}
					contextValueSetter={(context) => {
						cy.stub(context, "closeMenu").as("closeMenu");
						cy.stub(context, "isMenuOpen").callsFake(() => true);
						cy.stub(context, "openMenu").as("openMenu");
					}}
				>
					<ContextMenu {...props} />
				</ComponentWithProviderValue>
			</ContextMenuProvider>,
		);

	it("should render component with correct props", () => {
		getComponent();

		cy.dataCy("contextMenu")
			.should("be.visible")
			.should("have.prop", "className", "contextMenu");

		cy.dataCy("contextMenuItem-Option1")
			.should("have.prop", "className", "contextMenuItem")
			.should("have.text", "Option1");
	});
});
