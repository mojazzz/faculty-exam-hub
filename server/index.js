const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// สร้าง Route แรกไว้ทดสอบ
app.get('/', (req, res) => {
    res.send('Hello from Exam Hub API');
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));