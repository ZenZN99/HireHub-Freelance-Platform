import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateClientProfileDto } from 'src/dtos/client/update-client-profile.dto';
import { UserRole } from 'src/enums/user.enum';
import {
  ClientProfile,
  ClientProfileDocument,
} from 'src/schemas/client-profile.schema';
import { AuthUser } from 'src/types/auth-user-interface';

@Injectable()
export class ClientProfileService {
  constructor(
    @InjectModel(ClientProfile.name)
    private readonly clientProfileModel: Model<ClientProfileDocument>,
    
  ) {}

  async getMyProfile(clientId: string) {
    const profile = await this.clientProfileModel.findOne({ clientId });

    if (!profile) {
      throw new NotFoundException('لم يتم العثور على الملف الشخصي');
    }

    return profile;
  }

  async updateProfile(authUser: AuthUser, data: UpdateClientProfileDto) {
    const profile = await this.clientProfileModel.findOne({
      clientId: authUser._id,
    });

    if (!profile) {
      throw new NotFoundException('لم يتم العثور على الملف الشخصي');
    }

    const isOwner = profile.clientId === authUser._id;
    const isAdmin = authUser.role === UserRole.ADMIN;

    if (!isOwner && !isAdmin) {
      throw new ForbiddenException('غير مصرح لك');
    }

    if (!data || Object.keys(data).length === 0) {
      throw new BadRequestException('لم يتم تقديم أي بيانات للتحديث');
    }

    const updatedProfile = await this.clientProfileModel.findOneAndUpdate(
      { clientId: authUser._id },
      { $set: data },
      { new: true },
    );

    return {
      success: 'تم تحديث الملف الشخصي بنجاح',
      profile: updatedProfile,
    };
  }
}
