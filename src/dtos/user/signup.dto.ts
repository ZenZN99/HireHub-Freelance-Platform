import { IsEmail, IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';

export class SignupDto {
  @IsString({ message: 'الاسم يجب أن يكون نص' })
  @IsNotEmpty({message: "الاسم الكامل مطلوب"})
  @MinLength(3, { message: 'الاسم قصير جداً' })
  @MaxLength(50, { message: 'الاسم طويل جداً' })
  fullname!: string;

  @IsEmail({}, { message: 'البريد الإلكتروني غير صالح' })
  @IsNotEmpty({message: "البريد مطلوب"})
  email!: string;

  @IsString({ message: 'كلمة المرور يجب أن تكون نص' })
  @IsNotEmpty({message: "كلمة المرور مطلوبة"})
  @MinLength(8, { message: 'كلمة المرور قصيرة جداً' })
  @MaxLength(40, { message: 'كلمة المرور طويلة جداً' })
  password!: string;
}
