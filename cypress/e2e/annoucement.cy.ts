import { loginAs } from "../script/utils";

describe("annoucement test", () => {
    it("connect as an admin", () => {
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
