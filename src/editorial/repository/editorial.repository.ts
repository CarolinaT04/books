import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Editorial } from '../interface/editorial.interface';
import { Model } from 'mongoose';
import { PaginationQueryDto } from 'src/shared/common/dto/pagination-query.dto';
import { CreateEditorialDto } from '../dto/create-editorial.dto';
import { UpdateEditorialDto } from '../dto/update-editorial.dto';
import { EDITORIAL_MODEL } from 'src/shared/constants/constants';


@Injectable()
export class EditorialRepository {
    constructor(@Inject(EDITORIAL_MODEL) private readonly editorialModel: Model<Editorial>){}

   async findAll( paginationQuery: PaginationQueryDto): Promise<Editorial[]>{
    try {
        const { limit , offset} = paginationQuery;
        return this.editorialModel
        .find()
        .skip(offset)
        .limit(limit)
        .exec()
    } catch (error) {
        console.log(error);
        
    }    
    
    }

    async findOne ( id : string): Promise<Editorial>{
        try {
        const editorial = (await this.editorialModel.findOne({_id: id}).exec());
        return editorial;
        } catch (error) {
            throw new NotFoundException(error);
            
        }
        


    }

  async  create(createEditorialDto : CreateEditorialDto): Promise<Editorial>{
      try {
        const editorial = new this.editorialModel(createEditorialDto);
        const result = editorial.save();
        if(!result) {throw new NotFoundException('Editorial was not created');}
        return result;
      } catch (error) {
          throw new NotFoundException(error);
          
      }
       
    }

   async update( id: string , updateEditorialDto: UpdateEditorialDto): Promise<Editorial>{
    try {
        const editorial = await this.editorialModel
        .findByIdAndUpdate({_id: id}, { $set: updateEditorialDto}, {new: true})
        .exec();
        return editorial;
    } catch (error) {
        console.log(error);
        
    }    
    
    }

    async delete( id: string): Promise<Editorial> {
        try {
            const editorial = (await this.editorialModel.findByIdAndDelete({_id: id}));
            return editorial;
        } catch (error) {
            console.log(error);
            
        }
       
        
    }

    //PRIVATE METHOD 

    async findEditorialName(name: string): Promise<Editorial>{
        try {
           const editorial = await this.editorialModel.findOne({
               name: {
                   $regex: name,
                   $options: 'i',
                 },
           });
           return editorial;
    
        } catch (error) {
           throw new NotFoundException(error);
            
        }
        
    }
    
}
