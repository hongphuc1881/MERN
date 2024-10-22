const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Kết nối MongoDB thành công');
    })
    .catch((err) => {
        console.log('Lỗi kết nối MongoDB:', err);
    });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server chạy trên cổng ${PORT}`);
});
