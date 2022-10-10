const express = require('express');
const postController = require('../controllers/postControllers');
const router = express.Router();

// @route GET & POST /posts/
const { checkToken } = require("../auth/token_validation");
router.route("/reg").post(postController.regUser);
router.route("/login").post(postController.login);
router.post("/reset",checkToken,postController.reset);
router.route("/list").post(postController.findPeopleByID)
router.route("/listmovie").post(postController.findMovieDetailsByID)
router.route("/allMovies").get(postController.findAllMovie)

module.exports=router;