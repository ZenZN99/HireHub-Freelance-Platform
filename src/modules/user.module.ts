import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from 'src/controllers/user.controller';
import {
  ClientProfile,
  ClientProfileSchema,
} from 'src/schemas/client-profile.schema';
import { Contract, ContractSchema } from 'src/schemas/contract.schema';
import {
  FreelancerProfile,
  FreelancerProfileSchema,
} from 'src/schemas/freelancer-profile.schema';
import {
  FreelancerProject,
  FreelancerProjectSchema,
} from 'src/schemas/freelancer-project.schema';
import { Message, MessageSchema } from 'src/schemas/message.schema';
import { Payment, PaymentSchema } from 'src/schemas/payment.schema';
import { Project, ProjectSchema } from 'src/schemas/project.schema';
import { Proposal, ProposalSchema } from 'src/schemas/proposal.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { UserService } from 'src/services/user.service';
import { TokenModule } from 'src/token/token.module';
import { NotificationModule } from './notification.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: ClientProfile.name, schema: ClientProfileSchema },
    ]),
    MongooseModule.forFeature([
      { name: FreelancerProfile.name, schema: FreelancerProfileSchema },
    ]),
    MongooseModule.forFeature([
      { name: Contract.name, schema: ContractSchema },
    ]),
    MongooseModule.forFeature([
      { name: FreelancerProject.name, schema: FreelancerProjectSchema },
    ]),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
    MongooseModule.forFeature([
      { name: Proposal.name, schema: ProposalSchema },
    ]),
    NotificationModule,
    TokenModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
