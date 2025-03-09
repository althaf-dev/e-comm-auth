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
router.post("/login", authController.login);
router.get("/post", authController.verifyLogin, postController.posts);
router.get("/refresh", authController.refreshAuth);
router.get("/auth", authController.auth);
router.get("/google/callback", authController.authRedirect);


module.exports = router;
