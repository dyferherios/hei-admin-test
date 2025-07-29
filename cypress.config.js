import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  e2e: {
    experimentalSessionAndOrigin: true,
  },
  env:{
        CYPRESS_STUDENT1_PASSWORD: process.env.CYPRESS_STUDENT1_PASSWORD,
        CYPRESS_TEACHER1_PASSWORD: process.env.CYPRESS_TEACHER1_PASSWORD,
        CYPRESS_MANAGER1_PASSWORD: process.env.CYPRESS_MANAGER1_PASSWORD,
   },
});