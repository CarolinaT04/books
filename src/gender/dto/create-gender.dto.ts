import { IsString, IsNotEmpty } from "class-validator";

export declare class CreateGenderDto {
    @IsString()
    @IsNotEmpty()
    readonly description: string;
}
