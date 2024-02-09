import jwt from "jsonwebtoken";
const cheakAuth = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      let user = jwt.verify(token, process.env.SECRET_KEY);
      res.id = user.id;
      next();
    } else {
      return res.status(401).json({ message: "authorization access" });
    }
  } catch (error) {
    return res.status(401).json({ message: "authorization access" });
  }
};
export default cheakAuth;
