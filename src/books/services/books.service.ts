import { Injectable, NotFoundException, forwardRef, Inject, ValidationPipe } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from '../interface/book.interface';
import { Model } from 'mongoose';
import { CreateBooksDto } from '../dto/create-books.dto';
import { UpdateBooksDto } from '../dto/update-books.dtos';
import { PaginationQueryDto } from '../../shared/common/dto/pagination-query.dto';
import { BOOK_MODEL } from 'src/shared/constants/constants';
import { GenderService } from 'src/gender/services/gender.service';
import { AuthorService } from 'src/author/services/author.service';
import { EditorialService } from 'src/editorial/services/editorial.service';
import { BooksRepository } from '../repository/books.repository';

@Injectable()
export class BooksService {
    constructor(
       private  readonly bookRepository: BooksRepository ){}

      async findAll(paginationQuery: PaginationQueryDto): Promise<Book[]>{
            return await this.bookRepository.findAll(paginationQuery);
        }

      async findOne(id: string): Promise<Book>{
          const book =  await this.bookRepository.findOne(id);
          if (!book) throw new NotFoundException(`Book #${id} not found`);
            return book ;
        }
       
       async  create(createBook: CreateBooksDto): Promise<Book>{
         await this.bookRepository.findGender(createBook.gender);
        return await this.bookRepository.create(createBook);
        }

       
       async update(id:string, updateBooks: UpdateBooksDto): Promise<Book>{
            return await this.bookRepository.update(id ,updateBooks);
        }

      async  delete(id:string): Promise<void>{
           await this.bookRepository.delete(id);
        }
}
