import express from "express";
const routes = express.Router();
import UrlControllers from "../controllers/urlControllers.js";
import cheakAuth from "../middleware/verifyuser.js";


routes.get("/admin-dashboard",UrlControllers.adminDashboard)
routes.get("/admin-support",UrlControllers.adminSupport)
//Authenticaion required
routes.post("/", cheakAuth, UrlControllers.shortLinkGenerate);
routes.get("/ans/:id", cheakAuth, UrlControllers.totalVisit);
routes.post("/editurl", cheakAuth, UrlControllers.editUrl);
routes.get("/getdetails", cheakAuth, UrlControllers.getDetails);
routes.post("/profiledata", cheakAuth, UrlControllers.setProfile);
routes.get("/user/urldata",cheakAuth,UrlControllers.getAllUrlData)
routes.delete("/deleteurl/:id",cheakAuth,UrlControllers.deleteUrl)
routes.get("/dashboard",cheakAuth,UrlControllers.dashBoard)
routes.get("/profile",cheakAuth,UrlControllers.getProfileData)
routes.post("/support",cheakAuth,UrlControllers.userSupport)

routes.get("/:shortId", UrlControllers.redirectUrl);
routes.post("/create", UrlControllers.createUser);
routes.post("/login", UrlControllers.loginUser);
export default routes;
