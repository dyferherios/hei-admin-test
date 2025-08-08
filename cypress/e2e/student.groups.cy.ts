import { loginAs } from "../script/utils";

describe("Groups test", () => {
  it("Groups List is visible", () => {
	loginAs("ADMIN");

	cy.visit("https://preprod.admin.hei.school/groups");

	cy.contains("Liste des groupes").should("be.visible");
  });
});

