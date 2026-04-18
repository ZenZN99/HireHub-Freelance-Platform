import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateFreelancerProjectDto {
  @IsString({ message: 'العنوان يجب أن يكون نصًا' })
  @IsNotEmpty({ message: 'العنوان مطلوب' })
  title!: string;

  @IsString({ message: 'الوصف يجب أن يكون نصًا' })
  @IsNotEmpty({ message: 'الوصف مطلوب' })
  description!: string;

  @IsOptional()
  @IsString({ message: 'رابط العرض يجب أن يكون نصًا' })
  linkDemo?: string;
}
