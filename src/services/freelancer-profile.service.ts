import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateFreelancerProfileDto } from 'src/dtos/freelancer/update-freelancer-profile.dto';
import { Skills } from 'src/enums/freelancer-profile.enum';
import { UserRole } from 'src/enums/user.enum';
import {
  FreelancerProfile,
  FreelancerProfileDocument,
} from 'src/schemas/freelancer-profile.schema';
import { AuthUser } from 'src/types/auth-user-interface';

@Injectable()
export class FreelancerProfileService {
  constructor(
    @InjectModel(FreelancerProfile.name)
    private readonly freelancerProfileModel: Model<FreelancerProfileDocument>,
  ) {}

  async getMyProfile(freelancerId: string) {
    const profile = await this.freelancerProfileModel.findOne({ freelancerId });
    if (!profile) {
      throw new NotFoundException('لم يتم العثور على الملف الشخصي');
    }
    return profile;
  }

  async updateProfile(authUser: AuthUser, data: UpdateFreelancerProfileDto) {
    const profile = await this.freelancerProfileModel.findOne({
      freelancerId: authUser._id,
    });

    if (!profile) {
      throw new NotFoundException('لم يتم العثور على الملف الشخصي');
    }

    const isOwner = profile.freelancerId === authUser._id;
    const isAdmin = authUser.role === UserRole.ADMIN;

    if (!isOwner && !isAdmin) {
      throw new ForbiddenException('غير مصرح لك');
    }

    const hasData = Object.values(data).some((value) => value !== undefined);

    if (!hasData) {
      throw new BadRequestException('لم يتم إرسال أي بيانات للتحديث');
    }

    if (data.skills) {
      if (data.skills.includes(Skills.NO_SKILLS) && data.skills.length > 1) {
        throw new BadRequestException(
          '"بدون مهارات" يجب أن تكون القيمة الوحيدة عند اختيارها',
        );
      }

      if (data.skills.length === 0) {
        data.skills = [Skills.NO_SKILLS];
      }
    }

    const updatedProfile = await this.freelancerProfileModel.findByIdAndUpdate(
      profile._id,
      { $set: data },
      { new: true },
    );

    return {
      success: 'تم تحديث الملف الشخصي بنجاح',
      profile: updatedProfile,
    };
  }
}
