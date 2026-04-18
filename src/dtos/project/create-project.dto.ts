import { IsString, IsNotEmpty, IsEnum, IsNumber, Min } from 'class-validator';
import { BudgetType } from 'src/enums/project.enum';

export class CreateProjectDto {
  @IsString({ message: 'العنوان يجب أن يكون نصًا' })
  @IsNotEmpty({ message: 'العنوان مطلوب' })
  title!: string;

  @IsString({ message: 'الوصف يجب أن يكون نصًا' })
  @IsNotEmpty({ message: 'الوصف مطلوب' })
  description!: string;

  @IsNumber({}, { message: 'الميزانية يجب أن تكون رقمًا' })
  @Min(25, { message: 'الحد الأدنى للميزانية هو 25$' })
  budget!: number;

  @IsEnum(BudgetType, { message: 'نوع الميزانية غير صالح' })
  budgetType!: BudgetType;
}
