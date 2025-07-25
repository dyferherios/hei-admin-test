import { loginAs } from "../script/utils";

describe('template spec', () => {
  it('connect as a teacher', () => {
    loginAs("TEACHER")
  }),
  it("connect as a student", () => {
    loginAs("STUDENT");
  }),
  it("connect as a manager", () => {
    loginAs("MANAGER");
  });
})