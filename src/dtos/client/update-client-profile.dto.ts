import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CompanyName } from 'src/enums/client-profile.enum';

export class UpdateClientProfileDto {
  @IsOptional()
  @IsEnum(CompanyName, { message: 'اسم شركة غير صالح' })
  companyName?: CompanyName;

  @IsOptional()
  @IsString({ message: 'يجب أن تكون السيرة الذاتية نص' })
  bio?: string;
}
