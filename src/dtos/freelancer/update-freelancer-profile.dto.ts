import {
  IsEnum,
  IsOptional,
  IsString,
  IsArray,
  ArrayMaxSize,
  IsNumber,
  Min,
  ArrayUnique,
} from 'class-validator';
import { JobTitle, Skills } from 'src/enums/freelancer-profile.enum';

export class UpdateFreelancerProfileDto {
  @IsOptional()
  @IsEnum(JobTitle, { message: 'المسمى الوظيفي غير صالح' })
  jobTitle?: JobTitle;

  @IsOptional()
  @IsString({ message: 'يجب أن تكون النبذة نصًا' })
  bio?: string;

  @IsOptional()
  @IsArray({ message: 'يجب أن تكون المهارات على شكل قائمة' })
  @ArrayMaxSize(10, { message: 'الحد الأقصى للمهارات هو 10' })
  @ArrayUnique({ message: 'يجب ألا تحتوي المهارات على تكرار' })
  @IsEnum(Skills, {
    each: true,
    message: 'تحتوي القائمة على مهارات غير صالحة',
  })
  skills?: Skills[];

  @IsOptional()
  @IsNumber({}, { message: 'يجب أن يكون السعر رقمًا' })
  @Min(0, { message: 'يجب أن يكون السعر أكبر من أو يساوي 0' })
  hourlyRate?: number;
}
