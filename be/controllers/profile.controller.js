const User = require('../models/User');

exports.profile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password'); // Loại bỏ mật khẩu khỏi kết quả trả về
        if (!user) {
            return res.status(404).json({ message: 'Người dùng không tồn tại' });
        }
        res.status(200).json({ data: user });
    } catch (error) {
        res.status(500).json({ message: 'Đã có lỗi xảy ra', error });
    }
};

exports.profile = async (req, res) => {
    try {
        const updates = req.body;
        const updatedUser = await User.findByIdAndUpdate(req.userId, updates, { new: true }).select('-password');
        if (!updatedUser) {
            return res.status(404).json({ message: 'Người dùng không tồn tại' });
        }
        res.status(200).json({ message: 'Cập nhật thông tin thành công', data: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Đã có lỗi xảy ra', error });
    }
};
