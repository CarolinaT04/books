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
        const editorial =  await this.editorialRepository.findOne(id);
        if(!editorial) throw new NotFoundException(`Editorial ${id} not found`);
        return editorial;


    }

  async  create(createEditorialDto : CreateEditorialDto): Promise<Editorial>{
      await this.findName(createEditorialDto.name);
        return await this.editorialRepository.create(createEditorialDto);
    }

   async update( id: string , updateEditorialDto: UpdateEditorialDto): Promise<Editorial>{
        await this.findName(updateEditorialDto.name);
        const editorial = await this.editorialRepository.update(id, updateEditorialDto);
        if(!editorial) throw new NotFoundException(`Editorial ${id} not found`);
        return editorial;
    }

    async delete( id: string): Promise<Editorial> {
       const editorial = await this.editorialRepository.delete(id);
       if(!editorial) throw new NotFoundException(`Editorial ${id} not found`);
       return editorial;
    }
    
    //Private Methods

    async findName(name: string): Promise<Editorial>{
       const editorial = this.editorialRepository.findEditorialName(name);
       if (editorial) throw new NotFoundException(`The editorial ${name} already exists`);
       return editorial;
    }
}
