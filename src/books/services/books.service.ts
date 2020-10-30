import { Injectable, NotFoundException, Inject, forwardRef} from '@nestjs/common';
import { Book } from '../interface/book.interface';
import { CreateBooksDto } from '../dto/create-books.dto';
import { UpdateBooksDto } from '../dto/update-books.dtos';
import { PaginationQueryDto } from '../../shared/common/dto/pagination-query.dto';
import { BooksRepository } from '../repository/books.repository';
import { Gender } from 'src/gender/interface/gender.interface';
import { GenderService } from 'src/gender/services/gender.service';
import { AuthorService } from 'src/author/services/author.service';
import { EditorialService } from 'src/editorial/services/editorial.service';
import { Author } from 'src/author/interface/author.interface';


@Injectable()
export class BooksService {
    constructor(
       private  readonly bookRepository: BooksRepository,
       @Inject(forwardRef(() => GenderService))
       @Inject(forwardRef(() => AuthorService))
       @Inject(forwardRef(() => EditorialService))
        private  readonly authorService: AuthorService,
        private  readonly editorialService: EditorialService,
        private  readonly genderService: GenderService ){}

      async findAll(paginationQuery: PaginationQueryDto): Promise<Book[]>{
            return await this.bookRepository.findAll(paginationQuery);
        }

      async findOne(id: string): Promise<Book>{
          const book =  await this.bookRepository.findOne(id);
          if (!book) throw new NotFoundException(`Book #${id} not found`);
            return book ;
        }
       
       async  create(createBook: CreateBooksDto): Promise<Book>{
         
        await this.validateTitleBook(createBook.title);
        //const gender =  await this.genderExists(createBook.gender);
       const author =  await this.AuthorExists(createBook.author);
       console.log('create:', author);
       
        
        return await this.bookRepository.create(createBook);
        }

       
       async update(id:string, updateBooks: UpdateBooksDto): Promise<Book>{
            return await this.bookRepository.update(id ,updateBooks);
        }

      async  delete(id:string): Promise<Book>{
         return  await this.bookRepository.delete(id);
        }
        
      //PRIVATE

      //IF GENDER EXISTS
      private async genderExists(genderId: string): Promise<Gender> {
        const genders = await this.genderService.findOne(genderId);

        
        return genders;
      }

       //IF Author EXISTS
       private async AuthorExists(authorId: string): Promise<Author> {
        const author = await this.authorService.findOne(authorId);
        console.log('Author:', author);
        
        return author;
      }

      private async validateTitleBook(title: string): Promise<void>{
        const book = await this.bookRepository.findBookName(title);
        if(book){
          const error = `There is already a book with the title ${title}`;
          throw new NotFoundException(error);
        }
      }
}
