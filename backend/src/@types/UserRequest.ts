import { IsEmail, IsNotEmpty, IsString, Length, ValidateIf } from "class-validator";

export class UserRequest {
    
    @ValidateIf(request => request.name !== undefined)
    @IsString()
    @IsNotEmpty()
    @Length(1,50)
    name: string;

    @ValidateIf(request => request.email !== undefined)
    @IsEmail()
    email:string;
    
    @ValidateIf(request => request.password !== undefined)
    @IsString()
    @Length(6, 60)
    password: string;


    constructor({name, email, password}:UserRequest){
        this.name = name;
        this.email = email;
        this.password = password;
    }
}
