import { loginAs } from "../script/utils";
import { loopTab } from "../script/utils";

const list = {
  admin_tab: [
    "Tous",
    "Managers uniquement",
    "Étudiants uniquement",
    "Enseignants uniquement",
  ],
  teacher_tab: [
    "Tous",
    "Tout le monde",
    "Enseignants uniquement",
  ],
};

describe("annoucement test", () => {
  it("test annoucement as an admin", () => {
    loginAs("ADMIN");
    cy.contains("Annonces").should("be.visible").click();
    loopTab(list.admin_tab);
    cy.contains(list.admin_tab[0]).click();
    cy.contains('[class="MuiTypography-root"]').should("be.visible")
    cy.get('.MuiTypographie-root').children().first().click();
    cy.contains('[id="reaction"]').should("be.visble").click();
    cy.contains("Réaction mise à jour avec succès").should("be.visible");
    cy.contains('[id="reaction"]').should("be.visible").click();
  });

  it("connect as a teacher", () => {
    loginAs("TEACHER");
    loopTab(list.teacher_tab);
    cy.contains(list.teacher_tab[1]).click()
    cy.contains('[class=MuiTypography-root]').should("be.visible")
    cy.get(".MuiTypography-root").children().eq(1).click()
    cy.contains("Tout le monde").should("be.visible")
    cy.contains('[id="reaction"]').should("be.visble").click();
    cy.contains("Réaction mise à jour avec succès").should("be.visible");
    cy.contains('[id="reaction"]').should("be.visible").click();
  });
  it("connect as a student", () => {
    loginAs("STUDENT");
    cy.contains('[class=MuiTypography-root]').should("be.visible")
    cy.get(".MuiTypography-root").children().eq(1).click()
    cy.contains("Tout le monde").should("be.visible")
    cy.contains('[id="reaction"]').should("be.visble").click();
    cy.contains("Réaction mise à jour avec succès").should("be.visible");
    cy.contains('[id="reaction"]').should("be.visible").click();
  }),
  it("connect as a manager", () => {
    loginAs("MANAGER");
    cy.contains("[class=MuiTypography-root]").should("be.visible");
    cy.get(".MuiTypography-root").children().eq(1).click();
    cy.contains("Tout le monde").should("be.visible");
    cy.contains('[id="reaction"]').should("be.visble").click();
    cy.contains("Réaction mise à jour avec succès").should("be.visible");
    cy.contains('[id="reaction"]').should("be.visible").click();
    });
})