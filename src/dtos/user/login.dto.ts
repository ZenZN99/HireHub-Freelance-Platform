import { IsEmail, MinLength, MaxLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'البريد الإلكتروني غير صالح' })
  email!: string;

  @MinLength(8, { message: 'كلمة المرور قصيرة جداً' })
  @MaxLength(40, { message: 'كلمة المرور طويلة جداً' })
  password!: string;
}
