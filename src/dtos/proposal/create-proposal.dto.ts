import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class CreateProposalDto {
  @IsString({ message: 'نص العرض يجب ان يكون نص' })
  @IsNotEmpty({ message: 'نص العرض مطلوب' })
  coverLetter!: string;

  @IsNumber({}, { message: 'السعر يجب ان يكون رقم' })
  @Min(25, { message: 'السعر يجب ان يكون على الأقل 25' })
  price!: number;

  @IsNumber({}, { message: 'المدة يجب ان تكون رقم' })
  @Min(1, { message: 'المدة يجب ان تكون يوم واحد على الأقل' })
  durationDays!: number;
}
