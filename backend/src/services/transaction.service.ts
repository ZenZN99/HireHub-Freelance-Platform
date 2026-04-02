import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ClientSession } from 'mongoose';
import mongoose from 'mongoose';
import {
  Transaction,
  TransactionDocument,
} from 'src/schemas/transaction.schema';
import { Proposal, ProposalDocument } from 'src/schemas/proposal.schema';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Project, ProjectDocument } from 'src/schemas/project.schema';
import { ProjectStatus } from 'src/enums/project.enum';
import { NotificationService } from './notification.service';
import { NotificationType } from 'src/enums/notification.enum';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<TransactionDocument>,

    @InjectModel(Proposal.name)
    private readonly proposalModel: Model<ProposalDocument>,

    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,

    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,

    private readonly notificationService: NotificationService,
  ) {}

  async freezeBalanceByProposal(proposalId: string) {
    const session: ClientSession = await mongoose.startSession();
    session.startTransaction();

    try {
      // 1. جلب الـ Proposal
      const proposal = await this.proposalModel
        .findById(proposalId)
        .session(session);

      if (!proposal) throw new NotFoundException('Proposal not found');

      // 2. جلب المشروع
      const project = await this.projectModel
        .findById(proposal.projectId)
        .session(session);

      if (!project) throw new NotFoundException('Project not found');

      // 3. جلب العميل (صاحب المشروع)
      const client = await this.userModel
        .findById(project.clientId)
        .session(session);

      if (!client) throw new NotFoundException('Client not found');

      // 4. جلب الفريلانسر
      const freelancer = await this.userModel
        .findById(proposal.freelancerId)
        .session(session);

      if (!freelancer) throw new NotFoundException('Freelancer not found');

      // 5. التحقق من الرصيد
      const amount = proposal.price;

      if ((client.balance || 0) < amount) {
        throw new BadRequestException('Insufficient balance');
      }

      // 6. خصم الرصيد + تجميده
      client.balance -= amount;
      client.frozenBalance = (client.frozenBalance || 0) + amount;

      await client.save({ session });

      // 7. تحديث حالة المشروع
      await this.projectModel.findByIdAndUpdate(
        proposal.projectId,
        { status: ProjectStatus.IN_PROGRESS },
        { session },
      );

      // 8. إنهاء الترانزاكشن بنجاح
      await session.commitTransaction();
      session.endSession();

      // 9. إرسال إشعار
      await this.notificationService.createNotification({
        receiverId: freelancer._id.toString(),
        senderId: client._id.toString(),
        type: NotificationType.FROZEN,
        targetId: proposal._id.toString(),
        isRead: false,
      });

      // 10. رجوع النتيجة
      return {
        success: true,
        frozenAmount: amount,
        clientBalance: client.balance,
        clientFrozenBalance: client.frozenBalance,
      };
    } catch (err) {
      // في حال فشل أي خطوة
      await session.abortTransaction();
      session.endSession();
      throw err;
    }
  }

  async releaseFrozenBalanceByProposal(proposalId: string) {
    const session: ClientSession = await mongoose.startSession();
    session.startTransaction();

    try {
      const proposal = await this.proposalModel
        .findById(proposalId)
        .session(session);
      if (!proposal) throw new NotFoundException('Proposal not found');

      const freelancer = await this.userModel
        .findById(proposal.freelancerId)
        .session(session);

      const project = await this.projectModel.findById(proposal.projectId);

      const client = await this.userModel.findById(project!.clientId);

      if (!client || !freelancer || !project)
        throw new NotFoundException('Users or project not found');

      const amount = proposal.price;
      if ((client.frozenBalance || 0) < amount)
        throw new BadRequestException('Frozen balance insufficient');

      client.frozenBalance -= amount;
      freelancer.balance = (freelancer.balance || 0) + amount;

      await Promise.all([
        client.save({ session }),
        freelancer.save({ session }),
      ]);

      const transactionRecord = new this.transactionModel({
        senderId: client._id,
        receiverId: freelancer._id,
        amount,
      });

      await transactionRecord.save({ session });

      project.status = ProjectStatus.COMPLETED;
      await project.save({ session });

      await session.commitTransaction();
      session.endSession();

      await this.notificationService.createNotification({
        receiverId: freelancer._id.toString(),
        senderId: client._id.toString(),
        type: NotificationType.PAYMENT_RELEASED,
        targetId: proposal._id.toString(),
        isRead: false,
      });

      return {
        success: true,
        transaction: transactionRecord[0],
        clientBalance: client.balance,
        clientFrozenBalance: client.frozenBalance,
        freelancerBalance: freelancer.balance,
        projectStatus: project.status,
      };
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      throw err;
    }
  }

  async rechargeBalance(userId: string, amount: number) {
    if (amount <= 0) throw new BadRequestException('Invalid amount');

    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    user.balance = (user.balance || 0) + amount;
    await user.save();

    return {
      success: true,
      balance: user.balance,
    };
  }
}
