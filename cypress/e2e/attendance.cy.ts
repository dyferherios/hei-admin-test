import { loginAs } from "../script/utils";

describe('attendance test', () => {
  it('connect as a teacher and ', () => {
    loginAs("TEACHER");
	cy.get('[data-testid="event-menu"]').should('be.visible').click();
	cy.get('[tabindex="-1"]').should('be.visible').click();
  })
});
