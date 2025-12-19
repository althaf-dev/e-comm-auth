const User = require('../model/user');
const config = require('../config/config');
const { generateToken } = require('../utils/helpers');
const { AuthError } = require('../controllers/errorController');
const { verifyJWT } = require('../utils/helpers');
const s3FileUpload = require('./s3.service');

async function loginUser(loginDto) {
  const user = await User.findUserByName(loginDto.username);
  console.log("user::::::",user)
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

async function signupUser(signupDto,file) {
  const existingUser = await User.findUserByName(signupDto.username);
  if (existingUser !== -1)
    throw new AuthError(AuthError.MESSAGES.USEREXIST, 409);
  signupDto.profile = await s3FileUpload(file);;
  const data = await User.createUser(signupDto);
  return { ...signupDto, profile: signupDto.profile };
}
module.exports = { loginUser, signupUser ,refresh};
