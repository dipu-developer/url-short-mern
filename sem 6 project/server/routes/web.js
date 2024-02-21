import express from "express";
const routes = express.Router();
import UrlControllers from "../controllers/urlControllers.js";
import cheakAuth from "../middleware/verifyuser.js";
import redirectMiddleware from "../middleware/redirect.js";

//Authenticaion required
routes.post("/", cheakAuth, UrlControllers.shortLinkGenerate);
routes.get("/ans/:id", cheakAuth, UrlControllers.totalVisit);
routes.post("/editurl", cheakAuth, UrlControllers.editUrl);
routes.post("/getdetails", cheakAuth, UrlControllers.getDetails);
routes.post("/profiledata", cheakAuth, UrlControllers.setProfileData);

routes.get("/:shortId", redirectMiddleware, UrlControllers.redirectUrl);
routes.post("/create", UrlControllers.createUser);
routes.post("/login", UrlControllers.loginUser);

export default routes;
