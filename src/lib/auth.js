import bcrypt from 'bcryptjs';

var salt = bcrypt.genSaltSync(10);

export async function hashPassword(password) {
  return await bcrypt.hashSync(password, salt);
}

export async function verifyPassword(password, hashPwd) {
  return await bcrypt.compareSync(password, hashPwd);
}
