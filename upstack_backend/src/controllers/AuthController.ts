import type { Request, Response } from "express";

import User from "../models/User";
import { hashPassword } from "../utils/auth";
import Token from "../models/Token";
import { generateToken } from "../utils/token";
import { AuthEmail } from "../emails/AuthEmail";

export class AuthController {
  static createACcount = async (req: Request, res: Response) => {
    try {
      const { password, email } = req.body;

      //prevenir duplicados
      const userExists = await User.findOne({ email });
      if (userExists) {
        const error = new Error("El usuario ya está registrado");
        res.status(409).json({ error: error.message });
        return;
      }
      //Crea un usuario
      const user = new User(req.body);
      //Hash Password
      user.password = await hashPassword(password);

      //Generar el token
      const token = new Token();
      token.token = generateToken();
      token.user = user.id;

      //Enviar email
      AuthEmail.sendConfirmationEmail({
        email: user.email,
        name: user.email,
        token: token.token
      });

      await Promise.allSettled([user.save(), token.save()]);
      res.send("Cuenta creada, revisa tu email para confirmarla");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static confirmAccount = async (req: Request, res: Response) => {
    try {
      const { token } = req.body;
      const tokenExists = await Token.findOne({ token });
      if (!tokenExists) {
        const error = new Error("Token no válido");
        res.status(401).json({ error: error.message });
        return;
      }
      const user = await User.findById(tokenExists.user);
      user.confirmed = true;
      await Promise.allSettled([user.save(), tokenExists.deleteOne()]);
      res.send("Cuenta confirmada correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };
}
