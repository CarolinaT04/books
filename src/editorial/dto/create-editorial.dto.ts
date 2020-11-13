import { IsString, IsNotEmpty, IsEmail } from "class-validator";

export declare class CreateEditorialDto {

    @IsString()
    @IsNotEmpty()
    readonly name: string;
    
    @IsString()
    @IsNotEmpty()
    readonly address: string;

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;
}
