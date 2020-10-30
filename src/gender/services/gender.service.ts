import { Injectable, NotFoundException} from '@nestjs/common';
import { Gender } from '../interface/gender.interface';
import { CreateGenderDto } from './../dto/create-gender.dto';
import { UpdateGenderDto } from './../dto/update-gender.dto';
import { PaginationQueryDto } from 'src/shared/common/dto/pagination-query.dto';
import { GenderRepository } from '../repository/gender.repository';

@Injectable()
export class GenderService {
    constructor( 
        private readonly genderRepository: GenderRepository){}

  async  findAll(paginationQuery: PaginationQueryDto): Promise<Gender[]>{
        return this.genderRepository.findAll(paginationQuery);
    }

   async findOne(id: string): Promise<Gender>{
        const gender = await this.genderRepository.findOne(id);
        if (!gender) throw new NotFoundException(`Gender with ID ${id} was not found`);
        return gender 

    }

    async create (createGender: CreateGenderDto): Promise<Gender>{
       return this.genderRepository.create(createGender);
        
    }

    async update(id: string, updateGender: UpdateGenderDto): Promise<Gender>{
        return this.genderRepository.update(id , updateGender);

    }

    async delete(id: string): Promise<void>{
        this.genderRepository.delete(id);
    }
}
