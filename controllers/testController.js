import TestResult from "../models/testResults.js";
import User from "../models/users.js";

export const addResult = async (req, res) => {
  console.log(req.body);
  if (req.body.wpm !== 0 && req.body.practiceKeys !== []) {
    var user = await User.findOne({ username: req.session.username });
    const result = await TestResult.create({
      userId: user.username,
      duration: req.body.time,
      wpm: req.body.wpm,
      acc: req.body.acc,
      practiceKeys: req.body.practiceKeys
    });
    console.log(result);
  }
  res.send(req.session.id);
};

export const getResult = async (req, res) => {
  let user = req.session.username;
  const result = await TestResult.find({ userId: user });
  // console.log(result);
  res.send(result);
};

export const getAllResult = async (req, res) => {
  const result = await TestResult.find()
    .sort({ wpm: -1});
  // console.log(result);
  res.send(result);
};
