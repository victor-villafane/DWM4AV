import nodemailer from "nodemailer"
import jwt from "jsonwebtoken"

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "victor.villafane@davinci.edu.ar",
        pass: "gafzwhwxknpemogu" //Contraseña de aplicacion
    }
})

export function recuperarCuenta(mail){

    const token = jwt.sign({mail}, "RECUPERAR", { expiresIn: "1h" })

    // const resetLink = `http://localhost:5173/reset-password/${token}`
    const resetLink = `https://dwm4av-c7417.web.app/reset-password/${token}`

    const mailOptions = {
        from: "victor.villafane@davinci.edu.ar", //Este es el nuestro,
        to: mail,
        subject: "Recuperacion de contraseña",
        text: "Hace click en el siguiente link: " + resetLink,
        html: `<p>Hace click en el siguiente link: <a href='${resetLink}' >recuperar</a></p>`
    }
    console.log("Intento de enviar el mail")
    console.log(mailOptions)
    transporter.sendMail(mailOptions, (error, info) => {
        if( error ){
            console.log("No se pudo enviar", error)
        }else{
            console.log("Enviado")
        }
    })
}