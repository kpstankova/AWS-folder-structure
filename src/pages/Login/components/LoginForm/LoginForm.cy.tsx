import { RouterProvider, createBrowserRouter } from "react-router";

import { ComponentWithProviderValue } from "../../../../tests/components/ComponentWithProviderValue";
import { loginFormFields } from "./constants";
import { LoginForm } from "./LoginForm";
import { useS3Session } from "../../../../hooks/useS3Session/useS3Session";

describe("LoginForm Component", () => {
	const getComponent = () =>
		cy.mount(
			<ComponentWithProviderValue
				contextHook={useS3Session}
				contextValueSetter={(context) => {
					cy.spy(context, "login").as("login");
				}}
			>
				<RouterProvider
					router={createBrowserRouter([{ element: <LoginForm />, path: "/*" }])}
				/>
			</ComponentWithProviderValue>,
		);
	it("should render correct headers", () => {
		getComponent();

		cy.dataCy("mainHeader").should("have.text", "Lets Connect to Your S3 Bucket");
		cy.dataCy("secondaryHeader").should("have.text", "Fill in your access details below");
	});

	it("should enable and disable the submit button based on form input", () => {
		getComponent();

		const formFields = Object.keys(loginFormFields);

		cy.dataCy("buttonComponent").should("have.prop", "disabled", true);

		formFields.forEach((field) => {
			cy.get(`#${field}`).type("test");
		});

		cy.dataCy("buttonComponent").should("have.prop", "disabled", false);
	});

	it("renders the input fields correctly and updates form data", () => {
		getComponent();

		const formFields = Object.keys(loginFormFields);

		formFields.forEach((field) => {
			cy.get(`#${field}`).should("exist");
		});

		cy.get(`#${formFields[0]}`).type("testField1");
		cy.get(`#${formFields[0]}`).should("have.value", "testField1");
	});
});
