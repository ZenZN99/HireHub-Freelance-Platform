import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContractController } from 'src/controllers/contract.controller';
import {
  ClientProfile,
  ClientProfileSchema,
} from 'src/schemas/client-profile.schema';
import { Contract, ContractSchema } from 'src/schemas/contract.schema';
import {
  FreelancerProfile,
  FreelancerProfileSchema,
} from 'src/schemas/freelancer-profile.schema';
import { Project, ProjectSchema } from 'src/schemas/project.schema';
import { Proposal, ProposalSchema } from 'src/schemas/proposal.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { ContractService } from 'src/services/contract.service';
import { TokenModule } from 'src/token/token.module';
import { NotificationModule } from './notification.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Contract.name, schema: ContractSchema },
    ]),
    MongooseModule.forFeature([
      { name: Proposal.name, schema: ProposalSchema },
    ]),
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
    MongooseModule.forFeature([
      { name: FreelancerProfile.name, schema: FreelancerProfileSchema },
    ]),
    MongooseModule.forFeature([
      { name: ClientProfile.name, schema: ClientProfileSchema },
    ]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    NotificationModule,
    TokenModule,
  ],
  controllers: [ContractController],
  providers: [ContractService],
})
export class ContractModule {}
