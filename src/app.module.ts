import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GenderModule } from './gender/gender.module';
import { AuthorModule } from './author/author.module';
import { EditorialModule } from './editorial/editorial.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [BooksModule,
    GenderModule,
    AuthorModule,
    EditorialModule,
    ConfigModule],
})
export class AppModule {}
