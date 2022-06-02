const messages = require('../messages.json')
const { InlineKeyboard } = require('../buttons')

module.exports.commandHandler = (bot) => {
  bot.start(async (ctx) => {
    const {  message, session } = ctx

    delete session.questionNumber
    delete session.answers

    await ctx.scene.leave()

    await ctx.replyWithChatAction('typing')
    setTimeout(async () => {
      await ctx.replyWithHTML(messages.start, InlineKeyboard.start())
    }, 500)

    console.log(`[x] В бот вошел: ${message.chat.first_name} (${message.chat.id} - ${message.chat.username})`)
  })
}