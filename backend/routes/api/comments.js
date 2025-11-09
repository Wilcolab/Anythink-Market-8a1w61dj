/**
 * @module routes/api/comments
 * Express router providing comment-related API endpoints.
 *
 * Exports:
 *   - router: Express Router with the following routes mounted.
 *
 * Routes:
 *   @route GET /post/:postId
 *   @description Retrieve all comments associated with a given post.
 *   @param {express.Request} req - The express request object.
 *   @param {string} req.params.postId - Mongo ObjectId string of the post to fetch comments for.
 *   @param {express.Response} res - The express response object.
 *   @returns {Promise<void>}
 *   @response 200 {Array<Object>} Array of Comment documents (JSON) on success.
 *   @response 500 {{ error: string }} Error object when fetching fails.
 *
 *   @route DELETE /:commentId
 *   @description Delete a comment by its id.
 *   @param {express.Request} req - The express request object.
 *   @param {string} req.params.commentId - Mongo ObjectId string of the comment to delete.
 *   @param {express.Response} res - The express response object.
 *   @returns {Promise<void>}
 *   @response 200 {{ message: string }} Success message when deletion succeeds.
 *   @response 500 {{ error: string }} Error object when deletion fails.
 *
 * Notes:
 *   - Relies on a Mongoose model registered as 'Comment' which should expose find and findByIdAndDelete.
 *   - The Comment model is expected to include a `postId` field that references the associated post.
 */
const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;
//Hey GitHub Copilot, add a route to get all comments for a specific post by postId
router.get("/post/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});
// add another endpoint to delete a comment
router.delete("/:commentId", async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.commentId);
    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete comment" });
  }
});