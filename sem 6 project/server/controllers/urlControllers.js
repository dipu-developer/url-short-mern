import { nanoid } from "nanoid";
import {urlModel, userAuth} from "../module/urlModule.js";

class UrlControllers {
  static home = async (req, res) => {
    try {
      const shortId = nanoid(8); // 8 length on caharactor
      const { url } = req.body;
      if (!url)
        return res.status(404).json({ error: "redirect url must be required" });
      const result = await urlModel.create({
        shorturl: shortId,
        redirectUrl: url,
        visitorHistory: [],
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
        { shorturl:shortId },
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
  static totalVisit = async (req,res)=>{
    const shortId = req.params.id
    const result = await urlModel.findOne({shorturl:shortId})
    res.status(200).json({total:result.visitorHistory.length})
  }
}
export default UrlControllers;
