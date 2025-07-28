import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  e2e: {
    //! URL A VERIFIER
    baseUrl: process.env.REACT_APP_BASE_URL,
    experimentalSessionAndOrigin: true,
    setupNodeEvents(on, config) {
      config.env = {
        CYPRESS_STUDENT1_PASSWORD: process.env.CYPRESS_STUDENT1_PASSWORD,
        CYPRESS_TEACHER1_PASSWORD: process.env.CYPRESS_TEACHER1_PASSWORD,
        CYPRESS_MANAGER1_PASSWORD: process.env.CYPRESS_MANAGER1_PASSWORD,
      };
      return config;
    },
  },
});