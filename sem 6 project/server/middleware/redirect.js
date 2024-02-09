import { urlModel } from "../module/urlModule.js";

const redirectMiddleware = async (req, res, next) => {
  try {
    let url = req.params.shortId;
    if (url) {
      const cheakUrl = await urlModel.findOne({ shorturl: url });
      if (cheakUrl) {
        next();
      } else {
        return res.status(200).json({
          message: "url not found",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};
export default redirectMiddleware;
