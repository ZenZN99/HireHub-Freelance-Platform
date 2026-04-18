import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Contract, ContractDocument } from 'src/schemas/contract.schema';
import { Proposal, ProposalDocument } from 'src/schemas/proposal.schema';
import { Project, ProjectDocument } from 'src/schemas/project.schema';

import {
  FreelancerProfile,
  FreelancerProfileDocument,
} from 'src/schemas/freelancer-profile.schema';
import {
  ClientProfile,
  ClientProfileDocument,
} from 'src/schemas/client-profile.schema';

import { ContractStatus, ReviewContractStatus } from 'src/enums/contract.enum';
import { ProjectStatus } from 'src/enums/project.enum';
import { ProposalStatus } from 'src/enums/proposal.enum';
import { UserRole } from 'src/enums/user.enum';

import { AuthUser } from 'src/types/auth-user-interface';
import { User, UserDocument } from 'src/schemas/user.schema';
import { NotificationService } from './notification.service';
import { NotificationType } from 'src/enums/notification.enum';

@Injectable()
export class ContractService {
  constructor(
    @InjectModel(Contract.name)
    private readonly contractModel: Model<ContractDocument>,

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
    private readonly notificationService: NotificationService,
  ) {}

  async createContract(authUser: AuthUser, proposalId: string) {
    const proposal = await this.proposalModel.findById(proposalId);
    if (!proposal) {
      throw new NotFoundException('العرض غير موجود');
    }

    if (proposal.status !== ProposalStatus.ACCEPTED) {
      throw new BadRequestException('يجب قبول العرض أولاً');
    }

    const project = await this.projectModel.findById(proposal.projectId);
    if (!project) {
      throw new NotFoundException('المشروع غير موجود');
    }

    if (project.clientId !== authUser._id) {
      throw new ForbiddenException('غير مصرح لك');
    }

    const existContract = await this.contractModel.findOne({ proposalId });
    if (existContract) {
      throw new BadRequestException('تم إنشاء العقد بالفعل');
    }

    const contract = await this.contractModel.create({
      projectId: project._id.toString(),
      proposalId: proposal._id.toString(),
      clientId: project.clientId,
      freelancerId: proposal.freelancerId,
      status: ContractStatus.ACTIVE,
      startedAt: new Date(),
      completedAt: null,
    });

    await Promise.all([
      this.notificationService.createNotification({
        receiverId: project.clientId,
        senderId: contract.freelancerId,
        type: NotificationType.CONTRACT,
        targetId: contract._id.toString(),
        isRead: false,
      }),

      this.notificationService.createNotification({
        receiverId: contract.freelancerId,
        senderId: project.clientId,
        type: NotificationType.CONTRACT,
        targetId: contract._id.toString(),
        isRead: false,
      }),
    ]);

    return {
      success: 'تم إنشاء العقد بنجاح',
      contract,
    };
  }

  async getMyContractWithUser(authUser: AuthUser, otherUserId: string) {
    const filter =
      authUser.role === UserRole.CLIENT
        ? { clientId: authUser._id, freelancerId: otherUserId }
        : { clientId: otherUserId, freelancerId: authUser._id };

    return this.contractModel.findOne(filter).lean();
  }

  async completeContract(authUser: AuthUser, contractId: string) {
    const contract = await this.contractModel.findById(contractId);
    if (!contract) {
      throw new NotFoundException('العقد غير موجود');
    }

    const isOwner = contract.clientId === authUser._id;
    const isAdmin = authUser.role === UserRole.ADMIN;

    if (!isOwner && !isAdmin) {
      throw new ForbiddenException('غير مصرح لك');
    }

    if (contract.status === ContractStatus.COMPLETED) {
      throw new BadRequestException('العقد منتهي مسبقاً');
    }

    const proposal = await this.proposalModel.findById(contract.proposalId);
    if (!proposal) {
      throw new NotFoundException('العرض غير موجود');
    }

    const price = proposal.price;

    await this.userModel.findByIdAndUpdate(contract.clientId, {
      $inc: {
        frozenBalance: -price,
      },
    });

    await this.userModel.findByIdAndUpdate(contract.freelancerId, {
      $inc: {
        balance: price,
      },
    });

    contract.status = ContractStatus.COMPLETED;
    contract.completedAt = new Date();
    await contract.save();

    await this.projectModel.findByIdAndUpdate(contract.projectId, {
      status: ProjectStatus.COMPLETED,
    });

    await this.freelancerProfileModel.findOneAndUpdate(
      { freelancerId: contract.freelancerId },
      {
        $inc: {
          completedJobs: 1,
          totalEarnings: price,
          underImplementationProject: -1,
        },
        $set: {
          lastCompletedAt: new Date(),
        },
      },
    );

    await this.clientProfileModel.findOneAndUpdate(
      { clientId: contract.clientId },
      {
        $inc: {
          completedProjects: 1,
        },
      },
    );

    await this.notificationService.createNotification({
      receiverId: contract.clientId,
      senderId: contract.freelancerId,
      type: NotificationType.CONTRACT,
      targetId: contract._id.toString(),
      isRead: false,
    });

    return {
      success: 'تم إنهاء العقد وتحويل المبلغ بنجاح',
    };
  }

  async requestCancelContract(authUser: AuthUser, contractId: string) {
    const contract = await this.contractModel.findById(contractId);

    if (!contract) {
      throw new NotFoundException('العقد غير موجود');
    }

    const isClient = contract.clientId === authUser._id;

    const isFreelancer = contract.freelancerId === authUser._id;

    if (!isClient && !isFreelancer) {
      throw new ForbiddenException('غير مصرح لك');
    }

    if (contract.status !== ContractStatus.ACTIVE) {
      throw new BadRequestException('لا يمكن طلب إلغاء هذا العقد');
    }

    if (contract.cancelRequested) {
      throw new BadRequestException('تم إرسال طلب إلغاء مسبقاً');
    }

    contract.cancelRequested = true;
    contract.cancelRequestedBy = authUser.role;
    contract.reviewContractStatus = ReviewContractStatus.PENDING;

    await contract.save();

    const receiverId =
      contract.clientId === authUser._id
        ? contract.freelancerId
        : contract.clientId;

    await this.notificationService.createNotification({
      receiverId: receiverId,
      senderId: authUser._id,
      type: NotificationType.REVIEW,
      targetId: contract._id.toString(),
      isRead: false,
    });

    return {
      success: 'تم إرسال طلب الإلغاء بانتظار الموافقة',
    };
  }

  async reviewCancelContract(
    authUser: AuthUser,
    contractId: string,
    status: ReviewContractStatus,
  ) {
    const contract = await this.contractModel.findById(contractId);

    if (!contract) {
      throw new NotFoundException('العقد غير موجود');
    }

    if (
      authUser.role !== UserRole.ADMIN &&
      authUser.role !== UserRole.SUPPORT
    ) {
      throw new ForbiddenException('غير مصرح لك');
    }

    if (
      !contract.cancelRequested ||
      contract.reviewContractStatus !== ReviewContractStatus.PENDING
    ) {
      throw new BadRequestException('لا يوجد طلب إلغاء');
    }

    if (contract.cancelRequestedBy === authUser.role) {
      throw new ForbiddenException('لا يمكنك مراجعة طلبك');
    }

    if (status === ReviewContractStatus.REJECTED) {
      contract.reviewContractStatus = ReviewContractStatus.REJECTED;
      contract.cancelRequested = false;

      await contract.save();

      await Promise.all([
        this.notificationService.createNotification({
          receiverId: contract.clientId,
          senderId: authUser._id,
          type: NotificationType.REJECTED,
          targetId: contract._id.toString(),
          isRead: false,
        }),

        this.notificationService.createNotification({
          receiverId: contract.freelancerId,
          senderId: authUser._id,
          type: NotificationType.REJECTED,
          targetId: contract._id.toString(),
          isRead: false,
        }),
      ]);

      return {
        success: 'تم رفض طلب الإلغاء',
      };
    }

    const proposal = await this.proposalModel.findById(contract.proposalId);
    if (!proposal) {
      throw new NotFoundException('العرض غير موجود');
    }

    const price = proposal.price;

    const client = await this.userModel.findById(contract.clientId);

    if (!client || client.frozenBalance < price) {
      throw new BadRequestException('الرصيد غير كافي');
    }

    await this.userModel.findByIdAndUpdate(contract.clientId, {
      $inc: {
        frozenBalance: -price,
        balance: price,
      },
    });

    proposal.status = ProposalStatus.PENDING;
    await proposal.save();

    await this.projectModel.findByIdAndUpdate(contract.projectId, {
      status: ProjectStatus.OPEN,
    });

    await this.freelancerProfileModel.findOneAndUpdate(
      { freelancerId: contract.freelancerId },
      {
        $inc: {
          underImplementationProject: -1,
        },
      },
    );

    contract.status = ContractStatus.CANCELLED;
    contract.reviewContractStatus = ReviewContractStatus.APPROVED;

    await contract.save();

    await Promise.all([
      this.notificationService.createNotification({
        receiverId: contract.clientId,
        senderId: authUser._id,
        type: NotificationType.APPROVED,
        targetId: contract._id.toString(),
        isRead: false,
      }),

      this.notificationService.createNotification({
        receiverId: contract.freelancerId,
        senderId: authUser._id,
        type: NotificationType.APPROVED,
        targetId: contract._id.toString(),
        isRead: false,
      }),
    ]);

    return {
      success: 'تمت الموافقة على الإلغاء وإرجاع المبلغ',
    };
  }

  async deleteContract(contractId: string) {
    const contract = await this.contractModel.findById(contractId);
    if (!contract) {
      throw new NotFoundException('العقد غير موجود');
    }

    if (contract.status === ContractStatus.ACTIVE) {
      throw new BadRequestException('لا يمكن حذف عقد نشط، قم بإلغائه أولاً');
    }

    await this.contractModel.findByIdAndDelete(contractId);

    return {
      success: 'تم حذف العقد بنجاح',
    };
  }
}
