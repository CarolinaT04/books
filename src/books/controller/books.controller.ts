import { Controller, Get, Post, Param, Patch, Delete, HttpCode, HttpStatus, Body, Query } from '@nestjs/common';
import { BooksService } from '../services/books.service';
import { CreateBooksDto } from '../dto/create-books.dto';
import { UpdateBooksDto } from '../dto/update-books.dtos';
import { PaginationQueryDto } from '../../shared/common/dto/pagination-query.dto';

@Controller('books')
export class BooksController {
    constructor( private readonly bookService: BooksService ){}

    @Get()
    findAll(@Query()  paginationquery: PaginationQueryDto){
        return this.bookService.findAll(paginationquery);
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.bookService.findOne(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createPost(@Body() createBook: CreateBooksDto){
        return this.bookService.create(createBook);
    }

    @Patch(':id')
    update(@Param('id') id:string, @Body() updateBooks: UpdateBooksDto){
        
        return this.bookService.update(id, updateBooks);
        
    }

    @Delete(':id')
    delete(@Param('id') id:string){
        return this.bookService.delete(id);
    }
}
