import { Injectable, NotFoundException } from '@nestjs/common';
import { Gender } from '../entities/gender.entity';
import { Model } from 'mongoose';
import { CreateGenderDto } from './../dto/create-gender.dto';
import { UpdateGenderDto } from './../dto/update-gender.dto';
import { PaginationQueryDto } from 'src/shared/common/dto/pagination-query.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class GenderService {
    constructor(@InjectModel(Gender.name) private readonly genderModel: Model<Gender>){}

    findAll(paginationQuery: PaginationQueryDto){
        const { limit , offset} = paginationQuery;
        return this.genderModel
        .find()
        .skip(offset)
        .limit(limit)
        .exec();
    }

   async findOne(id: string): Promise<Gender>{
        const gender = (await this.genderModel.findOne({_id: id}).exec());

        if(!gender) throw new NotFoundException(`Gender ${id} not found`);
        return gender;

    }

    async create (createGender: CreateGenderDto): Promise<Gender>{

        const gender = new this.genderModel(createGender);

            return gender.save();
        
    }

    async update(id: string, updateGender: UpdateGenderDto): Promise<Gender>{
        const gender = await this.genderModel
            .findByIdAndUpdate({_id: id}, {$set: updateGender}, {new : true})
            .exec();

            if(!gender) throw new NotFoundException(`Gender ${id} not found`);

            return gender;

    }

    async delete(id: string): Promise<Gender>{
        const gender = await this.findOne(id);

        if(!gender) throw new NotFoundException(`Gender ${id} not found`);
        return gender.remove();
    }
}
