import { nanoid } from "nanoid";
import { profileModule, urlModel, userAuth } from "../module/urlModule.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class UrlControllers {
  static shortLinkGenerate = async (req, res) => {
    try {
      const shortId = nanoid(8); // 8 length on caharactor
      const { url } = req.body;
      if (!url)
        return res.status(404).json({ error: "redirect url must be required" });
      const result = await urlModel.create({
        shorturl: shortId,
        redirectUrl: url,
        visitorHistory: [],
        user: res.id,
      });
      await result.save();
      return res.status(200).json({ id: shortId });
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error: "server error" });
    }
  };
  static redirectUrl = async (req, res) => {
    try {
      const shortId = req.params.shortId;
      const entry = await urlModel.findOneAndUpdate(
        { shorturl: shortId },
        {
          $push: {
            visitorHistory: {
              timestamp: Date.now(),
            },
          },
        }
      );
      res.redirect(entry.redirectUrl);
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error: "server error" });
    }
  };
  static totalVisit = async (req, res) => {
    const shortId = req.params.id;
    const result = await urlModel.findOne({ shorturl: shortId });
    res.status(200).json({ total: result.visitorHistory.length });
  };
  static createUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (name && email && password) {
        const verifyUser = await userAuth.find({
          $or: [{ name: name }, { email: email }],
        });

        if (verifyUser.length === 1)
          return res.status(200).json({ message: "user Already exist" });
        const hashPassword = await bcrypt.hash(password, 10);
        const doc = await userAuth({
          name: name,
          email: email,
          password: hashPassword,
        });
        const result = await doc.save();
        if (result) {
          return res.status(200).json({ message: "data add Sucessfully" });
        }
      } else {
        return res.status(422).json({ error: "All field is required" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Internal Server error" });
    }
  };
  static loginUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if ((name || email) && password) {
        if (name == null) {
          const verifyUser = await userAuth.findOne({ email: email });
          if (verifyUser) {
            if (
              verifyUser.email === email &&
              (await bcrypt.compare(password, verifyUser.password))
            ) {
              const token = jwt.sign(
                { name: verifyUser.name, id: verifyUser._id },
                process.env.SECRET_KEY
              );
              // set.cookie("uid", token);
              // res.cookie('token', token, { maxAge: 900000, httpOnly: true });
              return res
                .status(200)
                .json({ message: "user sucessfully login",token:token });
            }
          } else {
            return res.status(200).json({ message: "user not found" });
          }
        } else {
          const verifyUser = await userAuth.findOne({ name: name });
          if (verifyUser) {
            if (
              verifyUser.name === name &&
              (await bcrypt.compare(password, verifyUser.password))
            ) {
              const token = jwt.sign(
                { name: verifyUser.name, id: verifyUser._id },
                process.env.SECRET_KEY
              );
              res.cookie("uid", token);
              return res
                .status(200)
                .json({ message: "user sucessfully login",token:token   });
            }
          } else {
            return res.status(200).json({ message: "user not found"});
          }
        }
      } else {
        return res.status(200).json({ message: "All field is required" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Internal Server error" });
    }
  };
  static editUrl = async (req, res) => {
    try {
      const { newurl, url } = req.body;
      if (newurl) {
        const cheakAvaiable = await urlModel.findOne({ shorturl: newurl });
        if (!cheakAvaiable) {
          const changeUrl = await urlModel.findOneAndUpdate(
            { shorturl: url },
            { shorturl: newurl }
          );
          if (changeUrl) {
            return res
              .status(200)
              .json({ message: "update sucessfully", newurl: newurl });
          } else {
            return res
              .status(500)
              .json({ message: "Enter proper existing url" });
          }
        } else {
          return res.status(200).json({ message: "Url Already exist" });
        }
      } else {
        return res.status(200).json({ message: "All field is requirerd" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Internal Server error" });
    }
  };
  static getDetails = async (req, res) => {
    try {
      const id = await res.id;
      if (id) {
        const result = await urlModel.find({ user: id });
        if (result) {
          console.log(result);
          return res.status(200).json({ message: "doing" });
        } else {
          return res.status(500).json({ error: "Internal Server error" });
        }
      } else {
        return res.status(401).json({ error: "Authentication error" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Server error" });
    }
  };
  static setProfileData = async (req, res) => {
    try {
      const { fname, lname, city, state, zip, phone, ifsc, account } = req.body;
      const id = await res.id;
      if (
        fname !== "" &&
        lname !== "" &&
        city !== "" &&
        state !== "" &&
        zip !== "" &&
        phone !== "" &&
        ifsc !== "" &&
        account !== "" &&
        id !== ""
      ) {
        const doc = await profileModule.create({
          fname: fname,
          lname: lname,
          city: city,
          state: state,
          zip: zip,
          phone: phone,
          ifsc: ifsc,
          account: account,
          user: id
        });
        const result = doc.save();
        if (result) {
          return res.status(200).json({ message: "data add Sucessfully" });
        }
      } else {
        return res.status(422).json({ error: "All field are required" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Server error" });
    }
  };
}
export default UrlControllers;
