import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ClientProfile,
  ClientProfileSchema,
} from 'src/schemas/client-profile.schema';
import {
  FreelancerProfile,
  FreelancerProfileSchema,
} from 'src/schemas/freelancer-profile.schema';
import { Project, ProjectSchema } from 'src/schemas/project.schema';
import { Proposal, ProposalSchema } from 'src/schemas/proposal.schema';
import { ProposalHelperModule } from './proposal-helper.module';
import { TokenModule } from 'src/token/token.module';
import { ProposalService } from 'src/services/proposal.service';
import { ProposalController } from 'src/controllers/proposal.controller';
import { NotificationModule } from './notification.module';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
  imports: [
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
    ProposalHelperModule,
    NotificationModule,
    TokenModule,
  ],
  controllers: [ProposalController],
  providers: [ProposalService],
})
export class ProposalModule {}
