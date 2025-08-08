import { loginAs } from "../script/utils";

describe("Dashboard test", () => {
  it("Teacher dashboard is visible", () => {
	loginAs("TEACHER");
  });

  it("Manager dashboard is visible", () => {
	loginAs("MANAGER");
  });

  it("Student dashboard is visible", () => {
	loginAs("STUDENT");
  });
});

