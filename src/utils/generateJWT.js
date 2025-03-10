import jwt from 'jsonwebtoken'

export const generateJWT = (res, idUser) => {
    const token = jwt.sign({ idUser }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "5d"
    })

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'strict',
        maxAge: 5 * 24 * 60 * 60 * 1000
    })

    return token
}