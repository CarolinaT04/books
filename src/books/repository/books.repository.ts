import { Injectable, NotFoundException, forwardRef, Inject, ValidationPipe } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from '../interface/book.interface';
import { Model } from 'mongoose';
import { CreateBooksDto } from '../dto/create-books.dto';
import { UpdateBooksDto } from '../dto/update-books.dtos';
import { PaginationQueryDto } from '../../shared/common/dto/pagination-query.dto';
import { BOOK_MODEL } from 'src/shared/constants/constants';
import { GenderService } from 'src/gender/services/gender.service';

@Injectable()
export class BooksRepository {
    constructor(
        @Inject(BOOK_MODEL) private  readonly bookModel: Model<Book> ,
        @Inject(forwardRef(() => GenderService))
        private  readonly genderService: GenderService,){}

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
          throw  new Error(err);
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

            if(!book) throw new NotFoundException(`Book ${id} not found`);
            return book;
        }catch(err){
            throw new Error(err);
        }
        }

      async  delete(id:string): Promise<void>{

        try{
          const book = await (await this.bookModel.deleteOne({_id: id})).deletedCount;

        if(book <= 0) throw new NotFoundException(`Book ${id} not found`);
        }catch (err){
          throw new Error(err);
        }
        }


        // PRIVATE METHODS

        async findGender(gender: string){

          try{
          const genders = await this.bookModel.findOne({gender});
          return genders;
          }catch(error){
            throw new Error(error);
          }
        }
}
