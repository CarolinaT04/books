import { Controller, Get, Post, Patch, Delete, Query, Body, Param } from '@nestjs/common';
import { PaginationQueryDto } from 'src/shared/common/dto/pagination-query.dto';
import { GenderService } from './gender.service';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';

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
    create(@Body() createGenderDto: CreateGenderDto){
     return this.genderService.create(createGenderDto);
     
    }

    @Patch()
    update(@Param('id') id: string, @Body()  updateGender: UpdateGenderDto){
      return this.genderService.update(id , updateGender);
    }

    @Delete()
    delete(@Param('id') id:string){
        return this.genderService.delete(id);
    }
}
