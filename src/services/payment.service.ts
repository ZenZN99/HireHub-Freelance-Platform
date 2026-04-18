import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contract, ContractDocument } from 'src/schemas/contract.schema';
import { User, UserDocument } from 'src/schemas/user.schema';
import { AuthUser } from 'src/types/auth-user-interface';
import { UserRole } from 'src/enums/user.enum';
import { Payment, PaymentDocument } from 'src/schemas/payment.schema';
import { PaymentStatus } from 'src/enums/payment.enum';
import { Proposal, ProposalDocument } from 'src/schemas/proposal.schema';
import { NotificationService } from './notification.service';
import { NotificationType } from 'src/enums/notification.enum';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name)
    private readonly paymentModel: Model<PaymentDocument>,

    @InjectModel(Contract.name)
    private readonly contractModel: Model<ContractDocument>,

    @InjectModel(Proposal.name)
    private readonly proposalModel: Model<ProposalDocument>,

    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly notificationService: NotificationService,
  ) {}

  async createPayment(contractId: string, clientId: string) {
    const contract = await this.contractModel.findById(contractId);

    if (!contract) {
      throw new NotFoundException('العقد غير موجود');
    }

    if (contract.clientId !== clientId) {
      throw new ForbiddenException('غير مصرح لك');
    }

    const client = await this.userModel.findById(clientId);

    if (!client) {
      throw new NotFoundException('المستخدم غير موجود');
    }

    const proposal = await this.proposalModel.findById(contract.proposalId);

    if (!proposal) {
      throw new NotFoundException('العرض غير موجود');
    }

    const amount = proposal.price;

    if (client.balance < amount) {
      throw new BadRequestException('الرصيد غير كافي');
    }

    await this.userModel.findByIdAndUpdate(clientId, {
      $inc: {
        balance: -amount,
        frozenBalance: amount,
      },
    });

    const payment = await this.paymentModel.create({
      clientId,
      freelancerId: contract.freelancerId,
      contractId,
      amount,
      status: PaymentStatus.HELD,
    });

    await this.notificationService.createNotification({
      receiverId: clientId,
      senderId: contract.freelancerId,
      type: NotificationType.PROPOSAL,
      targetId: payment._id.toString(),
      isRead: false,
    });
  }

  async getPaymentsUser(id: string) {
    const payments = await this.paymentModel
      .find({ $or: [{ clientId: id, freelancerId: id }] })
      .sort({ createdAt: -1 })
      .lean();
    return payments;
  }

  async releasePayment(authUser: AuthUser, paymentId: string) {
    const payment = await this.paymentModel.findById(paymentId);

    if (!payment) {
      throw new NotFoundException('الدفع غير موجود');
    }

    const isClient = payment.clientId === authUser._id;
    const isAdmin = authUser.role === UserRole.ADMIN;

    if (!isClient && !isAdmin) {
      throw new ForbiddenException('غير مصرح لك');
    }

    if (payment.status !== PaymentStatus.HELD) {
      throw new BadRequestException('لا يمكن تحرير هذا الدفع');
    }

    await this.userModel.findByIdAndUpdate(payment.freelancerId, {
      $inc: {
        balance: payment.amount,
      },
    });

    await this.userModel.findByIdAndUpdate(payment.clientId, {
      $inc: {
        frozenBalance: -payment.amount,
      },
    });

    payment.status = PaymentStatus.RELEASED;
    payment.isReleased = true;
    payment.releasedAt = new Date();

    return payment.save();
  }

  async refundPayment(authUser: AuthUser, paymentId: string) {
    const payment = await this.paymentModel.findById(paymentId);

    if (!payment) {
      throw new NotFoundException('الدفع غير موجود');
    }

    const isAdmin = authUser.role === UserRole.ADMIN;

    if (!isAdmin) {
      throw new ForbiddenException('فقط الأدمن');
    }

    await this.userModel.findByIdAndUpdate(payment.clientId, {
      $inc: {
        balance: payment.amount,
        frozenBalance: -payment.amount,
      },
    });

    payment.status = PaymentStatus.REFUNDED;
    payment.refundedAt = new Date();

    return payment.save();
  }

  async rechargeBalance(userId: string, amount: number) {
    if (amount <= 0) throw new BadRequestException('كمية غير صالحة');

    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('المستخدم غير موجود');

    user.balance = (user.balance || 0) + amount;
    await user.save();

    return {
      success: true,
      balance: user.balance,
    };
  }
}
