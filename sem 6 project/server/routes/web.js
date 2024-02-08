import express from "express";
const routes = express.Router();
import UrlControllers from "../controllers/urlControllers.js";

routes.post("/", UrlControllers.home);
routes.get("/:shortId", UrlControllers.redirectUrl);
routes.get("/ans/:id",UrlControllers.totalVisit)

export default routes;
