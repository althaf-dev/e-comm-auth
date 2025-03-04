const express = require("express");
const authController = require("../controllers/authController");
const homeController = require("../controllers/HomeController");
const postController = require("../controllers/postController");
const path = require('path');
const profileUpload = require("../middlewares/fileupload")
const router = express.Router();

router.get("/",  homeController.Home);

router.get("/login", authController.loginPage);
router.get("/signup", authController.signInPage);
router.get("/logout", authController.logout);
router.post("/signup", profileUpload.single('profile'),authController.signup);
/**
 * @openapi
 * '/login':
 *  post:
 *     tags:
 *     - User Controller
 *     summary: Login as a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - username
 *              - password
 *            properties:
 *              username:
 *                type: string
 *                default: johndoe
 *              password:
 *                type: string
 *                default: johnDoe20!@
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.post("/login", authController.login);
router.get("/post", authController.verifyLogin, postController.posts);
router.get("/refresh", authController.refreshAuth);
router.get("/auth", authController.auth);
router.get("/google/callback", authController.authRedirect);
router.get("/profile",authController.profileImage)

module.exports = router;
