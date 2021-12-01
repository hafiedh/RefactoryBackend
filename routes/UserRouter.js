const UserController = require('../controllers/UserController');
const authentication = require('../middlewares/authentication');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('INI DI USER ROUTER')
})
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/forgot-password', UserController.forgetPassword)
router.post('/login-google', UserController.googleLogin)
router.post('/update-password', UserController.updatePassword)
router.use(authentication);
module.exports = router;