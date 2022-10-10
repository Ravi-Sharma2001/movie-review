const express = require('express');
const postController = require('../controllers/postControllers');
const router = express.Router();

// @route GET & POST /posts/
router.route("/reg").post(postController.regUser);
router.route("/login").post(postController.login);
router.route("/reset").post(postController.reset);
router.route("/list").post(postController.findPeopleByID)
router.route("/listmovie").post(postController.findMovieDetailsByID)
router.route("/allMovies").get(postController.findAllMovie)

module.exports=router;