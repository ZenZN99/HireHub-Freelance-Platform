import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { UserRole, VerificationStatus } from 'src/enums/user.enum';
import { User, UserDocument } from 'src/schemas/user.schema';
import cloudinary, { uploadToCloudinary } from 'src/libs/cloudinary';
import { Response } from 'express';
import {
  ClientProfile,
  ClientProfileDocument,
} from 'src/schemas/client-profile.schema';
import {
  FreelancerProfile,
  FreelancerProfileDocument,
} from 'src/schemas/freelancer-profile.schema';
import { TokenService } from 'src/token/token.service';
import { AuthUser } from 'src/types/auth-user-interface';
import { SignupDto } from 'src/dtos/user/signup.dto';
import { LoginDto } from 'src/dtos/user/login.dto';
import { NotificationService } from './notification.service';
import { NotificationType } from 'src/enums/notification.enum';
import { Contract, ContractDocument } from 'src/schemas/contract.schema';
import {
  FreelancerProject,
  FreelancerProjectDocument,
} from 'src/schemas/freelancer-project.schema';
import { Message, MessageDocument } from 'src/schemas/message.schema';
import { Payment, PaymentDocument } from 'src/schemas/payment.schema';
import { Project, ProjectDocument } from 'src/schemas/project.schema';
import { Proposal, ProposalDocument } from 'src/schemas/proposal.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(ClientProfile.name)
    private readonly clientProfileModel: Model<ClientProfileDocument>,
    @InjectModel(FreelancerProfile.name)
    private readonly freelancerProfileModel: Model<FreelancerProfileDocument>,
    @InjectModel(Contract.name)
    private readonly contractModel: Model<ContractDocument>,
    @InjectModel(FreelancerProject.name)
    private readonly freelancerProjectModel: Model<FreelancerProjectDocument>,
    @InjectModel(Message.name)
    private readonly messageModel: Model<MessageDocument>,
    @InjectModel(Payment.name)
    private readonly paymentModel: Model<PaymentDocument>,
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
    @InjectModel(Proposal.name)
    private readonly proposalModel: Model<ProposalDocument>,
    private readonly notificationService: NotificationService,
    private readonly tokenService: TokenService,
  ) {}

  private getCookieOptions(isLogout = false) {
    return {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      maxAge: isLogout ? 0 : 365 * 24 * 60 * 60 * 1000,
    };
  }

  async signup(data: SignupDto, res: Response) {
    const { fullname, email, password } = data;

    const existEmail = await this.userModel
      .findOne({ email })
      .select('+password');
    if (existEmail) {
      throw new BadRequestException(
        'يرجى التحقق من معلوماتك والمحاولة مرة أخرى',
      );
    }

    const hahed = await bcrypt.hash(password, 12);

    const newUser = await this.userModel.create({
      fullname,
      email,
      password: hahed,
      avatar:
        'https://res.cloudinary.com/dgagbheuj/image/upload/v1763194734/avatar-default-image_yc4xy4.jpg',
      role: UserRole.CLIENT,
      balance: 0,
      frozenBalance: 0,
    });

    if (newUser.role === UserRole.FREELANCER) {
      await this.freelancerProfileModel.create({
        freelancerId: newUser._id.toString(),
      });
    }

    if (newUser.role === UserRole.CLIENT) {
      await this.clientProfileModel.create({
        clientId: newUser._id.toString(),
      });
    }

    const token = this.tokenService.generateToken({
      _id: newUser._id.toString(),
      role: newUser.role,
    });

    res.cookie('token', token, this.getCookieOptions());

    return {
      success: 'تم إنشاء الحساب بنجاح',
      user: {
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        avatar: newUser.avatar,
        role: newUser.role,
        balance: newUser.balance,
        frozenBalance: newUser.frozenBalance,
      },
    };
  }

  async login(data: LoginDto, res: Response) {
    const { email, password } = data;

    const user = await this.userModel.findOne({ email }).select('+password');
    if (!user) {
      throw new BadRequestException(
        'كلمة المرور أو البريد الإلكتروني غير صحيح',
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException(
        'كلمة المرور أو البريد الإلكتروني غير صحيح',
      );
    }

    const token = this.tokenService.generateToken({
      _id: user._id.toString(),
      role: user.role,
    });

    res.cookie('token', token, this.getCookieOptions());

    return {
      success: 'تم تسجيل الدخول بنجاح',
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        balance: user.balance,
        frozenBalance: user.frozenBalance,
      },
    };
  }

  async logout(res: Response) {
    res.clearCookie('token', this.getCookieOptions(true));

    return {
      success: 'تم تسجيل الخروج بنجاح',
    };
  }

  async me(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('لم يتم العثور على المستخدم');
    }

    return {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      balance: user.balance,
      frozenBalance: user.frozenBalance,
    };
  }
  async updateAvatar(authUser: AuthUser, file?: Express.Multer.File) {
    const user = await this.userModel.findById(authUser._id);
    if (!user) {
      throw new UnauthorizedException('لم يتم العثور على المستخدم');
    }

    if (!file) {
      throw new BadRequestException('ملف الصورة الرمزية مطلوب');
    }

    const extractPublicId = (url: string): string => {
      const parts = url.split('/');
      const file = parts.pop()!;
      return file.split('.')[0];
    };

    if (
      user.avatar?.includes('res.cloudinary.com') &&
      !user.avatar.includes('avatar-default-image')
    ) {
      const oldId = extractPublicId(user.avatar);
      await cloudinary.v2.uploader.destroy(`users/avatars/${oldId}`);
    }

    const avatarUpload = await uploadToCloudinary(file, 'users/avatars');

    user.avatar = avatarUpload.secure_url;
    await user.save();

    return {
      success: 'تم تحديث الملف الشخصي بنجاح',
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      },
    };
  }
  async getAllUsers(userId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.userModel
        .find({ _id: { $ne: userId } })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      this.userModel.countDocuments({ _id: { $ne: userId } }),
    ]);

    const hasMore = skip + users.length < total;

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        hasMore,
      },
    };
  }

  async getUserById(id: string) {
    const user = await this.userModel.findById(id).lean();
    if (!user) {
      throw new NotFoundException('لم يتم العثور على المستخدم');
    }
    return user;
  }

  async deleteUserById(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('لم يتم العثور على المستخدم');
    }

    const extractPublicId = (url: string): string => {
      const parts = url.split('/');
      const file = parts.pop()!;
      return file.split('.')[0];
    };

    try {
      if (user.avatar && !user.avatar.includes('avatar-default-image')) {
        const oldAvatarId = extractPublicId(user.avatar);
        await cloudinary.v2.uploader.destroy(`users/avatars/${oldAvatarId}`);
      }
    } catch (err) {
      console.warn('Failed to delete avatar:', err);
    }

    await this.freelancerProfileModel.deleteMany({ freelancerId: id });
    await this.clientProfileModel.deleteMany({ clientId: id });

    await this.contractModel.deleteMany({
      $or: [{ clientId: id }, { freelancerId: id }],
    });

    await this.projectModel.deleteMany({
      clientId: id,
    });

    await this.freelancerProjectModel.deleteMany({
      freelancerId: id,
    });

    await this.proposalModel.deleteMany({
      freelancerId: id,
    });

    await this.messageModel.deleteMany({
      $or: [{ senderId: id }, { receiverId: id }],
    });

    await this.paymentModel.deleteMany({
      $or: [{ clientId: id }, { freelancerId: id }],
    });

    await user.deleteOne();

    return {
      success: 'تم حذف المستخدم وكل بياناته بنجاح',
    };
  }

  async updateUserRole(authUser: AuthUser, userId: string, role: UserRole) {
    const admin = await this.userModel.findById(authUser._id);

    if (!admin || admin.role !== UserRole.ADMIN) {
      throw new UnauthorizedException('فقط المسؤولين');
    }

    const allowedRoles = [
      UserRole.CLIENT,
      UserRole.FREELANCER,
      UserRole.SUPPORT,
    ];

    if (!allowedRoles.includes(role)) {
      throw new BadRequestException('الدور غير صالح');
    }

    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException('لم يتم العثور على المستخدم');
    }

    user.role = role;
    await user.save();

    return {
      success: 'تم تحديث دور المستخدم بنجاح',
      user,
    };
  }

  async uploadIdentity(
    authUser: AuthUser,
    files: { idCard?: Express.Multer.File[]; selfie?: Express.Multer.File[] },
  ) {
    const user = await this.userModel.findById(authUser._id);

    if (!user) {
      throw new NotFoundException('لم يتم العثور على مستخدم');
    }

    if (!files.idCard || !files.selfie) {
      throw new BadRequestException('Both images are required');
    }

    const idCardUpload = await uploadToCloudinary(files.idCard[0], 'kyc');
    const selfieUpload = await uploadToCloudinary(files.selfie[0], 'kyc');

    user.idCardImage = idCardUpload.secure_url;
    user.selfieImage = selfieUpload.secure_url;

    if (user.verificationStatus === VerificationStatus.VERIFIED) {
      throw new BadRequestException('انت موثوق بالفعل');
    }

    user.verificationStatus = VerificationStatus.PENDING;

    await user.save();

    const admins = await this.userModel.find({
      role: { $in: [UserRole.ADMIN, UserRole.SUPPORT] },
    });

    await Promise.all(
      admins.map((admin) =>
        this.notificationService.createNotification({
          receiverId: admin._id.toString(),
          senderId: user._id.toString(),
          type: NotificationType.VERIFY,
          targetId: user._id.toString(),
          isRead: false,
        }),
      ),
    );

    return {
      success: 'تم إرسال التحقق بنجاح',
      status: user.verificationStatus,
    };
  }

  async getVerificationRequests(admin: AuthUser) {
    if (admin.role !== UserRole.ADMIN) {
      throw new ForbiddenException('فقط مسؤولين');
    }

    const users = await this.userModel
      .find({ verificationStatus: VerificationStatus.PENDING })
      .select(
        'fullname email avatar idCardImage selfieImage verificationStatus createdAt',
      )
      .sort({ createdAt: -1 })
      .lean();

    return {
      success: true,
      count: users.length,
      users,
    };
  }

  async verifyUser(
    admin: AuthUser,
    userId: string,
    status: VerificationStatus,
  ) {
    if (admin.role !== UserRole.ADMIN) {
      throw new ForbiddenException('فقط مسؤولين');
    }

    const allowedStatus = [
      VerificationStatus.VERIFIED,
      VerificationStatus.REJECTED,
    ];

    if (!allowedStatus.includes(status)) {
      throw new BadRequestException('الحالة غير صالحة');
    }

    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException('لم يتم العثور على مستخدم');
    }

    user.verificationStatus = status;

    await user.save();

    await this.notificationService.createNotification({
      receiverId: user._id.toString(),
      senderId: admin._id.toString(),
      type: NotificationType.VERIFY,
      targetId: user._id.toString(),
      isRead: false,
    });

    return {
      success: `User ${status.toLowerCase()} successfully`,
      user: {
        _id: user._id,
        fullname: user.fullname,
        verificationStatus: user.verificationStatus,
      },
    };
  }
}
