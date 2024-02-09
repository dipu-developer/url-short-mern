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

const userAuth = mongoose.model("user", authSchema);

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

const urlModel = mongoose.model("urldetail", urlSchema);

export { urlModel, userAuth };
