import { loginAs } from "../script/utils";

describe("Dashboard test", () => {
  it("Teacher dashboard is visible", () => {
	// Connect as a teacher
	loginAs("TEACHER");

	// Vérifier que les détails du profil est visible
	cy.contains("Dashboard").should("be.visible").click();
	cy.contains("Détails du Profil").should("be.visible").click();
	cy.contains("Coordonnées").should("be.visible");

	// Vérifier que la boîte aux lettres est visible
	cy.contains("Dashboard").should("be.visible").click();
	cy.contains("Boîte aux lettres").should("be.visible").click();
	cy.get('[data-testid="letter-create-button"]').should("be.visible");
  });

  it("Manager dashboard is visible", () => {
	// Connect as a manager
	loginAs("MANAGER");

	// Vérifier que les lettres, les frais et les commentaires sont visibles
	cy.contains("Dashboard").should("be.visible").click();
	cy.contains("Lettres récemment envoyées").should("be.visible");
	cy.contains("Listes des frais en retard").should("be.visible");
	cy.contains("Liste des étudiants avec commentaires").should("be.visible");
  });

  it("Student dashboard is visible", () => {
	// Connect as a student
	loginAs("STUDENT");

	// Vérifier que les informations personnelles est visible
	cy.contains("Dashboard").should("be.visible").click();
	cy.get('[data-testid="profile-tab"]').should("be.visible").click();
	cy.contains("Coordonnées").should("be.visible");
	cy.contains("Détails personnels").should("be.visible");
	cy.contains("Informations personnelles").should("be.visible");

	// Vérifier que les commentaires est visible
	cy.contains("Dashboard").should("be.visible").click();
	cy.get('[data-testid="comments-tab"]').should("be.visible").click();

	// Vérifier que les lettres est visible
	cy.contains("Dashboard").should("be.visible").click();
	cy.get('[data-testid="user-letters-tab"]').should("be.visible").click();
	cy.get('[data-testid="letter-create-button"]').should("be.visible").click();
	cy.contains("Créer une lettre").should("be.visible");
	cy.get('[data-testid="CloseIcon"]').should("be.visible").click();
  });
});

