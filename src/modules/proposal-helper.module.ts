import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Project, ProjectSchema } from 'src/schemas/project.schema';
import { Proposal, ProposalSchema } from 'src/schemas/proposal.schema';
import {
  FreelancerProfile,
  FreelancerProfileSchema,
} from 'src/schemas/freelancer-profile.schema';
import {
  ClientProfile,
  ClientProfileSchema,
} from 'src/schemas/client-profile.schema';
import { ProposalHelper } from 'src/helpers/proposal.helper';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectSchema },
      { name: Proposal.name, schema: ProposalSchema },
      { name: FreelancerProfile.name, schema: FreelancerProfileSchema },
      { name: ClientProfile.name, schema: ClientProfileSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [ProposalHelper],
  exports: [ProposalHelper],
})
export class ProposalHelperModule {}
