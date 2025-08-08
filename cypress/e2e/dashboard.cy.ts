import { loginAs } from "../script/utils";

describe("Dashboard test", () => {
  it("Teacher dashboard is visible", () => {
	loginAs("TEACHER");

	cy.contains("Dashboard").should("be.visible").click();
	cy.contains("Détails du Profil").should("be.visible").click();
	cy.contains("Coordonnées").should("be.visible");
	
	cy.contains("Dashboard").should("be.visible").click();
	cy.contains("Boîte aux lettres").should("be.visible").click();
	cy.get('[data-testid="letter-create-button"]').should("be.visible");
  });

  it("Manager dashboard is visible", () => {
	loginAs("MANAGER");

	cy.contains("Dashboard").should("be.visible").click();
	cy.contains("Lettres récemment envoyées").should("be.visible");
	cy.contains("Listes des frais en retard").should("be.visible");
	cy.contains("Liste des étudiants avec commentaires").should("be.visible");
  });

  it("Student dashboard is visible", () => {
	loginAs("STUDENT");

	cy.contains("Dashboard").should("be.visible").click();
	cy.get('[data-testid="profile-tab"]').should("be.visible").click();
	cy.contains("Coordonnées").should("be.visible");
	cy.contains("Détails personnels").should("be.visible");
	cy.contains("Informations personnelles").should("be.visible");

	cy.contains("Dashboard").should("be.visible").click();
	cy.get('[data-testid="comments-tab"]').should("be.visible").click();

	cy.contains("Dashboard").should("be.visible").click();
	cy.get('[data-testid="user-letters-tab"]').should("be.visible").click();
	cy.get('[data-testid="letter-create-button"]').should("be.visible").click();
	cy.contains("Créer une lettre").should("be.visible");
	cy.get('[data-testid="CloseIcon"]').should("be.visible").click();
  });
});

