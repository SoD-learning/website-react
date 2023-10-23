import bcrypt from "bcrypt";

export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

export async function checkPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}
