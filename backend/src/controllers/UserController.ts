import { Request, Response } from "express";
import { UserRequest } from "../@types/UserRequest";
import { UserService } from "../services/UserService";



export class UserController {

    async createUser(request: Request, response: Response){
        const { name, email, password } = request.body;
        const service = new UserService();
        const result = await service.createUser({ name, email, password });
        if(result instanceof Error){
            return response.status(400).json(result.message);
        }
        return response.json(result);
    }

    async getUsers(request: Request, response: Response){
        const service = new UserService();
        const result = await service.getUsers();
        return response.status(result.status).json(result);
    }

    async updateUser(request: Request, response: Response) {
        const id = request.params.id;
        const user: UserRequest = request.body;
        const service = new UserService();
        const result = await service.updateUser(id, user);
        return response.status(result.status).json(result);
    }
    
    async deleteUser(request: Request, response: Response) {
        const id = request.params.id;
        const service = new UserService();
        const result = await service.deleteUser(id);
        return response.status(result.status).json(result);
    }
}