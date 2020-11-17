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
        return await this.genderRepository.findAll(paginationQuery);
    }

   async findOne(id: string): Promise<Gender>{
        const gender = await this.genderRepository.findOne(id);
        if (!gender) throw new NotFoundException(`Gender with ID ${id} was not found`);
        return gender 

    }

    async create (createGender: CreateGenderDto): Promise<Gender>{
        await this.genderName(createGender.description);
       return await this.genderRepository.create(createGender);
        
    }

    async update(id: string, updateGender: UpdateGenderDto): Promise<Gender>{
        await this.genderName(updateGender.description);
        const gender =  await this.genderRepository.update(id , updateGender);
        if(!gender) throw new NotFoundException(`Gender ${id} not found`);
        return gender;

    }

    async delete(id: string): Promise<Gender>{
      const gender =  await this.genderRepository.delete(id);
      if (!gender) throw new NotFoundException(`The gender with the ID ${id} provided not found`);
      return gender;
    }
// PRIVATE METHOD

    //IF GENDER NAME EXISTS
    private async genderName(description: string): Promise<Gender> {
        try {
            const gender =  await this.genderRepository.findGenderName(description);
            if(gender) throw new NotFoundException(`The gender ${description} already exists`);
            return gender;
        } catch (error) {
          throw new NotFoundException(error);
        }
     
    }
}
