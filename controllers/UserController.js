const { User } = require('../models');
const { decode } = require('../helpers/bcryct');
const { sign } = require('../helpers/jwt');
const fetchGoogleUser = require('../helpers/googleAuth');
const generator = require('generate-password');
const sendEmail = require('../helpers/nodemailer');

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
            const newPassword = generator.generate({
                length: 10,
                numbers: true
            })
            console.log(newPassword);
        } catch (error) {
            console.log(error);
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
}

module.exports = UserController