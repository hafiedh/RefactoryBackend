const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'indonesiacatazas@gmail.com',
        pass: 'catazasindo123'
    }
})

function sendEmail(email, url) {
    const options = {
        from: "'Catazas' <no-reply@gmail.com>",
        to: email,
        subject: "Testingx",
        text: url
    };

    transporter.sendMail(options, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log('berhasil');
        }
    })
}

module.exports = sendEmail;
