import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentController } from 'src/controllers/payment.controller';
import { Contract, ContractSchema } from 'src/schemas/contract.schema';
import { Payment, PaymentSchema } from 'src/schemas/payment.schema';
import { Proposal, ProposalSchema } from 'src/schemas/proposal.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { PaymentService } from 'src/services/payment.service';
import { TokenModule } from 'src/token/token.module';
import { NotificationModule } from './notification.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
    MongooseModule.forFeature([
      { name: Contract.name, schema: ContractSchema },
    ]),
    MongooseModule.forFeature([
      { name: Proposal.name, schema: ProposalSchema },
    ]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    NotificationModule,
    TokenModule,
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
