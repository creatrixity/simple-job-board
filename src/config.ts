import dotenv from "dotenv";

dotenv.config();

function getEnvVariable(name: string, fallback: string = ""): string {
  const envVariable = process.env[name];
  const fallbackProvided = fallback.length;

  if (!envVariable && !fallbackProvided) {
    throw new Error(`Environment variable ${name} has not been set.`);
  }

  return envVariable || fallback;
}

const config = {
  server: {
    port: Number(getEnvVariable("PORT")),
  },
  database: {
    host: getEnvVariable("DATABASE_HOST", "localhost"),
  },
};

export default config;
