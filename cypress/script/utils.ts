export const loginAs = (role: "STUDENT" | "TEACHER" | "MANAGER" | "ADMIN") => {
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
    ADMIN: {
      email: "test+admin@hei.school",
      password: Cypress.env("CYPRESS_ADMIN1_PASSWORD"),
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


  cy.contains("Dashboard").should("be.visible");

};

export const importFile = (file: string, message: string, _path: string) => {
  const _mockFile = `${_path}/${file}`;

  cy.get('[data-testid="menu-list-action"]').click();
  cy.get('[data-testid="import-button"]').should("be.visible").click();

  cy.get('[data-testid="inputFile"]').selectFile(_mockFile, { force: true });

  cy.contains("Confirmer").click();

  cy.contains(message).should("be.visible");
};

export const formatDateToString = (date: Date | string): string => {
  if (typeof date === "string") return date;
  return date.toISOString().slice(0, 10);
};


export const loopTab = (list: string[]) => {
  list.forEach((tab: string) => {
    cy.contains(tab).should("be.visible")
  })
  cy.contains('[data-testid=letter-list-wrapper]').should("be.visible")
}