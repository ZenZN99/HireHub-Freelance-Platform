import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProposalDto } from 'src/dtos/proposal/create-proposal.dto';
import { ProposalStatus } from 'src/enums/proposal.enum';
import { UserRole } from 'src/enums/user.enum';
import { ProposalHelper } from 'src/helpers/proposal.helper';
import {
  ClientProfile,
  ClientProfileDocument,
} from 'src/schemas/client-profile.schema';
import {
  FreelancerProfile,
  FreelancerProfileDocument,
} from 'src/schemas/freelancer-profile.schema';
import { Project, ProjectDocument } from 'src/schemas/project.schema';
import { Proposal, ProposalDocument } from 'src/schemas/proposal.schema';
import { User, UserDocument } from 'src/schemas/user.schema';
import { AuthUser } from 'src/types/auth-user-interface';
import { NotificationService } from './notification.service';
import { NotificationType } from 'src/enums/notification.enum';

@Injectable()
export class ProposalService {
  constructor(
    @InjectModel(Proposal.name)
    private readonly proposalModel: Model<ProposalDocument>,
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
    @InjectModel(FreelancerProfile.name)
    private readonly freelancerProfileModel: Model<FreelancerProfileDocument>,
    @InjectModel(ClientProfile.name)
    private readonly clientProfileModel: Model<ClientProfileDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly proposalHelper: ProposalHelper,
    private readonly notificationService: NotificationService,
  ) {}

  async createProposal(
    authUser: AuthUser,
    projectId: string,
    data: CreateProposalDto,
  ) {
    const { coverLetter, price, durationDays } = data;

    const project = await this.projectModel.findById(projectId);
    if (!project) {
      throw new NotFoundException('المشروع غير متوفر');
    }

    const existingProposal = await this.proposalModel.findOne({
      projectId,
      freelancerId: authUser._id,
    });

    if (existingProposal) {
      throw new BadRequestException('لقد قمت ب تقديم عرض لهاذا مشروع مسبقاً');
    }

    const newProposal = await this.proposalModel.create({
      projectId: project._id.toString(),
      freelancerId: authUser._id,
      coverLetter,
      price,
      durationDays,
      status: ProposalStatus.PENDING,
    });

    await this.freelancerProfileModel.findOneAndUpdate(
      { freelancerId: authUser._id },
      { $inc: { pendingProposals: 1 } },
    );

    await this.clientProfileModel.findOneAndUpdate(
      { clientId: project.clientId },
      { $inc: { pendingProposals: 1 } },
    );

    await this.notificationService.createNotification({
      receiverId: project.clientId,
      senderId: authUser._id,
      type: NotificationType.PROPOSAL,
      targetId: newProposal._id.toString(),
      isRead: false,
    });

    return {
      success: 'تم إرسال العرض بنجاح',
      proposal: newProposal,
    };
  }

  async getProposalByProject(projectId: string, page = 1, limit = 10) {
    const project = await this.projectModel.findById(projectId);

    if (!project) {
      throw new NotFoundException('المشروع غير موجود');
    }

    const skip = (page - 1) * limit;

    const [proposals, total] = await Promise.all([
      this.proposalModel
        .find({ projectId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      this.proposalModel.countDocuments({ projectId }),
    ]);

    const hasMore = skip + proposals.length < total;

    return {
      proposals,
      pagination: {
        page,
        limit,
        total,
        hasMore,
      },
    };
  }
  async updateProposal(
    authUser: AuthUser,
    proposalId: string,
    data: CreateProposalDto,
  ) {
    const proposal = await this.proposalModel.findById(proposalId);

    if (!proposal) {
      throw new NotFoundException('العرض غير موجود');
    }

    if (proposal.freelancerId.toString() !== authUser._id.toString()) {
      throw new ForbiddenException('غير مصرح لك');
    }

    if (proposal.isUpdatePending) {
      throw new BadRequestException('يوجد تعديل قيد المراجعة بالفعل');
    }

    const project = await this.projectModel.findById(proposal.projectId);

    if (!project) {
      throw new NotFoundException('المشروع غير موجود');
    }

    proposal.pendingPrice = data.price;
    proposal.pendingDurationDays = data.durationDays;
    proposal.isUpdatePending = true;

    await proposal.save();

    await this.notificationService.createNotification({
      receiverId: project.clientId,
      senderId: authUser._id,
      type: NotificationType.PROPOSAL,
      targetId: proposal._id.toString(),
      isRead: false,
    });

    return {
      success: 'تم إرسال التعديل ويحتاج موافقة صاحب المشروع',
      proposal,
    };
  }

  async approveProposalUpdate(authUser: AuthUser, proposalId: string) {
    const proposal = await this.proposalModel.findById(proposalId);

    if (!proposal) {
      throw new NotFoundException('العرض غير موجود');
    }

    const project = await this.projectModel.findById(proposal.projectId);

    if (!project) {
      throw new NotFoundException('المشروع غير موجود');
    }

    if (project.clientId !== authUser._id) {
      throw new ForbiddenException('فقط صاحب المشروع يمكنه الموافقة');
    }

    if (proposal.isUpdatePending) {
      proposal.price = proposal.pendingPrice!;
      proposal.durationDays = proposal.pendingDurationDays!;

      proposal.pendingPrice = undefined;
      proposal.pendingDurationDays = undefined;

      proposal.isUpdatePending = false;
    }

    await proposal.save();

    await this.notificationService.createNotification({
      receiverId: proposal.freelancerId,
      senderId: authUser._id,
      type: NotificationType.PROPOSAL,
      targetId: proposal._id.toString(),
      isRead: false,
    });

    return {
      success: 'تم قبول التعديل',
      proposal,
    };
  }

  async deleteProposal(authUser: AuthUser, proposalId: string) {
    if (authUser.role !== UserRole.ADMIN) {
      throw new ForbiddenException('فقط المسؤول يمكنه الحذف');
    }

    const proposal = await this.proposalModel.findById(proposalId);

    if (!proposal) {
      throw new NotFoundException('العرض غير موجود');
    }

    await this.proposalModel.findByIdAndDelete(proposalId);

    return {
      success: 'تم حذف العرض بواسطة المسؤول',
    };
  }

  async updateProposalStatus(
    authUser: AuthUser,
    proposalId: string,
    status: ProposalStatus,
  ) {
    const proposal = await this.proposalModel.findById(proposalId);

    if (!proposal) {
      throw new NotFoundException('العرض غير موجود');
    }

    const project = await this.projectModel.findById(proposal.projectId);

    if (!project) {
      throw new NotFoundException('المشروع غير موجود');
    }

    const isOwner = project.clientId === authUser._id;
    const isAdmin = authUser.role === UserRole.ADMIN;

    if (!isOwner && !isAdmin) {
      throw new ForbiddenException('غير مصرح لك');
    }

    if (proposal.status !== ProposalStatus.PENDING) {
      throw new BadRequestException('تم معالجة هذا العرض مسبقاً');
    }

    if (status === ProposalStatus.ACCEPTED) {
      const client = await this.userModel.findById(project.clientId);

      if (!client) {
        throw new NotFoundException('العميل غير موجود');
      }

      const price = proposal.price;

      if (client.balance < price) {
        throw new BadRequestException('الرصيد غير كافي');
      }

      await this.userModel.findByIdAndUpdate(client._id, {
        $inc: {
          balance: -price,
          frozenBalance: price,
        },
      });
    }

    proposal.status = status;
    await proposal.save();

    if (status === ProposalStatus.ACCEPTED) {
      await this.proposalHelper.acceptProposalFlow(proposal, project);

      await this.notificationService.createNotification({
        receiverId: proposal.freelancerId.toString(),
        senderId: authUser._id,
        type: NotificationType.PROPOSAL,
        targetId: proposal._id.toString(),
        isRead: false,
      });
    }

    return {
      success: this.proposalHelper.getArabicMessage(status),
      proposal,
    };
  }
}
