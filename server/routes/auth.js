const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // เรียกใช้ User Model ที่เพิ่งทำเสร็จ

// 🟢 API สมัครสมาชิก (Register)
// ลิงก์จะเป็น: POST http://localhost:5000/api/register
router.post('/register', async (req, res) => {
    try {
        const { username, password, name } = req.body;

        // 1. เช็คว่ามี Username นี้หรือยัง
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ msg: "ชื่อผู้ใช้นี้ถูกใช้ไปแล้ว" });
        }

        // 2. เข้ารหัส Password (แปลงเป็นภาษาต่างดาว)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. สร้าง User ใหม่
        const newUser = new User({
            username,
            password: hashedPassword,
            name
        });

        // 4. บันทึกลง Database
        await newUser.save();

        res.status(201).json({ msg: "สมัครสมาชิกสำเร็จเรียบร้อย!" });

    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;