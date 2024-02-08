import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    shorturl: { type: String, required: true, unique: true },
    redirectUrl: { type: String, required: true },
    visitorHistory: [{ timestamp: { type: Number } }],
  },
  { timestamps: true }
);

const authSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, unique: true },
});

const urlModel = mongoose.model("urldetail", urlSchema);
const userAuth = mongoose.model('user',authSchema)
export {urlModel, userAuth};
