import {loginAs, importFile} from "../script/utils";

const _path = "cypress/fixtures/students_import";

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

const formatDateToString = (date: Date | string): string => {
  if (typeof date === "string") return date;
  return date.toISOString().slice(0, 10);
};

describe("Manager creates students", () => {

  beforeEach(() => {
    loginAs("MANAGER");
    cy.wait(2000);
    cy.visit("https://preprod.admin.hei.school/students");
    cy.wait(2000);
    cy.contains("Liste des étudiants").should("be.visible");
  })

  it("should create a student manually and verify creation", () => {
    const newStudent: Student = {
      ref: "G-80", 
      first_name: "Marie",
      last_name: "Dupont",
      sex: "F",
      specialization_field: "COMMON_CORE",
      birth_date: "1995-05-15",
      address: "123 Rue Exemple, Paris",
      phone: "+33612345678",
      email: `marie.dupont@hei.com`,
      entrance_datetime: "2025-07-29",
      status: "ENABLED",
      nic: "123456789012",
      birth_place: "Paris",
      coordinates: { longitude: 2.3522, latitude: 48.8566 },
      high_school_origin: "LMA",
    };

    cy.get('[data-testid="menu-list-action"]').click();
    cy.get('[data-testid="create-button"]').click();

    cy.get("#ref").type(newStudent.ref);
    cy.get("#first_name").type(newStudent.first_name);
    cy.get("#last_name").type(newStudent.last_name);
    cy.get("#sex_F").click();
    cy.get("#birth_date").click().type(newStudent.birth_date!);
    cy.get("#address").type(newStudent.address!);
    cy.get("#phone").type(newStudent.phone!);
    cy.get("#email").type(newStudent.email);
    cy.get("#entrance_datetime").click().type(formatDateToString(newStudent.entrance_datetime));
    cy.get("#nic").type(newStudent.nic!);
    cy.get("#birth_place").type(newStudent.birth_place!);
    cy.get('[data-testid="longitude-input"]').type(newStudent.coordinates!.longitude.toString());
    cy.get('[data-testid="latitude-input"]').type(newStudent.coordinates!.latitude.toString());
    cy.get("#high_school_origin").type(newStudent.high_school_origin!);

    cy.contains("Enregistrer").click();

    cy.wait(4000);

    cy.contains("Élément créé").should("be.visible");

    cy.get('[data-testid="students-table"]').contains(newStudent.ref).should("be.visible");
  });

  it("should create a lite student and verify creation", () => {
    const liteStudent: Student = {
      ref: "G-60",
      first_name: "Sophie",
      last_name: "Leroy",
      email: `sophie.leroy@hei.com`,
      entrance_datetime: "2025-07-29",
      specialization_field: "COMMON_CORE",
      status: "ENABLED",
      nic: "567890123456",
      birth_place: "Marseille",
      coordinates: { longitude: 5.3698, latitude: 43.2965 },
      high_school_origin: "LTA",
    };

    cy.get('[data-testid="menu-list-action"]').click();
    cy.get('[data-testid="create-button"]').click();

    cy.get("#ref").type(liteStudent.ref);
    cy.get("#first_name").type(liteStudent.first_name);
    cy.get("#last_name").type(liteStudent.last_name);
    cy.get("#email").type(liteStudent.email);
    cy.get("#entrance_datetime").click().type(formatDateToString(liteStudent.entrance_datetime));
    cy.get("#nic").type(liteStudent.nic!);
    cy.get("#birth_place").type(liteStudent.birth_place!);
    cy.get('[data-testid="longitude-input"]').type(liteStudent.coordinates!.longitude.toString());
    cy.get('[data-testid="latitude-input"]').type(liteStudent.coordinates!.latitude.toString());
    cy.get("#high_school_origin").type(liteStudent.high_school_origin);

    cy.contains("Enregistrer").click();

    cy.contains("Élément créé").should("be.visible");

    cy.get('[data-testid="students-table"]').contains(liteStudent.ref).should("be.visible");
  });

  it("should successfully import students with a valid Excel file", () => {
    const filePath = "cypress/fixtures/students_import/correct_students_template.xlsx";
    const expectedRefs = [
      "STD000001",
      "STD000002",
      "STD000003",
      "STD000004",
      "STD000005",
      "STD000006",
      "STD000007",
    ];

    importFile(filePath, "Importation effectuée avec succès", "cypress/fixtures/students_import");

    cy.get('[data-testid="students-table"]').should("be.visible");
    expectedRefs.forEach((ref) => {
      cy.get('[data-testid="students-table"]').contains(ref).should("be.visible");
    });
  });

  it("should fail to import students with an empty Excel file", () => {
    const filePath = "cypress/fixtures/students_import/0_student_template.xlsx";

    importFile(filePath, "Il n'y a pas d'élément à insérer", "cypress/fixtures/students_import");

    cy.get('[data-testid="students-table"]').should("be.visible");
    cy.get('[data-testid="students-table"]').contains("STD000001").should("not.exist");
  });

  it("should fail to import students with incorrect headers in Excel file", () => {
    const filePath = "cypress/fixtures/students_import/wrong_heads_students_template.xlsx";

    importFile(filePath, "Veuillez re-vérifier les en-têtes de votre fichier", "cypress/fixtures/students_import");

    cy.get('[data-testid="students-table"]').should("be.visible");
    cy.get('[data-testid="students-table"]').contains("STD000001").should("not.exist");
  });

  it("should fail to import students with too many entries in Excel file", () => {
    const filePath = "cypress/fixtures/students_import/13_template.xlsx";

    importFile(filePath, "Vous ne pouvez importer que 20 éléments à la fois.", "cypress/fixtures/students_import");

    cy.get('[data-testid="students-table"]').should("be.visible");
    cy.get('[data-testid="students-table"]').contains("STD000001").should("not.exist");
  });
});