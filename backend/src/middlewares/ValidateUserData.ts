import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";
import { UserRequest } from "../@types/UserRequest";


export async function ValidateUserData(request: Request, response: Response, next: NextFunction) {

    const user = request.body as UserRequest;
    const validateUser = new UserRequest(user);
    const errors = await validate(validateUser);

    if (errors.length > 0) {
        return response.status(400).json({
            error: "Bad Request!"
        })
    }

    return next();
}
