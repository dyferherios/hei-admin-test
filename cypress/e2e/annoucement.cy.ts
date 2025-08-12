import { loginAs } from "../script/utils";
import { loopTab } from "../script/utils";

const list = {
  admin_tab: [
    "Tous",
    "Tout le monde",
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
    
  });

  it("connect as a teacher", () => {
    loginAs("TEACHER");
    loopTab(list.teacher_tab);
    cy.contains('[class=MuiTypography-root]').should("be.visible")
    cy.get(".MuiTypography-root").children().first().click()
  });
  // it("connect as a student", () => {
  // loginAs("STUDENT");
  // }),
  // it("connect as a manager", () => {
  //     loginAs("MANAGER");
    // });
})