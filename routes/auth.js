const router = require("express").Router();
const User = require("../models/Users");
const CryptoJS = require("crypto-js");

//REGISTER
router.post("/register", async (req, res) => {
    const newUser = new User({
      authorName: req.body.authorName,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        //CryptoJS is used to encrypt the password
        req.body.password,
        process.env.PASS_SEC
      ).toString(),
    });
  
    try {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //Login
router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ authorName: req.body.authorName }); //findOne is a method to find the one data which is matched
      console.log(user)
      if(!user){
        return res.status(401).json("Incorrect UserName");
      }
  
      const hashedPassord = CryptoJS.AES.decrypt(
        //to decrypt the password
        user.password,
        process.env.PASS_SEC
      );
      const Originalpassword = hashedPassord.toString(CryptoJS.enc.Utf8);
  
  if(Originalpassword !== req.body.password){
    return res.status(401).json("Incorrect Password");
  }

  const { password, ...others} = user._doc; //here we destructure user so and send only other data except user data to client
  
      res.status(200).json({...others}); // if username and pasword is correct
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;