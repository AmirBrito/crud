import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { TokenPayloadLogin } from "../interfaces/TokenPayloadLogin";



export async function AuthBearerToken(request: Request, response: Response, next: NextFunction) {

    const { authorization } = request.headers;

    if(!authorization){
        return response.sendStatus(401);
    }

    const token = authorization.replace('Bearer', '').trim();

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const { id } = data as TokenPayloadLogin;
        request.userId = id;
        return next();
    } catch {
        return response.sendStatus(401);
    }
}