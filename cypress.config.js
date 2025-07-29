import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  e2e: {
    baseUrl: 'https://preprod.admin.hei.school',
    experimentalSessionAndOrigin: true,
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