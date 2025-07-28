import {loginAs, importFile, verifyImportedStudents} from "./../script/utils";

const _path = "cypress/fixtures/students_import";

describe("Login as a manager", () => {
  beforeEach(() => {
    cy.visit("https://preprod.admin.hei.school");
    loginAs("MANAGER");
  });

  it("should navigate to students and check student data", () => {
  cy.visit("https://preprod.admin.hei.school/students");
  cy.getByTestid("students-menu").click();
  cy.get('[href="/students"]').click();
});

 it('should successfully import students with a valid Excel file', () => {
    const filePath = 'cypress/fixtures/students_import/correct_students_template.xlsx';
    const expectedRefs = ['STD000001', 'STD000002', 'STD000003', 'STD000004', 'STD000005', 'STD000006', 'STD000007'];

    // Simuler l'importation du fichier Excel
    importFile(filePath, 'Importation effectuée avec succès', 'cypress/fixtures/students_import');

    // Vérifier le message de succès dans l'interface
    cy.contains('Importation effectuée avec succès').should('be.visible');

    // Vérifier les données importées via l'API
    verifyImportedStudents(expectedRefs);
  });

 it('should fail to import students with an empty Excel file', () => {
    const filePath = 'cypress/fixtures/students_import/0_student_template.xlsx';
    importFile(filePath, "Il n'y a pas d'élément à insérer", 'cypress/fixtures/students_import');
    cy.contains("Il n'y a pas d'élément à insérer").should('be.visible');
  });

  it('should fail to import students with incorrect headers in Excel file', () => {
    const filePath = 'cypress/fixtures/students_import/wrong_heads_students_template.xlsx';
    importFile(filePath, 'Veuillez re-vérifier les en-têtes de votre fichier', 'cypress/fixtures/students_import');
    cy.contains('Veuillez re-vérifier les en-têtes de votre fichier').should('be.visible');
  });

  it('should fail to import students with too many entries in Excel file', () => {
    const filePath = 'cypress/fixtures/students_import/13_template.xlsx';
    importFile(filePath, 'Vous ne pouvez importer que 20 éléments à la fois.', 'cypress/fixtures/students_import');
    cy.contains('Vous ne pouvez importer que 20 éléments à la fois.').should('be.visible');
  });
});

