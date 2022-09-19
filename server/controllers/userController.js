const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User, Basket} = require('../models/models')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'});
}

class UserController {
    async registration(req, res, next) {
        try {
            const {email, password, role} = req.body;
            if (!email && !password) {
                return next(ApiError.badRequest('Некорректный имейл или пароль'))
            }
            //проверяем существует этот пользователь или нет
            const candidate = await User.findOne({where: {email}});
            if (candidate) {
                return next(ApiError.badRequest('Уже кто-то такой существует'))
            }
            const hashPassword = await bcrypt.hash(password, 5);
            const user = await User.create({email, role, password: hashPassword});
            const basket = await Basket.create({userId: user.id});
            const token = generateJwt(user.id, user.email, user.role)

            return res.json({token})

        } catch (e) {
            console.log(e)
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const user = await User.findOne({where: {email}});
            if(!user) {
                return next(ApiError.internal('Sorry, вы не найдены'))
            }
            const isPassValid = bcrypt.compareSync(password, user.password);
            if(!isPassValid) {
                return next(ApiError.internal('Sorry,  неверный пароль'))
            }
            const token = generateJwt(user.id, user.email, user.role)
            return res.json({token})
        } catch (e) {
            console.log(e)
        }
    }

    async check(req, res) {
        try {
            const token = generateJwt(req.user.id, req.user.email, req.user.role);
            return res.json({token})
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new UserController()