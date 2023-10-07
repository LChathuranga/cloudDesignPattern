import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && await user.matchPasswords(password)) {
        const generatedToken = generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generatedToken
        });
    }
    else {
        res.status(401).json({
            message: "Not Authenticated"
        });
    }
}

export const register = async (req, res) => {
    const { name, email, password, phone } = req.body;

    const isUserExit = await User.findOne({ email });

    if (isUserExit) {
        res.status(400).json({
            message: "User Already Exit"
        });
    }

    const user = await User.create({
        name,
        email,
        password,
        phone
    });

    if (user) {
        const generatedToken = generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generatedToken
        });
    }
    else {
        res.status(500).json({ message: "Invalid User Data" });
    }
}