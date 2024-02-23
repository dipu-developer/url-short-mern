import express from "express";
const routes = express.Router();
import UrlControllers from "../controllers/urlControllers.js";
import cheakAuth from "../middleware/verifyuser.js";

//Authenticaion required
routes.post("/", cheakAuth, UrlControllers.shortLinkGenerate);
routes.get("/ans/:id", cheakAuth, UrlControllers.totalVisit);
routes.post("/editurl", cheakAuth, UrlControllers.editUrl);
routes.post("/getdetails", cheakAuth, UrlControllers.getDetails);
routes.post("/profiledata", cheakAuth, UrlControllers.setProfileData);
routes.get("/user/urldata",cheakAuth,UrlControllers.getAllUrlData)
routes.delete("/deleteurl/:id",cheakAuth,UrlControllers.deleteUrl)

routes.get("/:shortId", UrlControllers.redirectUrl);
routes.post("/create", UrlControllers.createUser);
routes.post("/login", UrlControllers.loginUser);

export default routes;
