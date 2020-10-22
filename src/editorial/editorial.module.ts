import { Module } from '@nestjs/common';
import { EditorialService } from './services/editorial.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EditorialSchema } from './schema/editorial.schema';
import { EditorialController } from './controller/editorial.controller';
import { Editorial } from './interface/editorial.interface';
import { ConfigModule } from 'src/config/config.module';
import { editorialProvider } from './providers/editorial.provider';

@Module({
  imports: [ConfigModule],
  controllers: [EditorialController],
  providers: [...editorialProvider, EditorialService]
})
export class EditorialModule {}
