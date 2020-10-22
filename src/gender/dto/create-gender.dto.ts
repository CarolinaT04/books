import { IsString, IsNotEmpty } from "class-validator";

export class CreateGenderDto {
    @IsString()
    @IsNotEmpty()
    description: string;
}
