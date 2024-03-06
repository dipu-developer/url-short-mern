import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "First name field can't be empty"],
    unique: [true, "Username already exist"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email field can't be empty"],
    maxlength: [50, "Email must be less than 50 characters"],
    trim: true,
  },
  password: { type: String, required: true, unique: true },
});

const urlSchema = new mongoose.Schema(
  {
    shorturl: { type: String, required: true, unique: true },
    redirectUrl: { type: String, required: true },
    visitorHistory: [{ timestamp: { type: Number } }],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

const profileSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: [true, "Email field can't be empty"],
    maxlength: [50, "Email must be less than 50 characters"],
    trim: true,
  },
  lname: {
    type: String,
    required: [true, "Email field can't be empty"],
    maxlength: [50, "Email must be less than 50 characters"],
    trim: true,
  },
  city: {
    type: String,
    required: [true, "Email field can't be empty"],
    maxlength: [50, "Email must be less than 50 characters"],
    trim: true,
  },
  state: {
    type: String,
    required: [true, "Email field can't be empty"],
    maxlength: [10, "Email must be less than 50 characters"],
    trim: true,
  },
  zip: {
    type: Number,
    required: [true, "Email field can't be empty"],
    maxlength: [999999, "Email must be less than 999999 characters"],
  },
  phone: {
    type: Number,
    required: [true, "Email field can't be empty"],
  },
  account: {
    type: Number,
    required: [true, "Email field can't be empty"],
  },
  ifsc: {
    type: String,
    required: [true, "Email field can't be empty"],
    maxlength: [50, "Email must be less than 50 characters"],
    trim: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const supportSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const userAuth = mongoose.model("user", authSchema);
const urlModel = mongoose.model("urldetail", urlSchema);
const profileModule = mongoose.model("profile", profileSchema);
const userSupport = mongoose.model("support", supportSchema);

export { urlModel, userAuth, profileModule, userSupport };
