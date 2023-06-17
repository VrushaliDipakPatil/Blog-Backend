const port = process.env.PORT || 5000
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const BlogRoute = require("./routes/blog");
const AuthRoute = require("./routes/auth");
const cors = require("cors");
dotenv.config();


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((error) => {
    console.log(error);
  });

  app.use(express.json());
  app.use(cors());
  app.use("/api/blogs", BlogRoute);
  app.use("/api/auth", AuthRoute);


