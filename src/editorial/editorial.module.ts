import { Module } from '@nestjs/common';
import { EditorialService } from './services/editorial.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Editorial, EditorialSchema } from './entities/editorial.entity';
import { EditorialController } from './controller/editorial.controller';

@Module({
  imports: [ MongooseModule.forFeature([{
   name: Editorial.name,
   schema: EditorialSchema

  }])],
  controllers: [EditorialController],
  providers: [EditorialService]
})
export class EditorialModule {}
