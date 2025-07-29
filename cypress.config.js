import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  e2e: {
    experimentalSessionAndOrigin: true,
    setupNodeEvents(on, config) {
      config.env = {
        CYPRESS_STUDENT1_PASSWORD: process.env.CYPRESS_STUDENT1_PASSWORD,
        CYPRESS_TEACHER1_PASSWORD: process.env.CYPRESS_TEACHER1_PASSWORD,
        CYPRESS_MANAGER1_PASSWORD: process.env.REACT_APP_TEST_MANAGER1_PASSWORD,
        CYPRESS_BASE_URL: process.env.REACT_APP_BASE_URL,
      };
      return config;
    },
  },
});