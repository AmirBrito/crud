import { request, response, Router } from "express";
import { AuthController } from "./controllers/AuthController";
import { MailController } from "./controllers/MailController";
import { UserController } from "./controllers/UserController";
import { AuthBearerToken } from "./middlewares/AuthBearerToken";
import { ValidateAuthUser } from "./middlewares/ValidateAuthUser";
import { ValidateUserData } from "./middlewares/ValidateUserData";

const routes = Router();

routes.get("/", (request, response) => {
    response.json({ message: "CRUD - App "});
})

routes.post("/users", ValidateUserData, new UserController().createUser);
routes.get("/users", AuthBearerToken, new UserController().getUsers);
routes.put("/users/:id", AuthBearerToken, ValidateUserData, new UserController().updateUser);
routes.delete("/users/:id", AuthBearerToken, new UserController().deleteUser);

routes.post("/validateEmail/:emailToken", new MailController().activateEmail);
routes.post("/auth", ValidateAuthUser, new AuthController().auth);

export default routes;
