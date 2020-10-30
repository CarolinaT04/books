import { Module } from '@nestjs/common';
import { EditorialService } from './services/editorial.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EditorialSchema } from './schema/editorial.schema';
import { EditorialController } from './controller/editorial.controller';
import { Editorial } from './interface/editorial.interface';
import { ConfigModule } from 'src/config/config.module';
import { editorialProvider } from './providers/editorial.provider';
import { EditorialRepository } from './repository/editorial.repository';

@Module({
  imports: [ConfigModule],
  controllers: [EditorialController],
  providers: [...editorialProvider, EditorialService, EditorialRepository],
  exports:[ EditorialService, EditorialRepository]
})
export class EditorialModule {}
