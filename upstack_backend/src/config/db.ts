import mongoose from "mongoose";
import colors from "colors";

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.DATABASE_URL);
    const url = `${connection.host}:${connection.port}`;
    console.log(colors.yellow.bold(`MongoDB conectado en : ${url}`));
  } catch (error) {
    // console.log(error.message);
    console.log(colors.bgRed.bold("Error al conectar a MongoDB"));
    process.exit(1);
  }
};
