import { IsString, IsNotEmpty, IsEmail } from "class-validator";

export declare class CreateAuthorDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly lastName: string;

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;
}
