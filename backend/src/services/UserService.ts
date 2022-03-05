import { getRepository } from "typeorm";
import { User } from "../entities/User";
import { v4 as uuid } from "uuid";
import { UserRequest } from "../@types/UserRequest";
import { validate } from "class-validator";
import jwt from 'jsonwebtoken';
import { ValidateEmail } from "../nodemail/ValidateEmail";

export class UserService {

    async createUser( { name, password, email }: UserRequest ): Promise<{}> {
        try{
            const repository = getRepository(User);
            const is_validated = false;
            const id = uuid();            

            const user = repository.create({
                id,
                name,
                email,
                password,
                is_validated,
            });
            await repository.save(user);
            
            const secret = process.env.JWT_SECRET_KEY || '';
            const emailToken = jwt.sign({email: email}, secret);
            const validateEmail = new ValidateEmail();

            validateEmail.sendMail(emailToken, email);
            delete user.password;
            return {
                status: 204,
                message: "User created!",
                data: {
                    user,
                    emailToken,
                }
            };
        } catch (error) {
            return {
                status: 500,
                message: "Internal server error!",
                data: error.driverError ?? error
            }
        }

    }

    async getUsers() {
        try {
            const repository = getRepository(User);
            const users = await repository.findAndCount();

            return {
                status: 200,
                contente: users,
                message: "Get users successfully!",
            }
        } catch {
            return  {
                status: 500,
                message: "Internal server error",
                content: null,
            }
        }
    }

    async updateUser(id: string, user: UserRequest) {
        try {
            const repository = getRepository(User);
            const updateUser = await repository
            .createQueryBuilder("user")
            .addSelect('user.password')
            .where('user.id = :id', {id: id})
            .getOne();

            if (!updateUser) {
                return {
                    status: 404,
                    message: "User not found!",
                    content: null,
                }
            }

            const errors = await validate(user);
            if(errors.length > 0 ){
                return  {
                    status: 400,
                    message: errors,
                }
            }
            
            const { name, password, email } = user;
            updateUser.name = name ? name : updateUser.name;
            updateUser.email = email ? email : updateUser.email;
            updateUser.password = password ? password : updateUser.password;
            
            await repository.save(updateUser);
            delete updateUser.password;

            return {
                status: 200,
                message: "Update Succesfully!",
                data: updateUser,
            }
        } catch (error) {
            return {
                status: 500,
                message: "Internal server error",
                content: error.driverError ?? error,
            }
        }
    }

    async deleteUser(id: string) {
        try {
            const repository = getRepository(User);
            const user = await repository.findOne(id);

            if (!user) {
                return {
                    status: 404,
                    message: "User ID not found!",
                    content: null,
                }
            }

            if (await repository.delete(id)) {
                return {
                    status: 204,
                }
            }
        } catch (error) {
            return {
                status: 500,
                message: "Internal server error!",
                content: error.driverError ?? error,
            }
        }
    }
}
