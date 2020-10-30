import { Controller, Delete, Patch, Post, Get, Param, Body, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { EditorialService } from '../services/editorial.service';
import { PaginationQueryDto } from 'src/shared/common/dto/pagination-query.dto';
import { CreateEditorialDto } from '../dto/create-editorial.dto';
import { UpdateBooksDto } from 'src/books/dto/update-books.dtos';
import { UpdateEditorialDto } from '../dto/update-editorial.dto';

@Controller('editorial')
export class EditorialController {
    constructor( private readonly editorialService: EditorialService){}

    @Get()
    findAll(@Query() paginationQueryDto: PaginationQueryDto){
      return this.editorialService.findAll(paginationQueryDto);
    }

    @Get(':id')
    findOne(@Param('id') id:string){
        return this.editorialService.findOne(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body()createEditorialDto: CreateEditorialDto){
     return this.editorialService.create(createEditorialDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateEditorialDto: UpdateEditorialDto){
        return this.editorialService.update(id, updateEditorialDto);
    }

    @Delete(':id')
    delete(@Param('id') id:string){
        return this.editorialService.delete(id);
    }
}
