import { HTTPReceiver, LogLevel } from "@slack/bolt"
import bolt from "../../lib/bolt"
import * as conf from "../../config"

const receiver = new HTTPReceiver({
  signingSecret: conf.config.signingSecret,
  processBeforeResponse: true,
  endpoints: "/api/slack/events",
  logLevel: LogLevel.DEBUG
})

bolt(receiver)

export default receiver.requestListener

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true
  }
}
