import { loginAs } from "../script/utils";

describe("Fees Management Workflow", () => {
  const testData = {
    studentName: "Tokimahery",
    feeDueDate: "2025-12-12",
    transactionRef: "MP240731.1518.B11223",
    feeType: "Frais annuel L1",
  };

  let feeCreatedSuccessfully = false;

  // Page Object Methods
  const studentsPage = {
    navigateToStudentsList() {
      cy.contains("Étudiants").click();
      cy.contains("Liste des étudiants").click();
      cy.url().should("match", /students$/);
    },

    searchAndSelectStudent(studentName) {
      cy.get('[data-testid="main-search-filter"]').type(studentName);
      cy.contains(studentName, { timeout: 6000 }).click();
    },

    navigateToFeesTab() {
      cy.get('[data-testid="fees-tab"]').click();
    },
  };

  const feesPage = {
    createFee(feeType, dueDate) {
      cy.get('[data-testid="MoreVertIcon"]').click();
      cy.get('[data-testid="create-button"]').click();
      cy.get("#predefinedType").click();
      cy.contains("li", feeType).click();
      cy.contains("Date limite à chaque fin du mois ?").click();
      cy.get("#due_datetime").type(dueDate);
      cy.contains("Enregistrer").click();
      cy.contains("Élément créé").should("be.visible");
    },

    confirmFeePayment(year, transactionRef) {
      cy.contains("span.MuiTypography-body2", `12 décembre ${year}`)
        .parents("tr.MuiTableRow-root")
        .find('button[aria-label="Mobile Money"]')
        .click();

      cy.get(".MuiDialog-container").should("be.visible");
      cy.contains("label", "Référence de la transaction")
        .next("div")
        .find("input")
        .type(transactionRef);

      cy.contains("button", "Enregistrer").should("be.enabled").click();
      //cy.contains("Paiement enregistré avec succès").should("be.visible");
    },

    setPageSizeTo100() {
      cy.get("body").then(($body) => {
        if (
          $body.find(".MuiBox-root").length > 0 &&
          $body.text().includes("éléments")
        ) {
          cy.get(".MuiBox-root .MuiBox-root")
            .contains("éléments")
            .parent()
            .click();

          cy.contains("li", "100 éléments").click();
          cy.wait(500);
        }
      });
    },

    deleteFee(year) {
      this.setPageSizeTo100();

      cy.contains("span.MuiTypography-body2", `12 décembre ${year}`).click();

      cy.contains("Détails du frais").should("be.visible");

      cy.get('[data-testid="delete-button-confirm"]')
        .should("be.visible")
        .click();

      cy.get(".MuiDialog-container").should("be.visible");

      cy.get("button.ra-confirm")
        .contains("Supprimer")
        .should("be.visible")
        .click();

      cy.contains("Élément supprimé avec succès.").should("be.visible");

      cy.log("Loggin out");
      cy.contains("Se déconnecter").click();
      clearSession();
    },
  };

  const studentFeesPage = {
    navigateToFees() {
      cy.contains("Frais").click();
    },

    setPageSizeTo100() {
      cy.get("body").then(($body) => {
        if (
          $body.find(".MuiBox-root").length > 0 &&
          $body.text().includes("éléments")
        ) {
          cy.get(".MuiBox-root .MuiBox-root")
            .contains("éléments")
            .parent()
            .click();

          cy.contains("li", "100 éléments").click();
          cy.wait(1000);
        }
      });
    },
  };

  // Utility functions
  const clearSession = () => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();
    cy.wait(2000); // Wait for session clearing to take effect
  };

  const getYear = (dateString) => dateString.substring(0, 4);

  beforeEach(() => {
    clearSession();
    feeCreatedSuccessfully = false;
  });

  afterEach(() => {
    const year = getYear(testData.feeDueDate);
    if (feeCreatedSuccessfully) {
      cy.log("**Running cleanup: Manager deletes fee**");

      clearSession();

      loginAs("MANAGER");

      studentsPage.navigateToStudentsList();
      studentsPage.searchAndSelectStudent(testData.studentName);
      studentsPage.navigateToFeesTab();

      feesPage.setPageSizeTo100();

      cy.contains("span.MuiTypography-body2", `12 décembre ${year}`, {
        timeout: 10000,
      }).then(($feeElement) => {
        if ($feeElement.length > 0) {
          feesPage.deleteFee(year);
        } else {
          cy.log(
            `**Cleanup Skipped: Fee for ${year} was not found on the page after setting page size to 100. It might have been already deleted or not created successfully.**`
          );
        }
      });
    } else {
      cy.log(
        "**Skipping cleanup: Fee was not successfully created during the test.**"
      );
    }
  });

  it("Should complete the full fees management workflow: create, confirm, and cleanup", () => {
    const year = getYear(testData.feeDueDate);

    cy.log("**Step 1: Manager creates fee**");
    loginAs("MANAGER");
    studentsPage.navigateToStudentsList();
    studentsPage.searchAndSelectStudent(testData.studentName);
    studentsPage.navigateToFeesTab();
    feesPage.createFee(testData.feeType, testData.feeDueDate);
    feeCreatedSuccessfully = true;
    // logout
    cy.contains("Se déconnecter").click();
    clearSession();

    cy.log("**Step 2: Student confirms fee payment**");
    loginAs("STUDENT");
    studentFeesPage.navigateToFees();
    studentFeesPage.setPageSizeTo100();

    feesPage.confirmFeePayment(year, testData.transactionRef);
    // logout
    cy.contains("Se déconnecter").click();
    clearSession();
  });
});
