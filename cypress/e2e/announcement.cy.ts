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
    cy.get('[data-testid="letter-list-wrapper"]').within(() => {
      cy.get(".MuiCard-root").first().click();
    });
    cy.get(".MuiCheckbox-root").first().should("be.visible").click();
    cy.contains("Réaction mise à jour avec succès").should("be.visible");
    cy.get(".MuiCheckbox-root").first().click();
    cy.contains("Se déconnecter").should("be.visible").click()
  });

  it("connect as a teacher", () => {
    loginAs("TEACHER");
    cy.contains("Annonces").should("be.visible").click();
    loopTab(list.teacher_tab);
    cy.contains(list.teacher_tab[0]).click()
    cy.get('[data-testid="letter-list-wrapper"]').within(() => {
      cy.get(".MuiCard-root").first().click();
    });
    cy.get(".MuiCheckbox-root").first().should("be.visible").click();
    cy.contains("Réaction mise à jour avec succès").should("be.visible");
    cy.get(".MuiCheckbox-root").first().click();
    cy.contains("Se déconnecter").should("be.visible").click();
  });
  it("connect as a student", () => {
    loginAs("STUDENT");
    cy.contains("Annonces").should("be.visible").click();
    loopTab(list.student_tab);
    cy.contains(list.student_tab[0]).click();
    cy.get('[data-testid="letter-list-wrapper"]').within(() => {
      cy.get(".MuiCard-root").first().click();
    });
    cy.get(".MuiCheckbox-root").first().should("be.visible").click();
    cy.contains("Réaction mise à jour avec succès").should("be.visible");
    cy.get(".MuiCheckbox-root").first().click();
    cy.contains("Se déconnecter").should("be.visible").click();
  }),
  it("connect as a manager", () => {
    loginAs("MANAGER");
    cy.contains("Annonces").should("be.visible").click();
    loopTab(list.admin_tab)
    cy.contains(list.admin_tab[0]).click();
    cy.get('[data-testid="letter-list-wrapper"]').within(() => {
      cy.get(".MuiCard-root").first().click();
    });
    cy.get(".MuiCheckbox-root").first().should("be.visible").click();
    cy.contains("Réaction mise à jour avec succès").should("be.visible");
    cy.get(".MuiCheckbox-root").first().click();
    cy.contains("Se déconnecter").should("be.visible").click();
    });
})