import { loginAs } from "../script/utils";

describe("Fees Management Workflow", () => {
  const testData = {
    studentName: "Ryan",
    feeDueDate: "2222-12-12",
    transactionRef: "MP240731.1518.B11223",
    feeType: "Frais annuel L1"
  };

  // Page Object Methods
  const studentsPage = {
    navigateToStudentsList() {
      cy.contains("Étudiants").click();
      cy.contains("Liste des étudiants").click();
      cy.url().should("match", /students$/);
    },
    
    searchAndSelectStudent(studentName) {
      cy.get('[data-testid="main-search-filter"]').type(studentName);
      cy.contains(studentName, { timeout: 4000 }).click();
    },
    
    navigateToFeesTab() {
      cy.get('[data-testid="fees-tab"]').click();
    }
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
    },
    
    confirmFeePayment(year, transactionRef) {
      cy.contains("span.MuiTypography-body2", `12 décembre ${year}`)
        .parents("tr.MuiTableRow-root")
        .find(`svg[data-testid^="addMobileMoney-student1_id"]`)
        .click();
      
      cy.get(".MuiDialog-container").should("be.visible");
      cy.contains("label", "Référence de la transaction")
        .next("div")
        .find("input")
        .type(transactionRef);
      
      cy.contains("button", "Enregistrer")
        .should("be.enabled")
        .click();
    },
    
    deleteFee(year) {
      cy.contains(year).click();
      cy.get(".MuiDialog-container").should("be.visible");
      cy.get('.MuiDialog-container button:contains("SUPPRIMER")')
        .should("be.visible")
        .click();
      cy.contains("Frais supprimé avec succès").should("be.visible");
      cy.contains(year).should("not.exist");
    }
  };

  const studentFeesPage = {
    navigateToFees() {
      cy.contains("Frais").click();
      cy.url().should("include", "/students/student1_id/fees");
    }
  };

  // Utility functions
  const clearSession = () => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();
  };

  const getYear = (dateString) => dateString.substring(0, 4);

  beforeEach(() => {
    clearSession();
  });

  it("Should complete the full fees management workflow: create, confirm, and cleanup", () => {
    const year = getYear(testData.feeDueDate);
    let paymentError = null;
    
    // Step 1: Manager creates a fee
    cy.log("**Step 1: Manager creates fee**");
    loginAs("MANAGER");
    studentsPage.navigateToStudentsList();
    studentsPage.searchAndSelectStudent(testData.studentName);
    studentsPage.navigateToFeesTab();
    feesPage.createFee(testData.feeType, testData.feeDueDate);
    
    clearSession();
    
    // Step 2: Student confirms the fee payment (with error handling)
    cy.log("**Step 2: Student confirms fee payment**");
    loginAs("STUDENT");
    studentFeesPage.navigateToFees();
    
    // Attempt payment confirmation with error capture
    cy.then(() => {
      return new Cypress.Promise((resolve) => {
        cy.on('fail', (err) => {
          paymentError = err.message;
          cy.log(`**Payment confirmation failed: ${err.message}**`);
          resolve();
          return false; // Prevent Cypress from failing the test
        });
        
        feesPage.confirmFeePayment(year, testData.transactionRef);
        resolve();
      });
    });
    
    clearSession();
    
    // Step 3: Manager deletes the fee (cleanup) - Always runs
    cy.log("**Step 3: Manager cleans up by deleting fee**");
    loginAs("MANAGER");
    studentsPage.navigateToStudentsList();
    studentsPage.searchAndSelectStudent(testData.studentName);
    studentsPage.navigateToFeesTab();
    feesPage.deleteFee(year);
    
    // Report any payment error after cleanup
    cy.then(() => {
      if (paymentError) {
        cy.log(`**Test completed with payment error: ${paymentError}**`);
        throw new Error(`Payment confirmation failed: ${paymentError}`);
      }
    });
  });

  // Alternative approach using try-catch pattern
  it("Should complete the full fees management workflow with better error handling", () => {
    const year = getYear(testData.feeDueDate);
    let paymentSuccessful = false;
    let errorMessage = '';
    
    // Step 1: Manager creates a fee
    cy.log("**Step 1: Manager creates fee**");
    loginAs("MANAGER");
    studentsPage.navigateToStudentsList();
    studentsPage.searchAndSelectStudent(testData.studentName);
    studentsPage.navigateToFeesTab();
    feesPage.createFee(testData.feeType, testData.feeDueDate);
    
    clearSession();
    
    // Step 2: Student confirms the fee payment (with error handling)
    cy.log("**Step 2: Student attempts fee payment**");
    loginAs("STUDENT");
    studentFeesPage.navigateToFees();
    
    // Try payment confirmation, capture any errors
    cy.window().then(() => {
      cy.on('fail', (err) => {
        errorMessage = err.message;
        cy.log(`**Payment failed: ${errorMessage}**`);
        return false; // Don't fail the test yet
      });
    });
    
    // Attempt the payment
    cy.then(() => {
      try {
        feesPage.confirmFeePayment(year, testData.transactionRef);
        paymentSuccessful = true;
        cy.log("**Payment confirmation successful**");
      } catch (error) {
        errorMessage = error.message;
        cy.log(`**Payment confirmation failed: ${errorMessage}**`);
      }
    });
    
    clearSession();
    
    // Step 3: Manager deletes the fee (cleanup) - Always executes
    cy.log("**Step 3: Manager performs cleanup**");
    loginAs("MANAGER");
    studentsPage.navigateToStudentsList();
    studentsPage.searchAndSelectStudent(testData.studentName);
    studentsPage.navigateToFeesTab();
    feesPage.deleteFee(year);
    
    // Final assertion - fail test if payment failed
    cy.then(() => {
      if (!paymentSuccessful && errorMessage) {
        cy.log(`**Test failed due to payment error: ${errorMessage}**`);
        expect(paymentSuccessful, `Payment confirmation failed: ${errorMessage}`).to.be.true;
      }
    });
  });
});
