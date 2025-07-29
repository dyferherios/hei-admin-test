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

  //! URL A VERIFIER
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

  cy.get('[data-testid="menu-list-action"]').click();
  cy.get("#import-button").click();
  cy.get('[data-testid="inputFile"]').selectFile(_mockFile, {force: true});
  cy.get('[data-testid="inputFile"]').selectFile(_mockFile, {force: true});

  cy.contains("Confirmer").click();
  cy.contains(message);
};

export const verifyImportedStudents = (refs: string[]) => {
  cy.request({
    method: 'GET',
    url: 'https://preprod.admin.hei.school/api/students?page=1&page_size=10',
    headers: {
      Authorization: `Bearer ${Cypress.env('PREPROD_ACCESS_TOKEN')}`, 
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.be.an('array');

    refs.forEach((ref) => {
      const student = response.body.find((s: any) => s.ref === ref);
      expect(student).to.exist;
      expect(student).to.have.property('first_name');
      expect(student).to.have.property('last_name');
      expect(student).to.have.property('email');
      expect(student).to.have.property('entrance_datetime');
      expect(student.status).to.eq('ENABLED');
    });
  });
};
