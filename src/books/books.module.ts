import { Module } from '@nestjs/common';
import { BooksService } from './books.service';

@Module({
    imports: [BooksService]
})
export class BooksModule {}
