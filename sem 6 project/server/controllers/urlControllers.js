import { nanoid } from "nanoid";
import { profileModule, urlModel, userAuth, userSupport } from "../module/urlModule.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class UrlControllers {
  static shortLinkGenerate = async (req, res) => {
    try {
      // Generate a short ID for the URL
      const shortId = nanoid(8); // 8-character length
      const { url } = req.body;

      // Check if URL is provided
      if (!url) {
        // Return 400 Bad Request if URL is not provided
        return res.status(400).json({ error: "Redirect URL is required" });
      }

      // Create a new URL document in the database
      const result = await urlModel.create({
        shorturl: shortId,
        redirectUrl: url,
        visitorHistory: [],
        user: res.id,
      });

      // Save the document
      await result.save();

      // Return 200 OK with the short ID
      return res.status(200).json({ id: shortId });
    } catch (error) {
      // Log server error
      console.error(error);
      // Return 500 Internal Server Error if there's a server error
      return res.status(500).json({ error: "Server error" });
    }
  };
  static redirectUrl = async (req, res) => {
    try {
      // Extract the short ID from the request parameters
      const shortId = req.params.shortId;

      // Find the entry with the short ID in the database
      const entry = await urlModel.findOne({ shorturl: shortId });

      // If the entry is found
      if (entry) {
        // Update the entry in the database to record visitor history
        await urlModel.findOneAndUpdate(
          { shorturl: shortId },
          {
            $push: {
              visitorHistory: {
                timestamp: Date.now(), // Record the timestamp of the visit
              },
            },
          }
        );
        res.render("redirect", { originalUrl: entry.redirectUrl });
      } else {
        // If the entry is not found, show a "Page Not Found" message
        return res.status(404).send("Page Not Found");
      }
    } catch (error) {
      // Log any errors that occur
      console.error(error);
      // Return a 500 Internal Server Error response if there's a server error
      return res.status(500).json({ error: "Server error" });
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

      // Check if all required fields are present
      if (!name || !email || !password) {
        return res.status(422).json({ error: "All fields are required" });
      }

      // Check if user with the same name or email already exists
      const existingUser = await userAuth.findOne({
        $or: [{ name }, { email }],
      });
      if (existingUser) {
        return res.status(403).json({ message: "User already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user document
      const newUser = new userAuth({
        name,
        email,
        password: hashedPassword,
      });

      // Save the new user document
      const result = await newUser.save();
      if (result) {
        return res.status(201).json({ message: "Data added successfully" });
      } else {
        return res.status(500).json({ error: "Failed to add user" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
  static loginUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if ((name || email) && password) {
        let verifyUser;

        if (name == null) {
          verifyUser = await userAuth.findOne({ email: email });
        } else {
          verifyUser = await userAuth.findOne({ name: name });
        }

        if (verifyUser) {
          if (await bcrypt.compare(password, verifyUser.password)) {
            const token = jwt.sign(
              { name: verifyUser.name, id: verifyUser._id },
              process.env.SECRET_KEY
            );
            return res.status(200).json({
              message: "User successfully logged in",
              token: token,
              uname: name,
            });
          }
          if (verifyUser === null) {
            // Incorrect password
            return res.status(401).json({ message: "Incorrect password" });
          }
        } else {
          // User not found
          clg("user not found")
          return res.status(404).json({ message: "User not found" });
        }
      } else {
        // Missing fields
        return res.status(400).json({ message: "All fields are required" });
      }
    } catch (error) {
      // Internal server error
      console.error(error);
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
        const result = await profileModule.find({ user: id });
        if (result) {
          return res.status(200).json({ data: result });
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
          user: id,
        });
        const result = doc.save();
        if (result) {
          return res.status(200).json({ message: "Sucessfully" });
        }
      } else {
        return res.status(422).json({ error: "All field are required" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Server error" });
    }
  };

  static getAllUrlData = async (req, res) => {
    try {
      const id = await res.id;

      if (id) {
        // const userData = await urlModel.find({user: id}).populate('user').select('shorturl redirectUrl updatedAt');
        const userData = await urlModel
          .find({ user: id })
          .select("shorturl redirectUrl updatedAt")
          .sort({ updatedAt: -1 });
        if (userData) {
          return res.status(200).json({ data: userData });
        }
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Server error" });
    }
  };
  static deleteUrl = async (req, res) => {
    try {
      const result = await urlModel.findByIdAndDelete(req.params.id);
      if (result) {
        return res.status(200).json({ message: "Delete Sucessfully" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Server error" });
    }
  };
  static dashBoard = async (req, res) => {
    try {
      const id = await res.id;
      if (id) {
        // const userData = await urlModel.find({user: id}).populate('user').select('shorturl redirectUrl updatedAt');
        const userData = await urlModel
          .find({ user: id })
          .select("redirectUrl visitorHistory")
          .sort({ visitorHistory: -1 });
        if (userData) {
          return res.status(200).json({ data: userData });
        }
      }
    } catch (error) {}
  };
  static setProfile = async (req, res) => {
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
        let data = await profileModule.findOne({ _id: id });
        if (data) {
          data.fname = fname;
          data.lname = lname;
          data.city = city;
          data.state = state;
          data.zip = zip;
          data.phone = phone;
          data.ifsc = ifsc;
          data.account = account;

          data = await data.save();
          if (data) {
            return res.status(200).json({ message: "Sucessfully" });
          }
        } else {
          const doc = await profileModule.create({
            fname: fname,
            lname: lname,
            city: city,
            state: state,
            zip: zip,
            phone: phone,
            ifsc: ifsc,
            account: account,
            user: id,
          });
          const result = doc.save();
          if (result) {
            return res.status(200).json({ message: "Sucessfully" });
          }
        }
      } else {
        return res.status(422).json({ error: "All field are required" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Server error" });
    }
  };
  static getProfileData = async (req, res) => {
    try {
      const id = await res.id;
      if (id) {
        const doc = await profileModule
          .find({ user: id })
          .sort({ updatedAt: -1 });
        if (doc) {
          return res.status(200).json({ data: doc });
        } else {
          return res.status(404).json({ message: "Profile not found" });
        }
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Server error" });
    }
  };
  static userSupport = async (req, res) => {
    try {
      const id = await res.id;
      if (id) {
        const doc = await userSupport.create({
          message: message,
          user: id,
        });
        const result = doc.save();
        if (result) {
          return res.status(200).json({ message: "report subbmitted" });
        }
      }
    } catch (error) {
      return res.status(500).json({ error: "Server error" });
    }
  };
}
export default UrlControllers;
