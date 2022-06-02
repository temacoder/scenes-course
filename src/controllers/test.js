const { Scenes } = require('telegraf')
const { BaseScene } = Scenes

const messages = require('../messages.json')
const { InlineKeyboard } = require('../buttons')

const reg = /^[0-9]+$/

module.exports.Test = () => {
  const test = new BaseScene('test')

  test.enter(async (ctx) => {
    await ctx.replyWithHTML(messages.startTest, InlineKeyboard.startTest())
  })

  test.on('callback_query', async (ctx) => {
    const { callbackQuery, session } = ctx

    if (callbackQuery.data === 'start_test') {
      console.log(`[x] Тест начал: ${callbackQuery.message.chat.first_name} (${callbackQuery.message.chat.id} - ${callbackQuery.message.chat.username})`)

      session.questionNumber = 1
      session.answers = []

      await ctx.editMessageReplyMarkup()
      await ctx.replyWithHTML(messages.Question1)
    }

    if (callbackQuery.data === 'back') {
      await ctx.scene.leave()
    }
  })

  test.on('text', async (ctx) => {
    const { message, session } = ctx
    const text = message.text
    const splitText = text.split('')

    const validNumber = splitText.map(item => {
      if (parseInt(item) < 4) {
        return true
      } else {
        return false
      }
    })

    const valid = reg.test(text)

    if (session.questionNumber) {
      if (valid && !validNumber.includes(false) && splitText.length < 4) {
        if (session.questionNumber < 21 ) {
          session.questionNumber += 1
          session.answers.push(splitText)
          await ctx.replyWithHTML(messages[`Question${session.questionNumber}`])
        } else {
          session.answers.push(splitText)
          session.answers.flat()
          const resultNumber = session.answers.reduce((acc, rec) => parseInt(acc) + parseInt(rec))
          if (resultNumber < 10) {
            await ctx.replyWithHTML(`<b>Ваш результат:</b>\n\n🥳 У вас отсутствуют дипрессивные симптомы\n\nЕсли хотите пройти тест заново нажмите /start`)
          }
          if (resultNumber > 9 && resultNumber < 16) {
            await ctx.replyWithHTML(`<b>Ваш результат:</b>\n\n🙂 У вас легкая депрессия (субдепрессия)`)
          }
          if (resultNumber > 15 && resultNumber < 20) {
            await ctx.replyWithHTML(`<b>Ваш результат:</b>\n\n😐 У вас умеренная депрессия`)
          }
          if (resultNumber > 19 && resultNumber < 30) {
            await ctx.replyWithHTML(`<b>Ваш результат:</b>\n\n🙁 У вас выраженная депрессия (средней тяжести)`)
          }
          if (resultNumber > 29 && resultNumber < 64) {
            await ctx.replyWithHTML(`<b>Ваш результат:</b>\n\n☹️ У вас тяжёлая депрессия`, InlineKeyboard.back())
          }
          delete session.questionNumber
          delete session.answers
        }

      } else {
        await ctx.replyWithHTML('Отравьте пожалуйста балл соответствующий вашему ответу')
      }
    } else {

    }
  })

  return test
}