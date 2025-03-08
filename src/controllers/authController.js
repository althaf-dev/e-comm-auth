const {
  generateToken,
  getRedirectURL,
  setAuthCookies,
  handleSuccessResponse,
  verifyJWT,
} = require('../helpers/helpers');
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { AuthError } = require('./errorController');
require('dotenv').config();
require('../services/Oauth');
const authServices = require('../services/auth.service');
const LoginRequestDTO = require('../dtos/loginRequest.dto');
const LoginResponseDTO = require('../dtos/loginResponse.dto');
const SignupRequestDTO = require('../dtos/singupRequest.dto');
const SignupResponseDTO = require('../dtos/signupResponse.dto');

async function signup(req, res, next) {
  try {
    
    const signupDto = new SignupRequestDTO(req.body,req.file.filename);
    console.log("signDTO",signupDto)
    const redirectTo = getRedirectURL(req);
    if (!signupDto.isValid())
      throw new AuthError(AuthError.MESSAGES.INVALIDCREDENTIALS, 400);
  
    const data = await authServices.signupUser(signupDto)
    const responseDto = new SignupResponseDTO(data);
    handleSuccessResponse(req, res, responseDto, redirectTo);

  } catch (e) {
    console.log('Signup Error:', e.message);
    next(e);
  }
}

function loginPage(req, res) {
  res.render('login', { login: true, redirect: req.query.redirect });
}

function signInPage() {
  res.render('login', { login: false });
}

async function login(req, res, next) {
  try {
    const loginDto = new LoginRequestDTO(req.body);
    const redirectTo = getRedirectURL(req);

    if (!loginDto.isValid()){
      throw new AuthError(AuthError.MESSAGES.INVALIDCREDENTIALS, 400);
    }
    
    const { user, accessToken, refreshToken, profile} = await authServices.loginUser();
    setAuthCookies(res, accessToken, refreshToken);
    const responseDto = new LoginResponseDTO(accessToken, user, profile);
    
    handleSuccessResponse(req, res, responseDto, redirectTo);
  } catch (e) {
    console.log('Login Error:', e.message);
    next(e);
  }
}

function logout(req, res) {
  res.clearCookie('accessToken', { httpOnly: true });
  res.clearCookie('refreshToken', { httpOnly: true });
  res.status(200).end();
}

function verifyLogin(req, res, next) {
  const { accessToken: token } = req.cookies;
  try {
    if (!token && req.originalUrl === '/') {
      req.userName = 'guest';
      next();
      return;
    }
    if (!token && req.originalUrl !== '/')
      throw new AuthError(AuthError.MESSAGES.AUTHFAILED, 401);

    const decoded = jwt.verify(token, process.env.ACCESSTOKEN);
    req.userId = decoded.userId;
    next();
  } catch (e) {
    next(e);
  }
}

function refreshAuth(req, res) {
  const { refreshToken } = req.cookies;
  const { accept } = req.headers;
  const { redirect } = req.query;
  try {
    const user = verifyJWT(refreshToken);
    if (user) {
      const newAccesToken = generateToken(user, 'Access');
      setAuthCookies(res, newAccesToken, refreshToken);
      handleLoginSuccess(req, res, newAccesToken, user, redirect);
    }
  } catch (e) {
    if (accept === 'application/json') {
      throw new AuthError(AuthError.MESSAGES.AUTHFAILED, 401);
    } else {
      res.redirect(`/login?redirect=${redirect}`);
    }
  }
}

function auth(req, res, next) {
  console.log('google auth called');
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  })(req, res, next);
}

function authRedirect(req, res, next) {
  console.log('called auth re direct');
  passport.authenticate(
    'google',
    (err, user) => {
      if (err || !user) {
        return res.redirect('/login'); // Handle failure manually
      }
      console.log('user', user.displayName);
      // Success: Generate JWT and set in cookie
      const token = jwt.sign(
        { userId: user.id, userName: user.displayName },
        process.env.ACCESSTOKEN,
        {
          expiresIn: '1h',
        }
      );

      res.cookie('accessToken', token, {
        httpOnly: true,
        maxAge: 60000,
      });

      return res.redirect('/'); // Redirect on success
    },
    {
      successRedirect: '/',
      failureRedirect: '/login',
    }
  )(req, res, next);
}

function profileImage(req, res, next) {
  res.status(200).send({
    imageUrl: 'http://localhost:8000/public/profiles/1741048192309.jpg',
  });
}

module.exports = {
  signup,
  login,
  loginPage,
  signInPage,
  verifyLogin,
  logout,
  refreshAuth,
  auth,
  authRedirect,
  profileImage,
};
