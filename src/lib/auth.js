import bcrypt from 'bcryptjs';

var salt = bcrypt.genSaltSync(10);

export async function hashPassword(password) {
  return await bcrypt.hashSync(password, salt);
}

export async function verifyPassword(oldPassword, currentPassword) {
  return await bcrypt.compareSync(oldPassword, currentPassword);
}
