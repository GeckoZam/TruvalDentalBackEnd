import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateJWT } from "../utils/generateJWT.js";
import { generateVerificationToken } from "../utils/generateVerificationToken.js";
import { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail } from "../resend/email.js";
import { Op } from 'sequelize';
import crypto from 'crypto';

export const signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const hash = await bcrypt.hash(password, 13)
        const verificationToken = generateVerificationToken()



        const user = {
            username: username,
            email: email,
            password: hash,
            verificationToken: verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 //24 hours
        }

        await User.create(user)

        generateJWT(res, user.idUser);

        await sendVerificationEmail(user.email, verificationToken)

        res.status(200).json({
            message: "User created successfully.",
            user: {
                ...user._doc,
                password: undefined
            }
        })

    } catch (error) {
        res.status(500).json({
            message: "Error while registering the User."
        })
    }
}

export const verifyEmail = async (req, res) => {
    const { code } = req.body;
    try {
        const user = await User.findOne({
            where: {
                verificationToken: code,
                verificationTokenExpiresAt: { [Op.gt]: new Date() },
                isVerified: false
            }
        })
        console.log("Verification code received:", code);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired verification code."
            })
        }

        user.isVerified = true;
        user.verificationToken = null;
        user.verificationTokenExpiresAt = null;

        await user.save()

        await sendWelcomeEmail(user.username, user.email);

        res.status(200).json({
            success: true,
            message: "Email verified successfully."
        })

    } catch (error) {
        console.log("Error verifying email", error)
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log("Searching for user with email:", email); // Log para depurar

        const user = await User.findOne({
            where: {
                email
            }
        })

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required."
            });
        }

        console.log("User found:", user); // ¿Qué devuelve findOne?

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User does not exist."
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Wrong password. Try again."
            })
        }

        const isVerified = user.isVerified;

        if (!isVerified) {
            return res.status(401).json({
                success: false,
                message: "Email is not verified."
            })
        }

        generateJWT(res, user.idUser);

        res.status(200).json({
            success: true,
            message: "Login successful."
        })

    } catch (error) {
        console.log("Error loging in", error)
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        success: true,
        message: "Logged out successfully."
    })
}

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({
            where: {
                email
            }
        })

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required."
            });
        }

        const resetPasswordToken = crypto.randomBytes(32).toString("hex")
        const resetPasswordExpiresAt = Date.now() + 1 * 60 * 60 * 1000; //1 hour until it expires

        user.resetPasswordToken = resetPasswordToken
        user.resetPasswordExpiresAt = resetPasswordExpiresAt

        await user.save()
        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`)

        res.status(200).json({
            success: true,
            message: "Password reset mail sent."
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({
            where: {
                resetPasswordToken: token,
                resetPasswordExpiresAt: { [Op.gt]: new Date() }
            }
        })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired token"
            })
        }

        const hash = await bcrypt.hash(password, 13);
        user.password = hash;
        user.resetPasswordToken = null;
        user.resetPasswordExpiresAt = null;

        await user.save();
        await sendResetSuccessEmail(user.email, user.username)

        res.status(200).json({
            success: true,
            message: "Password reset successfully."
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error reseting password."
        })
    }
}

export const updateUser = async (req, res) => {
    try {
        const { idUser } = req.params;
        const { username, email, password } = req.body;

        const user = await User.findByPk(idUser)

        if (!user) {
            res.status(404).json({
                message: "User not found."
            })
            return;
        } else {
            user.username = username
            user.email = email
            user.password = password

            await user.save()

            res.status(200).json({
                message: "User updated successfully."
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Error while updating the user."
        })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { idUser } = req.params;

        await User.destroy({
            where: {
                idUser: idUser
            }
        })

        res.status(204).json({
            message: "User deleted successfully."
        })
    } catch (error) {
        res.status(500).json({
            message: "Error while deleting the user."
        })
    }
}