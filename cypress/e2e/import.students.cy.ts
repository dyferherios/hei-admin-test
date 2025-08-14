
import {loginAs, importFile, formatDateToString} from "../script/utils";

//const _path = "cypress/fixtures/students_import";
const _path = "D:/NOMENA/HEI/HEI-ADMIN/hei-admin/hei-admin-test/cypress/fixtures/students_import";

const getRandomStd = () => Math.floor(Math.random() * 900) + 100; 
let std = getRandomStd();
const firstNames = [ "Lucas", "Emma"];
let nameIndex = 0;

interface Student {
  id?: string;
  ref: string;
  first_name: string;
  last_name: string;
  sex?: string;
  specialization_field?: string;
  birth_date?: string;
  address?: string;
  phone?: string;
  email: string;
  entrance_datetime: Date | string;
  status?: string;
  nic?: string;
  birth_place?: string;
  coordinates?: { longitude: number; latitude: number };
  high_school_origin?: string;
}

const generateStudentData = (std: number): Student => {
  const firstName = `${firstNames[nameIndex % firstNames.length]}${std}`;
  const lastName = "Dupont";
  nameIndex += 1;
  return {
    ref: `STD00${std}-PROJ1-G18`,
    first_name: firstName,
    last_name: lastName,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@hei.com`,
    entrance_datetime: "2025-07-29",
    specialization_field: "COMMON_CORE",
    status: "ENABLED",
    nic: `123456${std}012`,
    birth_place: "Paris",
    coordinates: { longitude: 2.3522, latitude: 48.8566 },
    high_school_origin: "LMA",
  };
};

const fillStudentForm = (student: Student) => {
  cy.get("#ref").type(student.ref);
  cy.get("#first_name").type(student.first_name);
  cy.get("#last_name").type(student.last_name);
  cy.get("#email").type(student.email);
  cy.get("#entrance_datetime").click().type(formatDateToString(student.entrance_datetime));
  if (student.sex) cy.get(`#sex_${student.sex}`).click();
  if (student.birth_date) cy.get("#birth_date").click().type(student.birth_date);
  if (student.address) cy.get("#address").type(student.address);
  if (student.phone) cy.get("#phone").type(student.phone);
  if (student.nic) cy.get("#nic").type(student.nic);
  if (student.birth_place) cy.get("#birth_place").type(student.birth_place);
  if (student.coordinates) {
    cy.get('[data-testid="longitude-input"]').type(student.coordinates.longitude.toString());
    cy.get('[data-testid="latitude-input"]').type(student.coordinates.latitude.toString());
  }
  if (student.high_school_origin) cy.get("#high_school_origin").type(student.high_school_origin);
};

const verifyStudentCreation = (student: Student) => {
  cy.contains("Élément créé").should("be.visible");
  cy.get('[data-testid="students-menu"]').click();
  cy.get('[href="/students"]').click();
  cy.get('[data-testid="main-search-filter"]').type(student.first_name);
  cy.get('.MuiTableBody-root').contains(student.ref).should("be.visible");
};

const verifyStudentCreationByHisFirstName = (name: string) => {
  cy.get('[data-testid="main-search-filter"]').type(name);
  cy.get('.MuiTableBody-root').contains(name).should("be.visible");
};

describe("Manager creates students", () => {

  beforeEach(() => {
    loginAs("MANAGER");
    cy.wait(2000);
    cy.visit(`${Cypress.env('CYPRESS_BASE_URL')}/students`);
    cy.wait(2000);
    cy.contains("Liste des étudiants").should("be.visible");
  })

  /*it("should create a student manually and verify creation", () => {
   const newStudent = generateStudentData(std);
    newStudent.sex = "F";
    newStudent.birth_date = "1995-05-15";
    newStudent.address = "123 Rue Exemple, Paris";
    newStudent.phone = "+261 234 1779";

    cy.get('[data-testid="menu-list-action"]').click();
    cy.get('[data-testid="create-button"]').click();
    fillStudentForm(newStudent);
    cy.contains("Enregistrer").click();
    verifyStudentCreation(newStudent);
    std += 1;
  });

  

  it("should create a lite student and verify creation", () => {
   const liteStudent = generateStudentData(std);

    cy.get('[data-testid="menu-list-action"]').click();
    cy.get('[data-testid="create-button"]').click();
    fillStudentForm(liteStudent);
    cy.contains("Enregistrer").click();
    verifyStudentCreation(liteStudent);
    std += 1;
  });
*/

 it("should successfully import students with a valid Excel file", () => {
    const filePath = "correct_students_template.xlsx";
    const expectedRefs = [
      "John",
      "Patrick",
      "Jeanne",
      "Jean",
      "Pierre",
      "Hélène",
      "Patrice",
    ];

    importFile(filePath, "Importation effectuée avec succès", _path);

    expectedRefs.forEach((name) => {
     cy.get("body").click(0, 0);
     cy.get("body").click(0, 0);
    verifyStudentCreationByHisFirstName(name);
    });
  });


  it ("should successfully import students with the correct file and minimum infos ", () => {
    const filePath = "lite_correct_students_template.xlsx";
    const expectedRefs = [
      "John",
      "Patrick",
      "Jeanne",
    ];


    importFile(filePath, "Importation effectuée avec succès", _path);

    expectedRefs.forEach((name) => {
     cy.get("body").click(0, 0);
     cy.get("body").click(0, 0);
    verifyStudentCreationByHisFirstName(name);
    });
   
})

  it("should fail to import students with an empty Excel file", () => {
    const filePath = "0_student_template.xlsx";

    importFile(filePath, "Il n'y a pas d'élément à insérer", _path);
  });

  it("should fail to import students with incorrect headers in Excel file", () => {
    const filePath = "wrong_heads_students_template.xlsx";

    importFile(filePath, "Veuillez re-vérifier les en-têtes de votre fichier", _path);
  });

  it("should fail to import students with too many entries in Excel file", () => {
    const filePath = "13_template.xlsx";

    importFile(filePath, "Vous ne pouvez importer que 20 éléments à la fois.", _path);
  });
});

