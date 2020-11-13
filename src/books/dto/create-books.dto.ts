import { IsString, IsNotEmpty, IsDate} from 'class-validator';
export declare class CreateBooksDto {
   
   @IsString()
   @IsNotEmpty()
   readonly title: string;

    @IsDate()
   readonly publishDate: Date;

    @IsString()
   readonly isbn: string;

   @IsString()
   readonly gender: string;

   @IsString()
   readonly author: string;

   @IsString()
   readonly editorial: string;
}
