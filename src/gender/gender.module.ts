import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GenderSchema } from './schema/gender.schema';
import { GenderController } from './.../../controller/gender.controller';
import { GenderService } from './.../../services/gender.service';
import { BooksModule } from 'src/books/books.module';
import { Gender } from './interface/gender.interface';
import { GenderRepository } from './repository/gender.repository';
import { ConfigModule } from 'src/config/config.module';
import { genderProvider } from './providers/gender.provider';

@Module({
    imports: [ConfigModule, forwardRef(() => BooksModule)],
    controllers: [GenderController],
    providers: [...genderProvider, GenderService, GenderRepository],
    exports: [GenderService, GenderRepository]

})
export class GenderModule {}
