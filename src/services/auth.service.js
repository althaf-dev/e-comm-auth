const User = require('../model/user');
const config = require('../config/config');
const { generateToken } = require('../helpers/helpers');
const { AuthError } = require('../controllers/errorController');
const { verifyJWT } = require('../helpers/helpers');

async function loginUser(loginDto) {
  const user = await User.findUserByName(loginDto.username);
  if (user === -1) throw new AuthError(AuthError.MESSAGES.USERNOTFOUND, 404);

  if (user.password !== loginDto.password)
    throw new AuthError(AuthError.MESSAGES.INVALIDPASSWORD, 403);

  const accessToken = generateToken(user, 'Access');
  const refreshToken = generateToken(user, 'Refresh');
  return { user, accessToken, refreshToken };
}

async function refresh(refreshToken) {
  const userInfo = verifyJWT(refreshToken);
  if (userInfo) {
    const accessToken = generateToken( userInfo,'Access');
    const user = await User.findUserByName(userInfo.username);
    return { user, accessToken };
  }
}

async function signupUser(signupDto) {
  const existingUser = await User.findUserByName(signupDto.username);
  if (existingUser !== -1)
    throw new AuthError(AuthError.MESSAGES.USEREXIST, 409);

  signupDto.profile = `${config.BASE_URL}/public/profiles/${signupDto.profile}`;
  const data = await User.createUser(signupDto);

  return { ...signupDto, profile: signupDto.profile };
}
module.exports = { loginUser, signupUser ,refresh};
