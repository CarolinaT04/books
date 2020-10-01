import { Module } from '@nestjs/common';
import { BooksService } from './services/books.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './entities/book.entity';
import { BooksController } from './controller/books.controller';

@Module({
    imports: [MongooseModule.forFeature([{
        name: Book.name,
        schema: BookSchema
    }])],
    controllers: [BooksController],
    providers: [BooksService]

})
export class BooksModule {}
