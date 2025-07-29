import dotenv from "dotenv";
dotenv.config();

export const getComponentIds = (): Record<string, string> => {
  const env = process.env;

  const componentIds: Record<string, string> = {};

  for (const key in env) {
    if (key.endsWith("_COMPONENT_ID")) {
      const baseKey = key.slice(0, -"_COMPONENT_ID".length);
      const formattedKey = baseKey.toLowerCase().replace(/_/g, ".");
      const value = env[key];
      if (value) {
        componentIds[formattedKey] = value;
      }
    }
  }
  return componentIds;
};
