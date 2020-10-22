import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Gender } from '../interface/gender.interface';
import { Model } from 'mongoose';
import { CreateGenderDto } from './../dto/create-gender.dto';
import { UpdateGenderDto } from './../dto/update-gender.dto';
import { PaginationQueryDto } from 'src/shared/common/dto/pagination-query.dto';
import { InjectModel } from '@nestjs/mongoose';
import { GENDER_MODEL } from 'src/shared/constants/constants';

@Injectable()
export class GenderRepository {
    constructor(@Inject(GENDER_MODEL) private readonly genderModel: Model<Gender>){}

    findAll(paginationQuery: PaginationQueryDto){
    try{
        const { limit , offset} = paginationQuery;
        return this.genderModel
        .find()
        .skip(offset)
        .limit(limit)
        .exec();
    }catch(err){
        throw new Error(err);
    }
    }

   async findOne(id: string): Promise<Gender>{
    try{
        const gender = (await this.genderModel.findOne({_id: id}).exec());
        return gender;
    }catch(err){
        throw new NotFoundException(err , `Gender #${id} not found`);
    }

    }

    async create (createGender: CreateGenderDto): Promise<Gender>{
      try{
        const gender =  new this.genderModel(createGender);
        const result = await gender.save();
        if (!result) throw new Error ('something happens');
            return result;
      }catch(err){
       throw new Error(err);
      }
        
    }

    async update(id: string, updateGender: UpdateGenderDto): Promise<Gender>{
    try{
        const gender = await this.genderModel
            .findByIdAndUpdate({_id: id}, {$set: updateGender}, {new : true})
            .exec();

            if(!gender) throw new NotFoundException(`Gender ${id} not found`);

            return gender;
    }catch(err){
        throw new Error(err);
    }

    }

    async delete(id: string): Promise<void>{

    try{
        const gender =  (await this.genderModel.deleteOne({_id: id})).deletedCount;
        if(gender <= 0 ) throw new NotFoundException(`Gender ${id} not found`);
    }catch(err){
        throw new Error(err);
    }
    }

}
