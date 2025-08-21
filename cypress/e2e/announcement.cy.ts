import { loginAs } from "../script/utils";
import { loopTab } from "../script/utils";

const list = {
  admin_tab: [
    "Tous",
    "Managers uniquement",
    "Étudiants uniquement",
    "Enseignants uniquement",
  ],
  teacher_tab: ["Tous", "Tout le monde", "Enseignants uniquement"],
  student_tab: ["Tous", "Tout le monde", "Étudiants uniquement"],
};

describe("annoucement test", () => {
  it("test annoucement as an admin", () => {
    loginAs("ADMIN");
    cy.contains("Annonces").should("be.visible").click();
    loopTab(list.admin_tab);
    cy.contains(list.admin_tab[0]).click();
    cy.get(".MuiTypography-root").should("be.visible");
    cy.get(".MuiTypography-root").children().first().click();
    cy.get("#reaction").should("be.visible").click();
    cy.contains("Réaction mise à jour avec succès").should("be.visible");
    cy.get("#reaction").should("be.visible").click();
  });

  it("connect as a teacher", () => {
    loginAs("TEACHER");
    loopTab(list.teacher_tab);
    cy.contains(list.teacher_tab[0]).click()
    cy.get(".MuiTypography-root").should("be.visible");
    cy.get(".MuiTypography-root").children().first().click();
    cy.get("#reaction").should("be.visible").click();
    cy.contains("Réaction mise à jour avec succès").should("be.visible");
    cy.get("#reaction").should("be.visible").click();
  });
  it("connect as a student", () => {
    loginAs("STUDENT");
    loopTab(list.student_tab);
    cy.contains(list.student_tab[0]).click();
    cy.get(".MuiTypography-root").should("be.visible");
    cy.get(".MuiTypography-root").children().first().click();
    cy.get("#reaction").should("be.visible").click();
    cy.contains("Réaction mise à jour avec succès").should("be.visible");
    cy.get("#reaction").should("be.visible").click();
  }),
  it("connect as a manager", () => {
    loginAs("MANAGER");
    loopTab(list.admin_tab)
    cy.contains(list.admin_tab[0]).click();
    cy.get(".MuiTypography-root").should("be.visible");
    cy.get(".MuiTypography-root").children().first().click();
    cy.get("#reaction").should("be.visible").click();
    cy.contains("Réaction mise à jour avec succès").should("be.visible");
    cy.get("#reaction").should("be.visible").click();
    });
})