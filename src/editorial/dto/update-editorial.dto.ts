import { CreateEditorialDto } from "./create-editorial.dto";
import {PartialType} from '@nestjs/mapped-types';

export  declare class UpdateEditorialDto  extends PartialType(CreateEditorialDto) {}