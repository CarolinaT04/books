import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from '../entities/book.entity';
import { Model } from 'mongoose';
import { CreateBooksDto } from '../dto/create-books.dto';
import { UpdateBooksDto } from '../dto/update-books.dtos';
import { PaginationQueryDto } from '../../shared/common/dto/pagination-query.dto';

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

      async findOne(id: string): Promise<Book>{
          const book =  (await this.bookModel.findOne({_id: id}).exec());
          if (!book) throw new NotFoundException(`Book #${id} not found`);
            return book ;
        }
       
       async  create(createBook: CreateBooksDto): Promise<Book>{
         const book = new this.bookModel(createBook);
            return book.save();
        }
       
       async update(id:string, updateBooks: UpdateBooksDto): Promise<Book>{
            const book = await this.bookModel
            .findByIdAndUpdate({_id: id}, { $set: updateBooks}, {new: true} )
            .exec();

            if(!book) throw new NotFoundException(`Book ${id} not found`);
            return book;
        }

      async  delete(id:string): Promise<Book>{
          const book = await this.findOne(id);

        if(!book) throw new NotFoundException(`Book ${id} not found`);
        return book.remove();
        }
}
