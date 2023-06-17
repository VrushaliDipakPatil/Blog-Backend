const Blog = require("../models/Blogs");

const router = require("express").Router();


//create
router.post("/", async (req, res) => {
    const newBlog = new Blog(req.body);
  
    try {
      const savedBlog = await newBlog.save();
      res.status(200).json(savedBlog);
    } catch (err) {
      res.status(500).json(err);
    }
  });

    //GET ALL
    router.get("/getallblogs", async (req, res) => {
        try {
          const blogs = await Blog.find();
          res.status(200).json(blogs);
        } catch (err) {
          res.status(500).json(err);
        }
      });

       //GET USER Blogs
  router.get("/find/:blogId", async (req, res) => {
    try {
      const blog = await Blog.findOne({ _id: req.params.blogId });
      res.status(200).json(blog);
    } catch (err) {
      res.status(500).json(err);
    }
  });

   //UPDATE
   router.put("/:id", async (req, res) => {
    try {
      const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedBlog);
    } catch (err) {
      res.status(500).json(err);
    }
  });

    //DELETE
    router.delete("/:id", async (req, res) => {
        try {
          await Blog.findByIdAndDelete(req.params.id);
          res.status(200).json("success");
        } catch (err) {
          res.status(500).json(err);
        }
      });

  module.exports = router;