const User = require('../model/user');

async function loginUser(loginDto) {
  const user = await User.findUserByName(loginDto.username);
  if (user === -1) throw new AuthError(AuthError.MESSAGES.USERNOTFOUND, 404);

  if (user.password !== loginDto.password)
    throw new AuthError(AuthError.MESSAGES.INVALIDPASSWORD, 403);

  const accessToken = generateToken(user, 'Access');
  const refreshToken = generateToken(user, 'Refresh');
  const imageUrl = 'http://localhost:8000/public/profiles/1741048192309.jpg';

  return { user, accessToken, refreshToken, imageUrl };
}

module.exports = { loginUser };
