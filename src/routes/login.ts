import express from "express";
import User from '../models/user.model';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post("/login", async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body;
    res.header("Access-Control-Allow-Origin", "*");
    const userWithEmail = await User.findOne({ email: email }).catch(
      (err) => {
        console.log("Error: ", err)
      }
    );
  
    if (!userWithEmail)
      return res
        .status(400)
        .json({ message: "Email or password does not match!" });
  
    if (userWithEmail.password !== password)
      return res
        .status(400)
        .json({ message: "Email or password does not match!" });
  
    const jwtToken = jwt.sign(
      //@ts-ignore
      { id: userWithEmail.id, email: userWithEmail.email }, 'sssjdbsjduiehweiuh'
    );
  
    res.json({ message: "Welcome Back!", token: jwtToken });
  
});

export default router