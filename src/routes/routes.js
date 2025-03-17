const express = require('express');
const authController = require('../controllers/authController');
const homeController = require('../controllers/HomeController');
const postController = require('../controllers/postController');
const createRateLimiter = require('../middlewares/rateLimiter');
const profileUpload = require('../middlewares/fileupload');
const router = express.Router();
const { asyncHandler } = require('../controllers/errorController');
const CONSTANTS = require('../../src/constants/constants');

const { WINDOW, MAX } = CONSTANTS.API_RATE_LIMIT.LOGIN;
const { signup, login } = authController;
const loginRateLimter = createRateLimiter(WINDOW, MAX);

router.get('/', homeController.Home);
router.get('/login', authController.loginPage);
router.get('/signup', authController.signInPage);
router.get('/logout', authController.logout);
router.post('/signup', profileUpload.single('profile'), asyncHandler(signup));
router.post('/login', loginRateLimter, asyncHandler(login));
router.get('/post', authController.verifyLogin, postController.posts);
router.get('/refresh', asyncHandler(authController.refreshAuth));
router.get('/auth', authController.auth);
router.get('/google/callback', authController.authRedirect);

module.exports = router;
