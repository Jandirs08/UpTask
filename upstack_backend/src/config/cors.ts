import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
  origin: function (origin, callback) {
    console.log("🟡 Origin recibido:", origin);
    console.log("🟢 Whitelist:", process.env.FRONTEND_URL);

    const whitelist = [process.env.FRONTEND_URL];

    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      console.error("❌ Bloqueado por CORS - Origin no permitido:", origin);
      callback(new Error("Error de CORS"));
    }
  },
  credentials: true
};
