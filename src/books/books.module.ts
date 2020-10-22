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

@Module({
    imports: [ConfigModule, forwardRef(() => GenderModule)],
    providers: [ ...booksProvider, BooksService, GenderService, BooksRepository],
    controllers: [BooksController],

})
export class BooksModule {}
