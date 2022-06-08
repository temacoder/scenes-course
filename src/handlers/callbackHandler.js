const messages = require('../messages.json')
const { InlineKeyboard } = require('../buttons')

module.exports.callbackHandler = (bot) => {
  bot.on('callback_query', async (ctx) => {
    const { callbackQuery, session } = ctx


  })
}