const { User } = require('../models');
const { decode } = require('../helpers/bcryct')
const { sign } = require('../helpers/jwt')
const sendEmail = require('../helpers/nodemailer')

class UserController {
    static async register(req, res, next) {
        try {
            let { email, password, username, fullname, phoneNumber, imgUrl, address } = req.body;
            const result = await User.create({ email, password, username, fullname, phoneNumber, imgUrl, address });
            res.status(201).json({
                username: result.username,
                email: result.email,
                id: result.id
            })
        } catch (err) {
            next(err)
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            const currentUser = await User.findOne({
                where: {
                    email
                }
            })
            if (!currentUser) {
                throw {
                    name: 'authentication',
                    message: 'Wrong email/password'
                }
            }
            const isPasswordValid = decode(password, currentUser.password)
            if (isPasswordValid) {
                const access_token = sign({
                    email,
                    password
                })
                sendEmail("hafiedhmuh@gmail.com", "MASUKAN URL KE SINI")
                res.status(200).json({
                    id: currentUser.id,
                    access_token,
                    email,
                    username: currentUser.username
                })
            } else {
                throw {
                    name: 'authentication',
                    message: 'Wrong email/password'
                }
            }
        } catch (err) {
            next(err)
        }
    }

    static async forgetPassword(req, res, next) {
        try {
            const { email } = req.body
            const doesEmailExist = await User.findOne({
                where: {
                    email
                }
            })
            if (!doesEmailExist) {
                throw {
                    name: 'authentication',
                    message: 'Email doesnt exist'
                }
            }

            sendEmail(email, "MASUKAN URL DISINI")
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController