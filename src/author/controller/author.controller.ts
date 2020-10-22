import { Controller, Delete, Patch, Post, Get, Query, Param, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthorService } from '../services/author.service';
import { PaginationQueryDto } from 'src/shared/common/dto/pagination-query.dto';
import { CreateAuthorDto } from '../dto/create-author.dto';
import { UpdateAuthorDto } from '../dto/update-author.dto';

@Controller('author')
export class AuthorController {
    constructor(private readonly authorService: AuthorService){}
    
    @Get()
    findAll(@Query() paginationQueryDto: PaginationQueryDto){
      return this.authorService.findAll(paginationQueryDto);
    }

    @Get(':id')
    findOne(@Param('id') id:string){
        return this.authorService.findOne(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body()createAuthorDto: CreateAuthorDto){
     return this.authorService.create(createAuthorDto);
    }

    @Patch()
    update(@Param() id: string, @Body()updateAuthorDto: UpdateAuthorDto){
        return this.authorService.update(id , updateAuthorDto);
    }

    @Delete()
    delete(@Param() id:string){
        return this.authorService.delete(id);
    }
}
