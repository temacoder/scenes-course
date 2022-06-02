const messages = require('../messages.json')

const reg = /^[0-9]+$/

module.exports.textHandler = (bot) => {
  bot.on('text', async (ctx) => {
    const { message, session } = ctx
    const text = message.text



  })
}
