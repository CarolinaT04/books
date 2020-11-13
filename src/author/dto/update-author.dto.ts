import { CreateAuthorDto } from "./create-author.dto";
import {PartialType} from '@nestjs/mapped-types';

export declare class UpdateAuthorDto  extends PartialType(CreateAuthorDto) {}