import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Editorial } from '../interface/editorial.interface';
import { Model } from 'mongoose';
import { PaginationQueryDto } from 'src/shared/common/dto/pagination-query.dto';
import { CreateEditorialDto } from '../dto/create-editorial.dto';
import { UpdateEditorialDto } from '../dto/update-editorial.dto';
import { EDITORIAL_MODEL } from 'src/shared/constants/constants';


@Injectable()
export class EditorialService {
    constructor(@Inject(EDITORIAL_MODEL) private readonly editorialModel: Model<Editorial>){}

    findAll( paginationQuery: PaginationQueryDto){
        const { limit , offset} = paginationQuery;
        return this.editorialModel
        .find()
        .skip(offset)
        .limit(limit)
        .exec()
    }

    async findOne ( id : string): Promise<Editorial>{
        const editorial = (await this.editorialModel.findOne({_id: id}).exec());

        if(!editorial) throw new NotFoundException(`Editorial ${id} not found`);
        return editorial;


    }

  async  create(createEditorialDto : CreateEditorialDto): Promise<Editorial>{
        const editorial = new this.editorialModel(createEditorialDto);
        return editorial.save();
    }

   async update( id: string , updateEditorialDto: UpdateEditorialDto): Promise<Editorial>{
        const editorial = await this.editorialModel
        .findByIdAndUpdate({_id: id}, { $set: updateEditorialDto}, {new: true})
        .exec();

        if(!editorial) throw new NotFoundException(`Editorial ${id} not found`);
        return editorial;
    }

    async delete( id: string): Promise<Editorial> {
        const editorial = await this.findOne(id);
        if(!editorial) throw new NotFoundException(`Editorial ${id} not found`);
        return editorial.remove();
    }
    
}
