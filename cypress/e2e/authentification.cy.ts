import { loginAs } from "../script/utils";

describe("authentification test", () => {
	it("connect as a admin", () => {
		loginAs("ADMIN");
	}),
	it("connect as a teacher", () => {
		loginAs("TEACHER");
	}),
	it("connect as a student", () => {
	loginAs("STUDENT");
	}),
	it("connect as a manager", () => {
		loginAs("MANAGER");
	});
});
