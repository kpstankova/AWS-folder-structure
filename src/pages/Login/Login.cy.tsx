import { createBrowserRouter, RouterProvider } from "react-router";
import { Login } from "./Login";
import filesImage from "../../assets/filesImage.png";

describe("Login component", () => {
	it("should render correct data", () => {
		cy.mount(
			<RouterProvider router={createBrowserRouter([{ element: <Login />, path: "/*" }])} />,
		);

		cy.dataCy("leftSide").should("exist");
		cy.dataCy("rightSide").should("exist");

		cy.dataCy("filesImage").should("have.attr", "src").and("include", filesImage);

		cy.dataCy("loginForm").should("exist");

		cy.dataCy("mainHeader").should("have.text", "Lets Connect to Your S3 Bucket");
		cy.dataCy("secondaryHeader").should("contain", "Fill in your access details below");
	});
});
