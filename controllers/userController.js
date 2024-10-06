const User = require('../models/User');
// Get all users 
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ msg: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.updateUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ msg: "User not found" });
        user.name = name || user.name;
        user.email = email || user.email;
        if (password) {
            user.password = password;
        }
        await user.save();
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
// Delete user 
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ msg: "User deleted" });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};








