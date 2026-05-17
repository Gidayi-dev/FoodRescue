import dotenv, { configDotenv } from "dotenv"

configDotenv()

export const env = {
    port: process.env.PORT,
    databaseurl: process.env.DATABASE_URL,
    jwtsecret: process.env.JWT_SECRET,
}