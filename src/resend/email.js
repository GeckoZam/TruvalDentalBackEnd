import { resend } from "./config.js"
import { verificationTokenEmailTemplate, sendWelcomeEmailTemplate } from "./email-templates.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    try {
        const { data, error } = await resend.emails.send({
            from: "Truval <onboarding@resend.dev>",
            to: [email],
            subject: "Verify your email adress.",
            html: verificationTokenEmailTemplate.replace("{verificationToken}", verificationToken)
        })
    } catch (error) {
        console.log("Error sending the verification email", error)
        throw new Error("Error sending verification email");
    }
}

export const sendWelcomeEmail = async (name, email) => {
    try {
        const { data, error } = await resend.emails.send({
            from: "Truval <onboarding@resend.dev>",
            to: [email],
            subject: "Welcome to Truval Dental.",
            html: sendWelcomeEmailTemplate.replace("{name}", name)
        })
    } catch (error) {
        console.log("Error sending the welcome email", error)
        throw new Error("Error sending welcome email");
    }
}

export const sendPasswordResetEmail = async (email, resetURL) => {
    try {
        const { data, error } = await resend.emails.send({
            from: "Truval <onboarding@resend.dev>",
            to: [email],
            subject: "Reset your password.",
            html: `Click <a href="${resetURL}">here</a> to reset your password`
        })
    } catch (error) {
        console.log("Error sending the reset password email", error)
        throw new Error("Error sending reset password email");
    }
}

export const sendResetSuccessEmail = async (email, resetURL) => {
    try {
        const { data, error } = await resend.emails.send({
            from: "Truval <onboarding@resend.dev>",
            to: [email],
            subject: "Password reset was successful.",
            html: `Your password was reset successfully.`
        })
    } catch (error) {
        console.log("Error sending the reset success password email", error)
        throw new Error("Error sending reset success password email");
    }
}