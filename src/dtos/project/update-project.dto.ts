import { IsOptional, IsString, IsEnum, IsNumber, Min } from 'class-validator';
import { BudgetType, ProjectStatus } from 'src/enums/project.enum';

export class UpdateProjectDto {
  @IsOptional()
  @IsString({ message: 'العنوان يجب أن يكون نصًا' })
  title?: string;

  @IsOptional()
  @IsString({ message: 'الوصف يجب أن يكون نصًا' })
  description?: string;

  @IsOptional()
  @IsNumber({}, { message: 'الميزانية يجب أن تكون رقمًا' })
  @Min(25, { message: 'الحد الأدنى للميزانية هو 25$' })
  budget?: number;

  @IsOptional()
  @IsEnum(BudgetType, { message: 'نوع الميزانية غير صالح' })
  budgetType?: BudgetType;

  @IsOptional()
  @IsEnum(ProjectStatus, { message: 'حالة المشروع غير صالحة' })
  status?: ProjectStatus;
}
