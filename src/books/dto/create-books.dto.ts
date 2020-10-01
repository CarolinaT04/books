import { IsString, IsNotEmpty, IsDate} from 'class-validator';
export class CreateBooksDto {
   @IsString()
   @IsNotEmpty()
   readonly name: String;

    @IsDate()
   readonly publishDate: Date;

    @IsString()
   readonly ISBN : string;

   @IsString()
   readonly gender: string;

   @IsString()
   readonly author: string;

   @IsString()
   readonly editorial: string;
}
