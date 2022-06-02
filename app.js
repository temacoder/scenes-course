const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })
const { Telegraf, Scenes } = require('telegraf')
const { Stage } = Scenes
const LocalSession = require('telegraf-session-local')
const express = require('express')

const { commandHandler } = require('./src/handlers/commandHandler')
const { callbackHandler } = require('./src/handlers/callbackHandler')
const { textHandler } = require('./src/handlers/textHandler')

const { Test } = require('./src/controllers/test')

const stage = new Stage([ Test() ])

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.use((new LocalSession({ database: './src/session/db.json', property: 'session' })).middleware())
bot.use(stage.middleware())

commandHandler(bot)
callbackHandler(bot)
textHandler(bot)

bot.telegram.setWebhook(process.env.WEBHOOK)
const app = express()
app.get('/', (req, res) => res.send('RosreestrBot!'))

app.use(bot.webhookCallback('/'))

app.listen(process.env.PORT, () => {
  console.log('Example app listening on port ', process.env.PORT)
})

bot.telegram.getMe().then((res) => console.log(res))
console.log(" [x] Bot running locally, mode: ", process.env.NODE_ENV)
console.log(' [x] Connect to PORT: ', process.env.PORT)

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))