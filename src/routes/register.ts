import express from "express";
import User from '../models/user.model';

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const alreadyExistsUser = await User.findOne( { Email: email }).catch(
    (err) => {
      console.log("Error: ", err);
    }
  );

  if (alreadyExistsUser) {
    return res.status(409).json({ message: "User with email already exists!" });
  }

  const newUser = new User({ Email: email, Password: password });
  //@ts-ignore
  const savedUser = await newUser.save().catch((err) => {
    console.log("Error: ", err);
    res.status(500).json({ error: "Cannot register user at the moment!" });
  });

  if (savedUser) res.json({ message: "Thanks for registering" });
});

export default router