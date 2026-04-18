import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from 'src/schemas/message.schema';
import { Contract, ContractDocument } from 'src/schemas/contract.schema';
import { uploadToCloudinary } from 'src/libs/cloudinary';
import { SendMessageDto } from 'src/dtos/messages/send-message.dto';
import { NotificationService } from './notification.service';
import { NotificationType } from 'src/enums/notification.enum';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<MessageDocument>,
    @InjectModel(Contract.name)
    private readonly contractModel: Model<ContractDocument>,
    private readonly notificationService: NotificationService,
  ) {}

  async sendMessage(
    senderId: string,
    contractId: string,
    data: SendMessageDto,
    file?: Express.Multer.File,
  ) {
    const { receiverId, content } = data;

    if (!contractId) throw new BadRequestException('معرف العقد مطلوب');

    const contract = await this.contractModel.findById(contractId);
    if (!contract) throw new NotFoundException('لم يتم العثور على العقد');

    if (senderId !== contract.clientId && senderId !== contract.freelancerId) {
      throw new ForbiddenException('أنت لست طرفاً في هذا العقد');
    }

    if ((!content || content.trim() === '') && !file) {
      throw new BadRequestException(
        'يجب أن تحتوي الرسالة على نص أو صورة واحدة على الأقل',
      );
    }

    let imageUrl = '';
    if (file) {
      const uploadResult = await uploadToCloudinary(file, 'messages');
      imageUrl = uploadResult.secure_url;
    }

    const message = await this.messageModel.create({
      senderId,
      receiverId,
      contractId,
      content: content || '',
      image: imageUrl,
      isRead: false,
    });

    await this.notificationService.createNotification({
      receiverId,
      senderId,
      type: NotificationType.MESSAGE,
      targetId: message._id.toString(),
      isRead: false,
    });

    return message;
  }

  async getChatMessages(
    userId: string,
    contractId: string,
    otherUserId: string,
  ) {
    const contract = await this.contractModel.findById(contractId);
    if (!contract) throw new NotFoundException('لم يتم العثور على العقد');

    if (userId !== contract.clientId && userId !== contract.freelancerId) {
      throw new ForbiddenException('أنت لست طرفاً في هذا العقد');
    }

    return await this.messageModel
      .find({
        contractId,
        $or: [
          { senderId: userId, receiverId: otherUserId },
          { senderId: otherUserId, receiverId: userId },
        ],
      })
      .sort({ createdAt: 1 });
  }

  async deleteMessage(userId: string, messageId: string) {
    const message = await this.messageModel.findOneAndDelete({
      _id: messageId,
      senderId: userId,
    });

    if (!message)
      throw new BadRequestException(
        'لم يتم العثور على الرسالة أو أنك لست المرسل',
      );

    return { success: 'تم حذف الرسالة بنجاح', message };
  }

  async markMessageAsRead(
    userId: string,
    senderId: string,
    contractId: string,
  ) {
    const contract = await this.contractModel.findById(contractId);
    if (!contract) throw new NotFoundException('لم يتم العثور على العقد');

    if (userId !== contract.clientId && userId !== contract.freelancerId) {
      throw new ForbiddenException('أنت لست طرفاً في هذا العقد');
    }

    const result = await this.messageModel.updateMany(
      { senderId, receiverId: userId, contractId, isRead: false },
      { $set: { isRead: true } },
    );

    return {
      success: 'تم وضع علامة "مقروء" على الرسائل بنجاح',
      modifiedCount: result.modifiedCount,
    };
  }
}
