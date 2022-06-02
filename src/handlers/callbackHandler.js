const messages = require('../messages.json')
const { InlineKeyboard } = require('../buttons')

module.exports.callbackHandler = (bot) => {
  bot.on('callback_query', async (ctx) => {
    const { callbackQuery, session } = ctx

    if (callbackQuery.data === 'test_section') {
      console.log(`[x] Тест начал: ${callbackQuery.message.chat.first_name} (${callbackQuery.message.chat.id} - ${callbackQuery.message.chat.username})`)

      await ctx.scene.enter('test')
    }

  })
}