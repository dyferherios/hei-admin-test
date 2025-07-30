import { loginAs } from "../script/utils";

describe("Fees Management Workflow", () => {
  const studentName = "Ryan";
  const feeDueDate = "2222-12-12";
  const transactionRef = "MP240731.1518.B11223";

  beforeEach(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();
  });

  it("Allows a Manager to add a fee, a Student to confirm it, and then cleans up", () => {
    // 1. Log in as Manager and add a fee
    loginAs("MANAGER");
    cy.contains("Étudiants").click();
    cy.contains("Liste des étudiants").click();
    cy.url().should("match", /students$/);

    cy.get('[data-testid="main-search-filter"]').type(studentName);
    cy.contains(studentName, { timeout: 4000 }).click();

    cy.get('[data-testid="fees-tab"]').click();
    cy.get('[data-testid="MoreVertIcon"]').click();
    cy.get('[data-testid="create-button"]').click();
    cy.get("#predefinedType").click();

    cy.contains("li", "Frais annuel L1").click();
    cy.contains("Date limite à chaque fin du mois ?").click();
    cy.get("#due_datetime").type(feeDueDate);
    cy.contains("Enregistrer").click();

    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();
    // 2. Log in as Student and confirm the added fee
    loginAs("STUDENT");
    cy.contains("Frais").click();
    cy.url().should("include", "/students/student1_id/fees");

    // Use a more robust selector for the fee confirmation
    cy.contains("span.MuiTypography-body2", `12 décembre ${feeDueDate.substring(0,4)}`) // More precise text matching
      .parents("tr.MuiTableRow-root")
      .find(`svg[data-testid^="addMobileMoney-student1_id"]`)
      .click();

    cy.get(".MuiDialog-container").should("be.visible");

    cy.contains("label", "Référence de la transaction")
      .next("div")
      .find("input")
      .type(transactionRef);

    cy.contains("button", "Enregistrer").should("be.enabled").click();

    // 3. Log back in as Manager and delete the previously created fee (cleanup)
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();

    loginAs("MANAGER");
    cy.contains("Étudiants").click();
    cy.contains("Liste des étudiants").click();
    cy.url().should("match", /students$/);

    cy.get('[data-testid="main-search-filter"]').type(studentName);
    cy.contains(studentName, { timeout: 4000 }).click();

    cy.get('[data-testid="fees-tab"]').click();
    cy.contains(feeDueDate.substring(0,4)).click();

    cy.get(".MuiDialog-container").should("be.visible");

    cy.get('.MuiDialog-container button:contains("SUPPRIMER")')
      .should("be.visible")
      .click();
    cy.contains("Frais supprimé avec succès").should("be.visible");
    cy.contains(feeDueDate.substring(0,4)).should("not.exist");
  });
});
