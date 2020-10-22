import { Controller, Get, Post, Patch, Delete, Query, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { PaginationQueryDto } from 'src/shared/common/dto/pagination-query.dto';
import { GenderService } from './../services/gender.service';
import { CreateGenderDto } from './../dto/create-gender.dto';
import { UpdateGenderDto } from './../dto/update-gender.dto';

@Controller('gender')
export class GenderController {
    constructor(private readonly genderService: GenderService){}

    @Get()
    findAll(@Query() paginationQuery: PaginationQueryDto){
    return this.genderService.findAll(paginationQuery);
    }

    @Get(':id')
    findOne(@Param('id') id:string){
        return this.genderService.findOne(id);
    }

    
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createGenderDto: CreateGenderDto){
     return this.genderService.create(createGenderDto);
    
     
     
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body()  updateGender: UpdateGenderDto){
      return this.genderService.update(id , updateGender);
    }

    @Delete(':id')
    delete(@Param('id') id:string){
        return this.genderService.delete(id);
    }
}
