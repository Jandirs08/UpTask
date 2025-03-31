import bcrypt from "bcrypt";
export const hashPassword = async (password: string) => {
  //Hash Password
  const salt = await bcrypt.genSalt(10); //salt es un valor aleatorio y único antes de aplicar bcrypt
  return await bcrypt.hash(password, salt);
};
