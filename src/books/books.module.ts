import { Module, forwardRef } from '@nestjs/common';
import { BooksService } from './services/books.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from './schema/book.schema';
import { BooksController } from './controller/books.controller';
import { Book } from './interface/book.interface';
import { GenderModule } from 'src/gender/gender.module';
import { GenderService } from 'src/gender/services/gender.service';
import { BooksRepository } from './repository/books.repository';
import { GenderRepository } from 'src/gender/repository/gender.repository';
import { ConfigModule } from 'src/config/config.module';
import { booksProvider } from './providers/books.provider';
import { AuthorModule } from 'src/author/author.module';
import { Editorial } from 'src/editorial/interface/editorial.interface';
import { EditorialModule } from 'src/editorial/editorial.module';
import { AuthorService } from 'src/author/services/author.service';
import { EditorialService } from 'src/editorial/services/editorial.service';

@Module({
    imports: [ConfigModule, forwardRef(() => GenderModule),
        forwardRef(() => AuthorModule),
        forwardRef(() => EditorialModule)],
    providers: [ ...booksProvider, BooksService, GenderService, BooksRepository, AuthorService, EditorialService],
    controllers: [BooksController],

})
export class BooksModule {}
