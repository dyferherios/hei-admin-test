import { loginAs } from "../script/utils";

const randomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const randomString = (length: number): string =>
  Array.from({ length }, () => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join("");

const generateStudentRef = (): string => {
  const randomNumber = randomInt(10000, 99999);
  return `STD${randomNumber}-PROJET1-G18`;
};

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
  it("should create a student with random data", () => {
    const newStudent: Student = {
      ref: generateStudentRef(),
      first_name: "Jean_" + randomString(5),
      last_name: "Barthelemy_" + randomString(5),
      sex: Math.random() > 0.5 ? "M" : "F",
      specialization_field: "COMMON_CORE",
      birth_date: "199" + randomInt(0, 9) + "-" + randomInt(1, 12).toString().padStart(2, "0") + "-" + randomInt(1, 28).toString().padStart(2, "0"),
      address: `${randomInt(1, 999)} Rue ${randomString(6)}, Antananarivo`,
      phone: "+261" + randomInt(320000000, 339999999).toString(),
      email: `barthelemy_${randomString(5)}${randomInt(1000, 9999)}@hei.mail.school`,
      entrance_datetime: new Date(),
      status: "ENABLED",
      nic: randomInt(100000000000, 999999999999).toString(),
      birth_place: "Antananarivo",
      coordinates: { longitude: 47.5 + Math.random(), latitude: -18.9 + Math.random() },
      high_school_origin: "LMA",
    };

    loginAs("MANAGER");
    cy.visit("https://preprod.admin.hei.school/students");
    cy.contains("Liste des étudiants").should("be.visible");

    cy.get('[data-testid="menu-list-action"]').click();
    cy.get('[data-testid="create-button"]').click();

    cy.get("#ref").type(newStudent.ref);
    cy.get("#first_name").type(newStudent.first_name);
    cy.get("#last_name").type(newStudent.last_name);
    cy.get(`#sex_${newStudent.sex}`).click();
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

    cy.contains("Élément créé").should("be.visible");
    cy.log("Created student: ", JSON.stringify(newStudent));
  });
});
