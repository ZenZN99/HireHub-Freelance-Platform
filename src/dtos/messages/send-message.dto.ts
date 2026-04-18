import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SendMessageDto {
  @IsString({ message: 'معرف المستلم يجب أن يكون نص' })
  @IsNotEmpty({ message: 'معرف المستلم مطلوب' })
  receiverId!: string;

  @IsOptional()
  @IsString({ message: 'المحتوى يجب أن يكون نص' })
  content?: string;
}
