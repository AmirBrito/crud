import { Response, Request, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entities/User';
import  jwt  from 'jsonwebtoken';
import { ValidateEmail } from '../nodemail/ValidateEmail';

export async function ValidateAuthUser(request: Request, response: Response, next: NextFunction) {


    try {
        const {email} = request.body;
        const repository = getRepository(User);
        const user = await repository.findOne({email});

        if(!user){
            return response.status(404).json({ message: "User not found!"});
        }

        if(!user.is_validated){
            const secret = process.env.JWT_SECRET_KEY || '';
            const emailToken = jwt.sign({email: email}, secret);
            const validateEmail = new ValidateEmail();

            validateEmail.sendMail(emailToken, email);

            return response.status(400).json({
                message: "email invalid, verify email",
            });
        }

        return next();
    } catch {
        return response.status(500).json({
            message: "Internal server error",
        });
    }
}