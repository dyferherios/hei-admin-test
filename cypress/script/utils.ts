export const loginAs = (role: "STUDENT" | "TEACHER" | "MANAGER") => {
  const credentials = {
    STUDENT: {
      email: "test+ryan@hei.school",
      password: Cypress.env("CYPRESS_STUDENT1_PASSWORD"),
    },
    TEACHER: {
      email: "test+teacher1@hei.school",
      password: Cypress.env("CYPRESS_TEACHER1_PASSWORD"),
    },
    MANAGER: {
      email: "test+manager1@hei.school",
      password: Cypress.env("CYPRESS_MANAGER1_PASSWORD"),
    },
  }[role];

  cy.visit("https://preprod.admin.hei.school/login"); 

  cy.get('[data-testid="casdoor-login-btn"]').click();

  cy.origin(
    "https://numer.casdoor.com",
    { args: credentials },
    ({ email, password }) => {
      cy.get('input[placeholder*="identifiant"]')
        .first()
        .should("be.visible")
        .type(email);

      cy.get('input[type="password"]')
        .first()
        .type(password + "{enter}");
    }

  );


  cy.get("h6.MuiTypography-root").should("contain.text", "Dashboard");

};

export const importFile = (file: string, message: string, _path: string) => {
  const _mockFile = `${_path}/${file}`;

  cy.get("#menu-list-action").click();
  cy.get("#import-button").should("be.visible").click();
  
  cy.get("#inputFile").selectFile(_mockFile, { force: true });
  
  cy.contains("Confirmer").click();
  
  cy.contains(message).should("be.visible");
};

