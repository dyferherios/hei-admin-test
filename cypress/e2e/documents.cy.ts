import { loginAs } from "../script/utils";

describe("Manager Documents Tests", () => {
  it("Manager can create, rename, and delete a folder", () => {
    loginAs("MANAGER");
    cy.contains("Documents").click();

    cy.visit("https://owncloud.hei.school/s/zjhI8niSFb644RJ");

    cy.origin("https://owncloud.hei.school", () => {
      const selectors = {
        newButton: 'a.button.new',
        createButton: 'form.filenameform .create',
        actionMenu: '.action-menu',
        filenameInput: 'input.filename',
      };

      const createFolder = (folderName = "New folder") => {
        cy.get(selectors.newButton).click();
        cy.contains("Folder").click();
        cy.get(selectors.createButton).should("be.visible").click();
        cy.contains(folderName).should("exist");
      };

      const renameFolder = (oldName, newName) => {
        cy.contains(oldName)
          .closest("a.name")
          .find(selectors.actionMenu)
          .click();

        cy.contains("Rename").click();
        cy.get(selectors.filenameInput)
          .should("be.visible")
          .clear()
          .type(newName + "{enter}");

        cy.contains(newName).should("exist");
      };

      const deleteFolder = (folderName) => {
        cy.contains(folderName)
          .closest("a.name")
          .find(selectors.actionMenu)
          .click();
        cy.get('.popovermenu.menu')
          .contains('Delete')
          .should('be.visible')
          .click();
        cy.contains(folderName).should("not.exist");
      };

      const initialFolder = "New folder";
      const renamedFolder = `My Renamed Folder ${Date.now()}`;

      createFolder(initialFolder);
      renameFolder(initialFolder, renamedFolder);
      deleteFolder(renamedFolder);
    });
  });
});
