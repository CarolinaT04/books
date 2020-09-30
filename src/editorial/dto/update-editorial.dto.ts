import { CreateEditorialDto } from "./create-editorial.dto";
import {PartialType} from '@nestjs/mapped-types';

export class UpdateEditorialDto  extends PartialType(CreateEditorialDto) {}