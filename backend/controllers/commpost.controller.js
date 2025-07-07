const mongoose = require("mongoose");
const Post = require("../models/post");

exports.createPost = async (req, res) => {
  const { title, content, category } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    const post = new Post({
      author: req.user.id,
      title,
      content,
      image,
      category,
    });

    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create post" });
  }
};

//get all posts 
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("author", "name photo")
      .populate("comments.user", "name photo");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};


// Like a post
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (!post.likes.includes(req.user.id)) {
      post.likes.push(req.user.id);
      await post.save();
    }

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Failed to like post" });
  }
};

// Add comment to a post
exports.addComment = async (req, res) => {
  const { text } = req.body;

  if (!text) return res.status(400).json({ message: "Comment cannot be empty" });

  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.comments.push({
      user: req.user.id,
      text,
    });

    await post.save();

    const updatedPost = await Post.findById(req.params.id).populate("comments.user", "name photo");

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: "Failed to add comment" });
  }
};

//getMypost
exports.getMyPosts = async (req, res) => {
  const author=req.user.id;
  try {
    const myPosts = await Post.find({ author })
      .populate("author", "name photo") // populate user info
      .sort({ createdAt: -1 }); // optional: newest first

    res.status(200).json(myPosts);
  } catch (error) {
    console.error("Error fetching user's posts:", error);
    res.status(500).json({ message: "Failed to fetch your posts" });
  }
};

exports.deletePost=async(req,res)=>{

  const id=req.params.id;
  try{
    const del=await Post.findByIdAndDelete(id);
    if(!del) return res.status(404).json({message:"unable to delete bcz post not found"});
    
    return res.status(200).json({message:"post deleted successfully"});
  }
  catch(err)
  {
    console.log("error in server",err);
    return res.status(500).json({message:"server error in deleting post"});
  }
}
//deleete comment

exports.deleteComment = async (req, res) => {
  const { postId, commentId } = req.params;
  const userId = req.user.id; 

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = post.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    // Check if current user is the owner of the comment
    if (comment.user.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized to delete this comment" });
    }

    post.comments = post.comments.filter(
      (c) => c._id.toString() !== commentId
    );
    await post.save();

    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    console.error("Delete comment error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
