import httpStatus from "http-status"
import { User } from "../models/userModels.js"
import bcrypt, { hash } from "bcrypt";
import crypto from "crypto";
const login = async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).json({ message: "Please provide username and password" })
    }
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "User Not Found" })
        }
        if (bcrypt.compare(password, user.password)) {
            let token = crypto.randomBytes(20).toString("hex")

            user.token = token;
            await user.save()
            return res.status(httpStatus.OK).json({ token: token })
        }
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong"
        });
    }
}

const register = async (req, res) => {
    const { name, username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username })
        if (existingUser) {
            return res.status(httpStatus.FOUND).json({ message: "User already exists" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            name: name,
            username: username,
            password: hashedPassword
        });
        await newUser.save();
        res.status(httpStatus.CREATED).json({ message: "User Registered" })
    }
    catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong"
        });
    }

}

export { login, register }