const bcryptjs = require('bcryptjs')

const gravatar = require('gravatar')

const jwt = require('jsonwebtoken')

const { User } = require('../models/user')

const { ctrlWrapper } = require('../utils')

const { HttpError } = require('../helpers')

const { SECRET_KEY } = process.env

const register = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user) {
        throw HttpError(409, 'Email in use')
    }

    const hashPassword = await bcryptjs.hash(password, 10)

    const avatarURL = gravatar.url(email)
    
    const newUser = await User.create({ ...req.body, password: hashPassword, avatar: avatarURL })
    
    res.status(201).json({
        user: {
            username: newUser.username,
            email: newUser.email,
        }
    }) 
}

const login = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        throw HttpError(401, "Email or password invalid")
    }

    const passworCompare = await bcryptjs.compare(password, user.password)
    if (!passworCompare) {
        throw HttpError(401, "Email or password invalid")
    }

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' })
    await User.findByIdAndUpdate(user._id, { token })
    
    res.json({
        user: {
            token,
            email: user.email,
        }
    })
}

const getCurrent = async (req, res) => {
    const {email, username} = req.user
    res.json({
        email,
        username,
    })
}

const logout = async (req, res) => {
    const { _id } = req.user
    await User.findByIdAndUpdate(_id, { token: '' }) 
    
    res.status(204).json({
        message: 'Logout success'
    })
}

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
}