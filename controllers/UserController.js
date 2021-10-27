const { User } = require('../models');
const { decode } = require('../helpers/bcryct')
const { sign } = require('../helpers/jwt')

class UserController {
    static async register(req, res, next) {
        try {
            let { email, password, username, fullname, phoneNumber, imgUrl, address } = req.body;
            const result = await User.create({ email, password, username, fullname, phoneNumber, imgUrl, address });
            res.status(201).json(result)
        } catch (err) {
            console.log(err);
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
                throw 'WRONG EMAIL/PASSWORD CUK'
            }
            const isPasswordValid = decode(password, currentUser.password)
            if (isPasswordValid) {
                const token = sign({
                    email,
                    password
                })
                res.status(200).json({
                    accessToken: token,
                    email,
                    username: currentUser.username
                })
            } else {
                throw 'WRONG PASSWORD'
            }
            console.log(currentUser);
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = UserController