
import { Session, Store } from "express-session";
import User from "../models/users.js";
import bcrypt, { hash, compare } from "bcrypt";

var userid = "";

export const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    var [user] = await User.find({ username: username });
    if (!user) {
      const hash_pass = await bcrypt.hash(password, 13);
      user = await User.create({
        username: username,
        email: email,
        password: hash_pass,
      });
      req.session.username = username;
      res.send("User Registered");
    } else {
      res.send("Username already in use");
    }
  } catch (error) {
    res.send(error.message);
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const [user] = await User.find({ username: username });
    if (user) {
      userid = username;
      const isMatch = await bcrypt.compare(password, user.password);
      req.session.username = username;
      return res.send(isMatch);
    } else {
      res.send("Invalid username");
    }
  } catch (error) {
    res.status(500);
  }
};

export const userHome = (req, res) => {
  // console.log('userHome '+req.session.username);
  return res.send(req.session.username);
};

export const registerUser = (req,res) => {
  if(req.session.id){
    res.send(req.session.username);
  }else{
    console.log(req.session.uesrname);
  }
}

export const logoutUser = (req, res) => {
  req.session.username = null;
  return res.send(req.session.username);
}

export const userInfo = async (req, res) => {
  let [userInfo] = await User.find({username: req.session.username});
  res.send(userInfo); 
}