import { loginAs } from "../script/utils";


describe("Login Casdoor", () => {

  it("Log in as a manager, navigate to fees list and add one", () => {
    loginAs("MANAGER");
    cy.contains("Étudiants").click();
    cy.contains("Liste des étudiants").click();
    cy.url().should('match', /students$/);

    cy.get('[data-testid="main-search-filter"]').type('ryan');

    cy.contains('Ryan', { timeout: 4000 }).click();

    cy.get('[data-testid="fees-tab"]').click();
    cy.get('[data-testid="MoreVertIcon"]').click();
    cy.get('[data-testid="create-button"]').click();
    cy.get('#predefinedType').click();

    cy.contains('li', 'Frais annuel L1').click();
    cy.contains("Date limite à chaque fin du mois ?").click();
    cy.get('#due_datetime').type('2222-12-12');
    cy.contains("Enregistrer").click();
  });

  it("Log in as Student and confirm the added fee", () => {
    loginAs("STUDENT");

    cy.contains('Frais').click();
    cy.url().should('include', '/students/student1_id/fees');

    cy.contains('span.MuiTypography-body2', '12 décembre 2222')
      .parents('tr.MuiTableRow-root')
      .find('svg[data-testid^="addMobileMoney-student1_id"]')
      .click();

    cy.get('.MuiDialog-container').should('be.visible');

    // 1. Input "MP240731.1518.B11223" into the "Référence de la transaction" field
    cy.contains('label', 'Référence de la transaction')
      .next('div')
      .find('input')
      .type('MP240731.1518.B11223');

    cy.contains('button', 'Enregistrer')
      .should('be.enabled')
      .click();
  });

  // cleanup
  it("Login back as Manager and delete previously created fee", () => {
    loginAs("MANAGER");

    cy.contains("Étudiants").click();
    cy.contains("Liste des étudiants").click();
    cy.url().should('match', /students$/);

    cy.get('[data-testid="main-search-filter"]').type('ryan');

    cy.contains('Ryan', { timeout: 4000 }).click();

    cy.get('[data-testid="fees-tab"]').click();
    cy.contains("2222").click();

    cy.get('[data-testid="delete-button-confirm"]').click();

    cy.contains('button', 'Supprimer')
      .should('be.visible')
      .click();
  });

});
