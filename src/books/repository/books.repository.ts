import { Injectable, NotFoundException, forwardRef, Inject, ValidationPipe } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from '../interface/book.interface';
import { Model } from 'mongoose';
import { CreateBooksDto } from '../dto/create-books.dto';
import { UpdateBooksDto } from '../dto/update-books.dtos';
import { PaginationQueryDto } from '../../shared/common/dto/pagination-query.dto';
import { BOOK_MODEL } from 'src/shared/constants/constants';


@Injectable()
export class BooksRepository {
    constructor(
        @Inject(BOOK_MODEL) private  readonly bookModel: Model<Book> ,){}

      async findAll(paginationQuery: PaginationQueryDto): Promise<Book[]>{
        try {
            const { limit , offset} = paginationQuery;
            return this.bookModel
            .find()
            .skip(offset)
            .limit(limit)
            .exec();
         } catch (err){
                throw new Error(err);
            }
        }

      async findOne(id: string): Promise<Book>{
        try {
          const book =  (await this.bookModel.findOne({_id: id}).exec());
            return book ;
          } catch(err){
          console.log(err);
          
          }
        }
       
       async  create(createBook: CreateBooksDto): Promise<Book>{
        try{
            const book = new this.bookModel(createBook);
            const result= await book.save();
            if(!result){ throw new NotFoundException('Book was not created');}
            return book;
        } catch(err){
          throw new Error(err);
        }
       
        
       
        }

       
       async update(id:string, updateBooks: UpdateBooksDto): Promise<Book>{
        try{    
        const book = await this.bookModel
            .findByIdAndUpdate({_id: id}, { $set: updateBooks}, {new: true} )
            .exec();
            return book;
        }catch(err){
            console.log(err);
            
        }
        }

      async  delete(id:string): Promise<Book>{

        try{
          const book = (await this.bookModel.findByIdAndDelete({_id: id}));
           return book;
              }catch (err){
           throw new Error(err);
          
        }
        }


        async findBookName(title: string): Promise<Book>{
          try {
             const book = await this.bookModel.findOne({
                 title: {
                     $regex: title,
                     $options: 'i',
                   },
             });
             return book;
          } catch (error) {
              console.log(error);
              
          }
          
             
     }
}
