const express = require('express');
const postController = require('../controllers/postControllers');
const router = express.Router();

// @route GET & POST /posts/
router.route("/").get(postController.getAllPosts).post(postController.createNewPost);
router.route("/:id").get(postController.getPostById);
router.route("/reg").post(postController.regUser);
router.route("/login").post(postController.login);
router.route("/reset").post(postController.reset);

module.exports=router;