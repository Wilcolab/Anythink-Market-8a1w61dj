const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;
//Hey Copilot, please add the following routes to this file:
//GET /api/comments - Get all comments
//POST /api/comments - Create a new comment
//GET /api/comments/:id - Get a specific comment by ID
//PUT /api/comments/:id - Update a specific comment by ID
//DELETE /api/comments/:id - Delete a specific comment by ID

/**
 * @route   GET /api/comments/
 * @desc    Get all comments
 * @access  Public
 */
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

//add another endpoint for deleting a comment

/**
 * @route   DELETE /api/comments/:id
 * @desc    Delete a comment by its ID
 * @access  Public
 * @param   {string} req.params.id - The unique identifier of the comment to be deleted.
 */
// This is the old callback-style syntax
router.delete("/:id", (req, res) => {
  Comment.findByIdAndDelete(req.params.id, (err, comment) => {
    // Handle potential database errors first
    if (err) {
      return res.status(500).json({ error: "Failed to delete comment" });
    }

    // Handle the case where the comment was not found
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // If successful, send the success message
    res.json({ message: "Comment deleted successfully" });
  });
});