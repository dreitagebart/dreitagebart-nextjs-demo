import {
  App,
  LogLevel,
  Receiver,
  ReceiverMultipleAckError,
  SayFn
} from "@slack/bolt"

const handler = (receiver: Receiver) => {
  const app = new App({
    receiver,
    token: process.env.SLACK_BOT_TOKEN,
    logLevel: LogLevel.DEBUG
  })

  app.message("hello", async ({ message, say, event }) => {
    await say(`Hou hey, welcome there <@${(message as any).user}>!`)
  })

  app.message("button", async ({ message, say }) => {
    await say({
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `Hey there <@${(message as any).user}>!`
          },
          accessory: {
            type: "button",
            text: {
              type: "plain_text",
              text: "Click Me"
            },
            action_id: "button_click"
          }
        }
      ],
      text: `Hey there <@${(message as any).user}>!`
    })
  })

  app.command("/github", async ({ command, ack, say }) => {
    await ack()
    await say(`you entered username ${command.text}`)
  })

  app.command("/chucknorris", async ({ ack, say }) => {
    await ack()

    const response: any = await fetch("https://api.chucknorris.io/jokes/random")

    if (response) {
      say(response.json().value)
    } else {
      say("Sorry I could not tell you a chuck norris joke")
    }
  })

  app.action("button_click", async ({ body, ack, say }) => {
    await ack()
    await say(`<@${body.user.id}> clicked the button`)
  })

  app.event("app_home_opened", async ({ payload, client }) => {
    const userId = payload.user

    try {
      // Call the views.publish method using the WebClient passed to listeners
      const result = await client.views.publish({
        user_id: userId,
        view: {
          // Home tabs must be enabled in your app configuration page under "App Home"
          type: "home",
          blocks: [
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: "*Welcome home, <@" + userId + "> :house:*"
              }
            },
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text:
                  "Learn how home tabs can be more useful and interactive <https://api.slack.com/surfaces/tabs/using|*in the documentation*>."
              }
            },
            {
              type: "divider"
            },
            {
              type: "context",
              elements: [
                {
                  type: "mrkdwn",
                  text:
                    "Psssst this home tab was designed using <https://api.slack.com/tools/block-kit-builder|*Block Kit Builder*>"
                }
              ]
            }
          ]
        }
      })

      console.log(result)
    } catch (error) {
      console.error(error)
    }
  })
}

export default handler
