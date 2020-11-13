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
import { Editorial } from 'src/editorial/interface/editorial.interface';
import { CreateAuthorDto } from 'src/author/dto/create-author.dto';
import { UpdateAuthorDto } from 'src/author/dto/update-author.dto';


@Injectable()
export class BooksService {
    constructor(
       private  readonly bookRepository: BooksRepository,
       @Inject(forwardRef(() => GenderService))
       private  readonly genderService: GenderService ,
       @Inject(forwardRef(() => AuthorService))
       private  readonly authorService: AuthorService,
       @Inject(forwardRef(() => EditorialService))
       private  readonly editorialService: EditorialService,
       ){}

      async findAll(paginationQuery: PaginationQueryDto): Promise<Book[]>{
            return await this.bookRepository.findAll(paginationQuery);
        }

      async findOne(id: string): Promise<Book>{
          const book =  await this.bookRepository.findOne(id);
          if (!book) throw new NotFoundException(`Book #${id} not found`);
            return book ;
        }
       
       async  create(createBook: CreateBooksDto): Promise<Book>{
       await this.validateTitleBook(createBook.title);  //Validate if the title book exists
       await this.validateAssignItems(createBook);  // Validate gender, author and editorial
       return await this.bookRepository.create(createBook);
        }

       
       async update(id:string, updateBooks: UpdateBooksDto): Promise<Book>{
            await this.validateTitleBook(updateBooks.title);
            this.validateUpdateItems(updateBooks);
            return await this.bookRepository.update(id ,updateBooks);
        }

      async  delete(id:string): Promise<Book>{
         return  await this.bookRepository.delete(id);
        }
        
      //PRIVATE METHODS

      //Validate genders, authors and editorials
      private async validateAssignItems(book: CreateBooksDto): Promise<void>{
        await this.genderExists(book.gender);     // Validate if gender exists in the BD
        await this.authorExists(book.author);    // Validate if author exists in the BD
        await this.editorialExists(book.editorial); // Validate if editorial exists
      }

       //Validate  update genders, authors and editorials
       private async validateUpdateItems(book: UpdateBooksDto): Promise<void>{
        await this.genderExists(book.gender);     // Validate if gender exists in the BD
        await this.authorExists(book.author);    // Validate if author exists in the BD
        await this.editorialExists(book.editorial); // Validate if editorial exists
      }

      //IF GENDER EXISTS
      private async genderExists(genderId: string): Promise<Gender> {
        const genders = await this.genderService.findOne(genderId);

        
        return genders;
      }
   
       //IF Author EXISTS
       private async authorExists(authorId: string): Promise<Author> {
        const author = await this.authorService.findOne(authorId);
        return author;
      }

      //IF Editorial EXISTS
      private async editorialExists(editorialId: string): Promise<Editorial> {
        const editorial = await this.editorialService.findOne(editorialId);
        
        return editorial;
      }

      private async validateTitleBook(title: string): Promise<void>{
        const book = await this.bookRepository.findBookName(title);
        if(book){
          const error = `There is already a book with the title ${title}`;
          throw new NotFoundException(error);
        }
      }
}
