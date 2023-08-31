import mongoose from 'mongoose';

// Create a post schema
const testResultSchema = new mongoose.Schema({
  userId: { type: String, ref: 'User', required: true }, // Reference to the User model
  duration: { type: Number, required: true },
  wpm: { type: Number, required: true },
  acc: { type: Number, required: true},
  practiceKeys: {type: Array, required: true},
  dateCreated:{type : Date , default:Date.now}  //date created is automatically added by mongoDB
});

// Create a post model using the schema
const TestResult = mongoose.model('testResult', testResultSchema);

export default TestResult;