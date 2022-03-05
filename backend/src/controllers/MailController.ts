import { Request, Response } from 'express';
import { MailService } from '../services/MailService';


export class MailController {

    async activateEmail(request: Request, response: Response) {

        const { emailToken } = request.params;
        const service = new MailService();
        const result = await service.activateEmail(emailToken);
        return response.status(result.status).json(result);
    }
}