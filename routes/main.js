const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const { ensureAuth } = require("../middleware/auth");

//Main Routes 
router.get("/", homeController.getIndex);
router.get("/dashboard", ensureAuth, postsController.getDashboard);
router.get("/feed", ensureAuth, postsController.getFeed);

// Route for the Dashboard
// router.get("/dashboard", ensureAuth, (req, res) => {
//     res.render("dashboard", { user: req.user }); // Pass in the currently logged-in user
// });

//Routes for user login/signup
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;
