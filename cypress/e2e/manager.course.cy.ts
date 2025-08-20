import { loginAs } from "../script/utils";

// Définition de l'interface Course (structure d'un cours)
interface Course {
    id?: string,
    name: string,
    code: string,
    credits: number,
    level: string,
    total_hours: number,
}

// Génération d'un identifiant unique basé sur l'heure courante
const uniqueId = Date.now().toString().slice(-5); 


// Définition d'un nouveau cours 
const newCourse: Required<Course> = {
  name: `Nouveau Cours ${uniqueId}`,
  code: `Test${uniqueId}`,
  credits: 3,
  level: "L1",
  total_hours: 30,
  id: "",
};

describe("Manager Course ", () => {
  beforeEach(() => {
    // Connexion en tant que MANAGER
    loginAs("MANAGER");

    // Attendre un petit délai pour s'assurer que la connexion est bien prise
    cy.wait(2000);

    // Aller sur la page des cours
    cy.visit(`preprod.admin.hei.school/course`);

    // Attente supplémentaire pour le rendu
    cy.wait(2000);

    // Vérifier que la liste des cours est affichée
    cy.contains("Liste de cours").should("be.visible");
  });

  it("can list all courses", () => {
    // Vérifier qu'il y a au moins une ligne dans le tableau
    cy.get("tbody tr").should("have.length.at.least", 1);

    // Vérifier que la première ligne contient au moins une cellule
    cy.get("tbody tr").first().within(() => {
      cy.get("td").should("exist");
    });
  });

  it("can create new course", () => {
    // Ouvrir le menu des actions
    cy.get('[data-testid="menu-list-action"]').click();

    // Cliquer sur le bouton de création
    cy.get('[data-testid="create-button"]').click();

    // Remplir les champs du formulaire avec les infos de newCourse
    cy.get("#name").type(newCourse.name!);
    cy.get("#code").type(newCourse.code!);
    cy.get("#total_hours").type(newCourse.total_hours!.toString());

    // Sélectionner le niveau
    cy.get("#level").click();
    cy.get("li").contains(newCourse.level!).click();

    cy.get("#credits").type(newCourse.credits!.toString());

    // Enregistrer le cours
    cy.get(".RaToolbar-defaultToolbar > .MuiButtonBase-root").click();

    // Vérifier que le message de succès s'affiche
    cy.contains("Cours créer avec succès").should("be.visible");
  });

  it("can get teacher assigned to course", () => {
    // Ouvrir le détail du premier cours
    cy.get("tbody tr").first().within(() => {
      cy.get("[data-testid='show-button']").click();
    });

    // Vérifier que la section Enseignant est visible
    cy.contains("Enseignant").should("be.visible"); 
  });


});
