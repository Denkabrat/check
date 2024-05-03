const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
        user: 'himnninfo@mail.ru',
        pass: 'kgqxH5WjM8u6pJms0zzr'
    }
});

const mailOptions = {
    from: process.env.EMAIL,
    to: "ggggfetfdfgjjh2@gmail.com",
    subject: "Тест",
    text: "Тест"
}

function SendMail(req, res) {
    transporter.sendMail(mailOptions, (err) => {
        console.log(err)
    })
    res.json("Hello")
}

module.exports = { SendMail }