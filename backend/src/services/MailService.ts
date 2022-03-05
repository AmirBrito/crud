import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { User } from '../entities/User';
import { TokenPayloadEmail } from '../interfaces/TokenPayloadEmail';


export class MailService {

    async activateEmail(emailToken) {

        try {

            const secret = process.env.JWT_SECRET_KEY || '';
            const data = jwt.verify(emailToken, secret);
            const { email } = data as TokenPayloadEmail;

            const repository = getRepository(User);
            const user = await repository.findOne({email});

            if (!user.email) {
                return {
                    status: 404,
                    message: "User not found!",
                }
            }

            user.is_validated = true;
            await repository.save(user);

            return {
                status: 200,
                message: "Activated user!",
                data: user.is_validated,
            }
        } catch (error){
            return {
                status: 500,
                message: "Internal server Error",
                content: error.driverError ?? error,
            }
        }
    }
}