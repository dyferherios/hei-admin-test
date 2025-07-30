import { loginAs } from "../script/utils";

describe("attendance test", () => {
  it("connect as a teacher and attendance test", () => {
    loginAs("TEACHER");

    // Navigation vers l'événement
    cy.get('[data-testid="event-menu"]').should("be.visible").click();
    cy.get('[tabindex="-1"]').should("be.visible").click();
    cy.get('a[id="event-show"]').first().should("be.visible").click();

    // Marquer tous les élèves comme "PRESENT"
    cy.get('div[data-testid="PRESENT"]').each(($el) => {
      cy.wrap($el).should("be.visible").click();
    });

    // Sauvegarder
    cy.get('button[aria-label="Sauvegarder"]').should("be.visible").click();

    // Vérification du message de confirmation
    cy.get('.css-1w0ym84').should("contain.text", "Enregistrer avec succès.");
  });
});

