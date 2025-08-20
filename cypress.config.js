import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  defaultCommandTimeout: 25000,
  e2e: {
    experimentalSessionAndOrigin: true,
	pageLoadTimeout:100000,
  },
   retries: {
    runMode: 0,
    openMode: 0,
  },
  env:{
        CYPRESS_STUDENT1_PASSWORD: process.env.CYPRESS_STUDENT1_PASSWORD,
        CYPRESS_TEACHER1_PASSWORD: process.env.CYPRESS_TEACHER1_PASSWORD,
        CYPRESS_MANAGER1_PASSWORD: process.env.CYPRESS_MANAGER1_PASSWORD,
        CYPRESS_ADMIN1_PASSWORD: process.env.CYPRESS_ADMIN1_PASSWORD,
        CYPRESS_BASE_URL: process.env.CYPRESS_BASE_URL,
   },
});
