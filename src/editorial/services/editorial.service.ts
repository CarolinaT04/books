import { Injectable, NotFoundException} from '@nestjs/common';
import { Editorial } from '../interface/editorial.interface';
import { PaginationQueryDto } from 'src/shared/common/dto/pagination-query.dto';
import { CreateEditorialDto } from '../dto/create-editorial.dto';
import { UpdateEditorialDto } from '../dto/update-editorial.dto';
import { EditorialRepository } from '../repository/editorial.repository';


@Injectable()
export class EditorialService {
    constructor( private readonly editorialRepository: EditorialRepository){}

   async findAll( paginationQuery: PaginationQueryDto): Promise<Editorial[]>{
        return await  this.editorialRepository.findAll(paginationQuery);
    }

    async findOne ( id : string): Promise<Editorial>{
        return await this.editorialRepository.findOne(id);


    }

  async  create(createEditorialDto : CreateEditorialDto): Promise<Editorial>{
        return await this.editorialRepository.create(createEditorialDto);
    }

   async update( id: string , updateEditorialDto: UpdateEditorialDto): Promise<Editorial>{
        return await this.editorialRepository.update(id, updateEditorialDto);
    }

    async delete( id: string): Promise<void> {
       await this.editorialRepository.delete(id);
    }
    
}
