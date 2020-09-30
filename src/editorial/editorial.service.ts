import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Editorial } from './entities/editorial.entity';
import { Model } from 'mongoose';
import { PaginationQueryDto } from 'src/shared/common/dto/pagination-query.dto';
import { CreateEditorialDto } from './dto/create-editorial.dto';
import { UpdateEditorialDto } from './dto/update-editorial.dto';


@Injectable()
export class EditorialService {
    constructor(@InjectModel(Editorial.name) private readonly editorialModel: Model<Editorial>){}

    findAll( paginationQuery: PaginationQueryDto){
        const { limit , offset} = paginationQuery;
        return this.editorialModel
        .find()
        .skip(offset)
        .limit(limit)
        .exec()
    }

    async findOne ( id : string){
        const editorial = await this.editorialModel.findById(id);
        return editorial;


    }

    create(createEditorialDto : CreateEditorialDto){
        const editorial = new this.editorialModel(createEditorialDto);
        return editorial.save();
    }

   async update( id: string , updateEditorialDto: UpdateEditorialDto){
        const editorial = ( await this.editorialModel
        .findByIdAndUpdate({_id: id}, { $set: updateEditorialDto}, {new: true}));
        return editorial;
    }

    async delete( id: string) {
        const editorial = await this.editorialModel.findByIdAndDelete(id);
        return editorial;
    }
    
}
