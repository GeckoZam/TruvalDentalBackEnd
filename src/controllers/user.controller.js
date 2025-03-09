import { User } from "../models/user.model.js";
import  bcrypt  from "bcrypt";

export const signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hash = await bcrypt.hash(password, 13)
        
        const user = {
            username: username,
            email: email,
            password: hash
        }

        await User.create(user)

        res.status(200).json({
            message: "User created successfully."
        })

    } catch (error) {
        res.status(500).json({
            message: "Error while registering the User."
        })
    }
}

export const login = async (req, res) => {

}

export const findAllUsers = async (req, res) => {

}

export const findOneUserById = async (req, res) => {

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