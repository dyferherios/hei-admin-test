import { loginAs } from "../script/utils";

describe("Groups test", () => {
  it("Groups List is visible", () => {
	// Connect as an admin
	loginAs("ADMIN");

	// Naviguer vers la page des groupes
	cy.visit("https://preprod.admin.hei.school/groups");

	// Vérifier que le titre de la page est visible
	cy.contains("Liste des groupes").should("be.visible");

	// Vérifier que le tableau existe
    cy.get('table').should('exist')

    // Vérifier la présence des en-têtes
    cy.get('table thead tr th').should('have.length.at.least', 1) // au moins 1 colonne
    cy.get('table thead tr').within(() => {
      cy.contains('Référence')
      cy.contains('Nom')
      cy.contains('Date de création')
      cy.contains('Étudiants')
    })

    // Vérifier la présence de lignes dans le corps
    cy.get('table tbody tr').should('have.length.at.least', 1) // au moins 1 ligne
    cy.get('table tbody tr').first().within(() => {
      cy.get('td').should('have.length.at.least', 1)
    })
  });
});

