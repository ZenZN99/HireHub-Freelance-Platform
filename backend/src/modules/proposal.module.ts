import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Proposal, ProposalSchema } from 'src/schemas/proposal.schema';
import { TokenModule } from 'src/token/token.module';
import { ProposalController } from 'src/controllers/proposal.controller';
import { ProposalService } from 'src/services/proposal.service';
import { Project, ProjectSchema } from 'src/schemas/project.schema';
import { NotificationModule } from './notification.module';
import { FreelancerProfile, FreelancerProfileSchema } from 'src/schemas/freelancer-profile.schema';
import { ClientProfile, ClientProfileSchema } from 'src/schemas/client-profile.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Proposal.name, schema: ProposalSchema },
    ]),
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
    MongooseModule.forFeature([{ name: FreelancerProfile.name, schema: FreelancerProfileSchema }]),
    MongooseModule.forFeature([{ name: ClientProfile.name, schema: ClientProfileSchema }]),
    NotificationModule,
    TokenModule,
  ],
  controllers: [ProposalController],
  providers: [ProposalService],
})
export class ProposalModule {}
