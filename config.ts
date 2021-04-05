import dotenv from "dotenv"
import getenv from "getenv"

dotenv.config()

export const config = getenv.multi({
  port: "PORT",
  token: "SLACK_BOT_TOKEN",
  signingSecret: "SLACK_SIGNING_SECRET"
})
