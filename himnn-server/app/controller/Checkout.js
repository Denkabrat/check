const TelegramBot = require('node-telegram-bot-api');

async function CreateOrder(req, _) {
    const data = req.body

    const url = data.data.items.map((item, index) => (`
    *${index + 1}:* ${process.env.CLIENT_URL}/item/${item.id}
    *Количество:* ${item.count}
    `))
    console.log(data.data.items)
    let message = ``

    if (data.data.state) {
        message = `*Новая заявка с сайта:*
        *Ф.И.О.:* ${data.data.fullname}
        *Email:* ${data.data.email}
        *Номер телефона:* ${data.data.phone}
        *Комментарий к заказу:* ${data.data.comment}
        
        *Товары:* ${url}`
    } else {
        message = `*Новая заявка с сайта:*
        *Название компании:* ${data.data.companyName}
        *Юридический адрес:* ${data.data.address}
        *ИНН:* ${data.data.INN}
        *КПП:* ${data.data.KPP}
        *БИК:* ${data.data.BIK}
        *Расчетный счет:* ${data.data.checkingAccount}
        *Банк для р/с:* ${data.data.bank}
        *Город банка для р/с:* ${data.data.city}
        *Корреспондентский счет:* ${data.data.corespondentAccount}
        *Контактное лицо:* ${data.data.contactPerson}
        *E-mail:* ${data.data.email}
        *Телефон:* ${data.data.phone}
        *Комментарий к заказу:* ${data.data.comment}
        
        *Товары:* ${url}`
    }

    const bot = new TelegramBot("6889013345:AAHMIZZJNqZdfnFwfOvWq2K1fk1_tzFC5OQ");
    await bot.sendMessage(-1002102733350, message, { parse_mode: "Markdown" })
}

async function Call(req, _) {
    const data = req.body

    let message = `*Запрос звонка с сайта:*
    *Ф.И.О.:* ${data.data.fullName}
    *Email:* ${data.data.email}
    *Номер телефона:* ${data.data.tel}`

    const bot = new TelegramBot("6889013345:AAHMIZZJNqZdfnFwfOvWq2K1fk1_tzFC5OQ");
    await bot.sendMessage(-1002102733350, message, { parse_mode: "Markdown" })
}

module.exports = { CreateOrder, Call }