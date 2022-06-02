const Telegraf = require('telegraf')
const { Markup } = Telegraf

module.exports.InlineKeyboard = {
  start: () => {
    return Markup.inlineKeyboard([
      [ Markup.button.callback('🙋🏻‍♂️ Пройти тест Бека', 'test_section') ],
      [ Markup.button.callback('✍️ Записаться на прием', 'appointment') ]
    ])
  },
  startTest: () => {
    return Markup.inlineKeyboard([
      [Markup.button.callback('Начать тест', 'start_test')]
    ])
  },
  back: () => {
    return Markup.inlineKeyboard([
      [Markup.button.callback('⬅️ Назад', 'back')]
    ])
  }
}