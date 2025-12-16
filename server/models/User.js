const mongoose = require('mongoose');

// สร้าง Schema (โครงสร้างข้อมูล)
const UserSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true // ห้ามชื่อซ้ำกัน
    },
    password: { 
        type: String, 
        required: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        default: 'user' // ตั้งค่าเริ่มต้นเป็น user ธรรมดา
    }
}, { timestamps: true }); // เก็บเวลาสร้าง/แก้ไขให้อัตโนมัติ

module.exports = mongoose.model('User', UserSchema);