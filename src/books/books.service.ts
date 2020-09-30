import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './entities/book.entity';
import { Model } from 'mongoose';
import { CreateBooksDto } from './dto/create-books.dto';
import { UpdateBooksDto } from './dto/update-books.dtos';
import { PaginationQueryDto } from '../shared/common/dto/pagination-query.dto';

@Injectable()
export class BooksService {
    constructor(
        @InjectModel(Book.name) private  readonly bookModel: Model<Book> ,){}

        findAll(paginationQuery: PaginationQueryDto){
            const { limit , offset} = paginationQuery;
            return this.bookModel
            .find()
            .skip(offset)
            .limit(limit)
            .exec();
        }

      async findOne(id: string){
          const book =  (await this.bookModel.findOne({_id: id}).exec());
          if (!book) throw new NotFoundException(`Book #${id} not found`);
            return book ;
        }
       
         create(createBook: CreateBooksDto){
         const book = new this.bookModel(createBook);
            return book.save();
        }
       
       async update(id:string, updateBooks: UpdateBooksDto){
            const book = await this.bookModel
            .findByIdAndUpdate({_id: id}, { $set: updateBooks}, {new: true} )
            return book;
        }

        delete(id:string){
        return 'This delete a book by ID';
        }
}
