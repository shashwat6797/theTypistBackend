import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true},
  dateCreated:{type : Date , default:Date.now}
});

const User = mongoose.model("users", userSchema);

export default User;