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
            console.log('Success');
        }
    })
}

function sendEmailForgotPassword(email, newPassword) {
    const options = {
        from: "'Catazas' <no-reply@gmail.com>",
        to: email,
        subject: "Reset Password",
        text: "Your new password is" + newPassword
    };
    transporter.sendMail(options, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Success');
        }
    })
}
module.exports = { sendEmail, sendEmailForgotPassword };
