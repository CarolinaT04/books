import { IsString, IsNotEmpty, IsDate} from 'class-validator';
export class CreateBooksDto {
   @IsString()
   @IsNotEmpty()
   readonly name: String;

    @IsDate()
   readonly publishDate: Date;

    @IsString()
   readonly ISBN : string;

   @IsString({ each: true})
   readonly gender: string[];

   @IsString({ each: true})
   readonly author: string[];

   @IsString({ each: true})
   readonly editorial: string[];
}
