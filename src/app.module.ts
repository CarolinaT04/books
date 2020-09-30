import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GenderModule } from './gender/gender.module';
import { AuthorModule } from './author/author.module';
import { EditorialModule } from './editorial/editorial.module';

@Module({
  imports: [BooksModule,
    MongooseModule.forRoot('mongodb://localhost:27017/books'),
    GenderModule,
    AuthorModule,
    EditorialModule]
})
export class AppModule {}
