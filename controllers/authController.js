const jwt = require('jsonwebtoken');
const User = require('../models/User');
// Register a new user
exports.register = async (req, res) => {
    const { username, password, name, email } = req.body;
    try {
        let user = await User.findOne({ username });
        if (user) return res.status(400).json({ msg: "User already exists" });
        user = new User({ username, password, name, email });
        await user.save();
        const payload = { userId: user.id, role: user.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
// Login user
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        let user = await User.findOne({ username });
        if (!user) return res.status(400).json({ msg: "Invalid credentials" });
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
        const payload = { userId: user.id, role: user.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};