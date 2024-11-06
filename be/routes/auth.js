const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Đăng ký
router.post('/register', async (req, res) => {
    const { username, email, password, fullName, role, gender } = req.body;
    console.log('body, ', req.body);

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(422).json({
                message: 'Lỗi đăng ký',
                data: {
                    email: 'Email đã tồn tại',
                },
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword, fullName, gender, role: role || 'user' });

        await newUser.save();
        const token = jwt.sign({ userId: newUser._id, role: newUser.role }, process.env.JWT_SECRET, {
            expiresIn: '90d',
        });

        // Trả về message, role và token
        res.status(201).json({
            message: 'Đăng ký thành công',
            data: {
                user: {
                    id: newUser._id,
                    role: newUser.role,
                    email: newUser.email,
                    username: newUser.username,
                    fullName: newUser.fullName,
                    gender: newUser.gender,
                    createdAt: newUser.createdAt,
                    updatedAt: newUser.updatedAt,
                },
                token: token,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Đã có lỗi xảy ra' });
    }
});

// Đăng nhập
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('login ', req.body);

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(422).json({
                message: 'Lỗi đăng nhập',
                data: {
                    email: 'Email không tồn tại',
                },
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(422).json({
                message: 'Lỗi đăng nhập',
                data: {
                    password: 'Mật khẩu không đúng',
                },
            });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '90d' });
        res.status(300).json({
            message: 'Đăng nhập thành công',
            data: {
                user: {
                    role: user.role,
                    email: user.email,
                    username: user.username,
                    fullName: user.fullName,
                    gender: user.gender,
                },
                token: token,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Đã có lỗi xảy ra' });
    }
});

module.exports = router;
