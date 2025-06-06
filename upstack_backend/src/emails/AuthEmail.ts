import { transporter } from "../config/nodemailer";

interface IEmail {
  email: string;
  name: string;
  token: string;
}

export class AuthEmail {
  static sendConfirmationEmail = async (user: IEmail) => {
    //enviar elemail
    const info = await transporter.sendMail({
      from: "UpTask <admin@uptask.com>",
      to: user.email,
      subject: "UptTask - Confirma tu cuenta",
      text: "Uptask - Confirma tu cuenta TEXT",
      html: `<p>Hola: ${user.name}, has creado tu cuenta en UpTask, ya casi está todo listo, solo debes confirmar tu cuenta</p>
      <p>Visita el siguiente enlace:</p>
      <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirmar cuenta</a>
      <p>E ingresa el código: <b>${user.token}</b></p>
      <p>Este token expira en 10 minutos</p>
      `
    });
    console.log("Mensaje enviado", info.messageId);
  };
  static sendPasswordResetToken = async (user: IEmail) => {
    //enviar elemail
    const info = await transporter.sendMail({
      from: "UpTask <admin@uptask.com>",
      to: user.email,
      subject: "UptTask - Reestablece tu password",
      text: "Uptask - Reestablece tu password",
      html: `<p>Hola: ${user.name}, has solicitado reestablecer tu password</p>
      <p>Visita el siguiente enlace:</p>
      <a href="${process.env.FRONTEND_URL}/auth/new-password">Reestablecer password</a>
      <p>E ingresa el código: <b>${user.token}</b></p>
      <p>Este token expira en 10 minutos</p>
      `
    });
    console.log("Mensaje enviado", info.messageId);
  };
}
