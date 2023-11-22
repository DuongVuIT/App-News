const router = require("express").Router();
const {
  createPost,
  deletePost,
  updatePost,
  getPost,
  getFeaturedPosts,
  getPosts,
  searchPost,
  getRelatedPost,
  uploadImage,
} = require("../controller/post");
const multer = require("../middleware/multer");
const { postValidator, validate } = require("../middleware/postValidator");
const { parseData } = require("../middleware/index");
router.post("/upload-image", multer.single("image"), uploadImage);

router.post(
  "/create",
  multer.single("thumbnail"),
  parseData,
  postValidator,
  validate,
  createPost
);
router.put(
  "/:postId",
  multer.single("thumbnail"),
  parseData,
  postValidator,
  validate,
  updatePost
);
router.delete("/:postId", deletePost);
router.get("/single/:slug", getPost);
router.get("/featured-posts", getFeaturedPosts);
router.get("/posts", getPosts);
router.get("/search", searchPost);
router.get("/realted-posts/:postId", getRelatedPost);
module.exports = router;
