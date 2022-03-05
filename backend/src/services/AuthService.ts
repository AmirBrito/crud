import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entities/User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class AuthService {

    async auth(request: Request, response: Response) {

        try {
            const repository = getRepository(User);
            const { email, password } = request.body;
            const user = await repository.
            createQueryBuilder('user').
            select().
            addSelect('user.password').
            where('user.email = :email', { email }).
            getOne();

            const isValidPassword = await bcrypt.compare(password, user.password);

            if(!isValidPassword) {
                return {
                    status: 401,
                    message: "Password wrong!",
                    content: null,
                }
            }
            const secret = process.env.JWT_SECRET_KEY || '';
            const token = jwt.sign({id: user.id}, secret, {expiresIn: '1d'});

            return {
                status: 200,
                message: "Logged Succesfully!",
                data: token,
            }
        } catch (error) {
            return {
                status: 400,
                message: error.driverError ?? "ID not found!",
                content: null,
            }
        }
    }
}