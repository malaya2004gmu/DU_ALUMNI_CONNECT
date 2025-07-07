const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploads");
const {verifyToken} = require("../middleware/auth");
const {
  createPost,
  getAllPosts,
  likePost,
  addComment,
  getMyPosts,
  deletePost,
  deleteComment,
} = require("../controllers/commpost.controller");

router.post("/", verifyToken,upload.single('image'), createPost);
router.get("/", getAllPosts);
router.put("/like/:id", verifyToken, likePost);
router.put("/comment/:id",verifyToken,addComment);
router.get("/my-posts",verifyToken,getMyPosts);
router.delete("/post-delete/:id",verifyToken,deletePost);
router.delete("/:postId/comment/:commentId",verifyToken,deleteComment);
module.exports = router;
