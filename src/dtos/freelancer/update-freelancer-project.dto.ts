import { IsOptional, IsString } from 'class-validator';

export class UpdateFreelancerProjectDto {
  @IsOptional()
  @IsString({ message: 'العنوان يجب أن يكون نصًا' })
  title?: string;

  @IsOptional()
  @IsString({ message: 'الوصف يجب أن يكون نصًا' })
  description?: string;

  @IsOptional()
  @IsString({ message: 'رابط العرض يجب أن يكون نصًا' })
  linkDemo?: string;
}