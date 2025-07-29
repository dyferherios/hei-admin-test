import { loginAs } from "../script/utils";


describe("Login Casdoor", () => {
  it("Connect as student, navigate to Profil and Fees, and test merchant code copy", () => {
    loginAs("STUDENT");

    cy.contains('Frais').click();

    cy.url().should('include', '/students/student1_id/fees');

    cy.get('.MuiBox-root.css-w2h2dk').should('be.visible');
    cy.get('.MuiBox-root.css-w2h2dk .MuiBox-root.css-erema2').should('have.length', 6);
    cy.get('.MuiBox-root.css-w2h2dk .MuiBox-root.css-erema2').eq(0).should('contain.text', '3');
    cy.get('.MuiBox-root.css-w2h2dk .MuiBox-root.css-erema2').eq(1).should('contain.text', '1');
    cy.get('.MuiBox-root.css-w2h2dk .MuiBox-root.css-erema2').eq(2).should('contain.text', '7');
    cy.get('.MuiBox-root.css-w2h2dk .MuiBox-root.css-erema2').eq(3).should('contain.text', '6');
    cy.get('.MuiBox-root.css-w2h2dk .MuiBox-root.css-erema2').eq(4).should('contain.text', '1');
    cy.get('.MuiBox-root.css-w2h2dk .MuiBox-root.css-erema2').eq(5).should('contain.text', '0');
    cy.get('.MuiBox-root.css-w2h2dk').click();
    cy.contains('Code marchand copié!').should('be.visible');
    cy.window().then((win) => {
      win.navigator.clipboard.readText().then((text) => {
        expect(text).to.equal('317610');
      });
    });
    cy.contains('Code marchand copié!', { timeout: 5000 }).should('not.exist');

    cy.get('[data-testid^="showButton-"]').first().click();

    cy.url().should('include', '/fees/');
    cy.url().should('include', '/show');

    cy.contains('Détails du frais').should('be.visible');
    cy.contains('Informations sur le frais').should('be.visible');
    cy.contains('Dates importantes').should('be.visible');

    cy.contains('Total à payer').should('be.visible');
    cy.contains('Reste à payer').should('be.visible');
    cy.contains('Date limite de paiement du frais').should('be.visible');
    cy.contains('Date de création').should('be.visible');
    cy.contains('Statut').should('be.visible');

    cy.contains('Paiements').should('be.visible');
    cy.get('.MuiTable-root tbody tr').should('have.length.greaterThan', 0);

    cy.get('[data-testid="download-button"]').first().click();

    cy.contains('Reçu en cours de téléchargement').should('be.visible');

  });

  it("Connect as a manager, navigate to fees and check details", () => {
    loginAs("MANAGER");

    cy.contains("Étudiants").click();
    cy.contains("Frais (en retard par défaut)").click();
    cy.url().should('match', /fees$/);  

    cy.get('a[aria-label="Afficher"]').first().click();
    cy.contains("Créer").click();
    cy.url().should('match', /create$/);

    cy.contains("Mobile money").click();
    cy.contains("Réference de la transaction").should('be.visible');

    cy.contains("Cash").click();

    cy.contains("Enregistrer").click();
    cy.contains('Le formulaire n\'est pas valide', { timeout: 5000 }).should('not.exist');

    cy.contains("Frais prédéfinis").click();
    cy.url().should('match', /fees-templates$/);

    cy.get('input[data-testid="main-search-filter"]')
      .type("validation-test");
    // "Taille" should be 1 cause only one matches the search
    cy.contains("Taille: 1", { timeout: 4000 }).should('be.visible');
  });
});