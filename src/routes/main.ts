import { Router } from "express";
import * as authController from "../controller/authController";
import * as userController from "../controller/userController";
import * as girlController from "../controller/girlController";
import * as photoController from "../controller/photoController";
import { formMiddleWare } from "../utils/formMiddlware";
import { verifyJWT } from "../utils/jwt";

export const mainRouter = Router();

mainRouter.post("/login", authController.login);
//mainRouter.post("/login_teste", authController.loginTeste);

mainRouter.post("/user", verifyJWT, userController.createUser);
mainRouter.get("/users", verifyJWT, userController.getAllUsers);
mainRouter.get("/user/:id", verifyJWT, userController.getOneUser);

mainRouter.post("/girl", verifyJWT, formMiddleWare, girlController.createGirl);
mainRouter.get("/girls/:skip", verifyJWT, girlController.getAllGirls);
mainRouter.get("/girl/:id", verifyJWT, girlController.getOneGirl);
mainRouter.put("/girl/:id", verifyJWT, formMiddleWare, girlController.updateGirl);

//mainRouter.post("/banner", verifyJWT, formMiddleWare, bannerController.createEvent);
//mainRouter.put("/banner/:id", verifyJWT, formMiddleWare, bannerController.updateEvent);
//mainRouter.get("/banner/:id", verifyJWT, bannerController.getOneEvent);
//mainRouter.get("/banners", verifyJWT, bannerController.getAllEvents);

mainRouter.put("/photo/:id", verifyJWT, photoController.updatePhotoStatus);
mainRouter.put("/photos_clean", verifyJWT, photoController.cleanAllSelectedPhotos);
mainRouter.get("/photos", photoController.getAllSelectedPhotos);

mainRouter.get("/ping", (req, res) => {
  res.status(200).json({ pong: true });
});
mainRouter.get("/ping/private", verifyJWT, (req, res) => {
  res.status(200).json({ pong: true });
});
