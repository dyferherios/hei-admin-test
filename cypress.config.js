import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  defaultCommandTimeout: 25_000,
  e2e: {
    baseUrl: 'https://preprod.admin.hei.school',
    experimentalSessionAndOrigin: true,
	pageLoadTimeout:100000,
  },
   retries: {
    runMode: 4,
    openMode: 0,
  },
  env:{
        CYPRESS_STUDENT1_PASSWORD: process.env.CYPRESS_STUDENT1_PASSWORD,
        CYPRESS_TEACHER1_PASSWORD: process.env.CYPRESS_TEACHER1_PASSWORD,
        CYPRESS_MANAGER1_PASSWORD: process.env.CYPRESS_MANAGER1_PASSWORD,
        STATUS_PAGE_ID: process.env.STATUS_PAGE_ID,
        API_KEY: process.env.API_KEY,
        AUTHENTIFICATION_COMPONENT_ID: process.env.AUTHENTIFICATION_COMPONENT_ID,
        ATTENDANCE_COMPONENT_ID: process.env.ATTENDANCE_COMPONENT_ID,
   },
});
