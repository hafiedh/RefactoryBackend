const { User } = require('../models');
const { decode } = require('../helpers/bcryct');
const { sign } = require('../helpers/jwt');
const fetchGoogleUser = require('../helpers/googleAuth');
const generator = require('generate-password');
const { sendEmail, sendEmailForgotPassword } = require('../helpers/nodemailer');
const { Op } = require("sequelize");

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
            const { emailOrUsername, password } = req.body
            const currentUser = await User.findOne({
                where: {
                    [Op.or]: [
                        {
                            email: {
                                [Op.eq]: emailOrUsername
                            }
                        },
                        {
                            username: {
                                [Op.eq]: emailOrUsername
                            }
                        }
                    ]
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
                    emailOrUsername,
                    password
                })
                res.status(200).json({
                    id: currentUser.id,
                    access_token,
                    email: emailOrUsername,
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
            const newPassword = generator.generate({
                length: 10,
                numbers: true
            })
            await User.update(
                { password: newPassword },
                {
                    where: { email }
                }
            )
            sendEmailForgotPassword("arsyadrama7@gmail.com", newPassword)
            res.status(201).json({
                status: "ok",
                message: "Email has been sent. Check your email"
            })
        } catch (error) {
            next(error)
        }
    }

    static async verify(req, res, next) {
        try {

        } catch (err) {
            next(err)
        }
    }

    static async googleLogin(req, res, next) {
        try {
            let idToken = req.body.idToken;
            let payload = await fetchGoogleUser(idToken);
            let { email, name } = payload;

            let user = await User.findOrCreate({
                where: { email },
                defaults: {
                    username: name,
                    email,
                    password: "12345"
                }
            })
            let access_token = sign({ id: user[0].id, email: user[0].email });
            req.headers.access_token = access_token;
            res.status(200).json({
                access_token,
                username: user[0].username,
                userId: user[0].id
            });
        } catch (err) {
            next(err);
        }
    }

    static async updateProfile(req, res, next) {
        try {
            const { username, fullname, phoneNumber, imgUrl, address } = req.body;
            const { id, email } = req.user;

            const currentUser = await User.findOne({
                where: { id, email },
                attributes: ['username', 'fullname', 'phoneNumber', 'imgUrl', 'address']
            })

            const isDataChanged = JSON.stringify(currentUser) === JSON.stringify({ username, fullname, phoneNumber, imgUrl, address })
            if (isDataChanged) {
                throw {
                    name: 'update',
                    message: 'No Changes'
                }
            }

            const updatedUser = await User.update({ username, fullname, phoneNumber, imgUrl, address }, {
                where: { id, email },
                returning: true
            })

            res.status(200).json({ status: 200, message: 'Your profile is updated' })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController