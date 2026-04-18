import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectStatus } from 'src/enums/project.enum';
import { ProposalStatus } from 'src/enums/proposal.enum';
import {
  ClientProfile,
  ClientProfileDocument,
} from 'src/schemas/client-profile.schema';
import {
  FreelancerProfile,
  FreelancerProfileDocument,
} from 'src/schemas/freelancer-profile.schema';
import { Project, ProjectDocument } from 'src/schemas/project.schema';
import { Proposal, ProposalDocument } from 'src/schemas/proposal.schema';

@Injectable()
export class ProposalHelper {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
    @InjectModel(Proposal.name)
    private readonly proposalModel: Model<ProposalDocument>,
    @InjectModel(FreelancerProfile.name)
    private readonly freelancerProfileModel: Model<FreelancerProfileDocument>,
    @InjectModel(ClientProfile.name)
    private readonly clientProfileModel: Model<ClientProfileDocument>,
  ) {}

  async acceptProposalFlow(
    proposal: ProposalDocument,
    project: ProjectDocument,
  ) {
    const otherProposals = await this.proposalModel.find({
      projectId: proposal.projectId,
      _id: { $ne: proposal._id },
    });

    const freelancerIds = otherProposals.map((p) => p.freelancerId);

    await Promise.all([
      this.projectModel.findByIdAndUpdate(project._id, {
        status: ProjectStatus.IN_PROGRESS,
      }),

      this.proposalModel.updateMany(
        {
          projectId: proposal.projectId,
          _id: { $ne: proposal._id },
        },
        {
          $set: { status: ProposalStatus.REJECTED },
        },
      ),

      freelancerIds.length > 0
        ? this.freelancerProfileModel.updateMany(
            { freelancerId: { $in: freelancerIds } },
            {
              $inc: {
                pendingProposal: -1,
                rejectedProposal: 1,
              },
            },
          )
        : Promise.resolve(),

      this.freelancerProfileModel.findOneAndUpdate(
        { freelancerId: proposal.freelancerId },
        {
          $inc: {
            pendingProposal: -1,
            underImplementationProject: 1,
          },
        },
      ),

      this.clientProfileModel.findOneAndUpdate(
        { clientId: project.clientId },
        {
          $inc: { pendingProposals: -1 },
        },
      ),
    ]);
  }

  getArabicMessage(status: ProposalStatus) {
    switch (status) {
      case ProposalStatus.ACCEPTED:
        return 'تم قبول العرض بنجاح';

      case ProposalStatus.REJECTED:
        return 'تم رفض العرض بنجاح';

      default:
        return 'تم تحديث العرض';
    }
  }
}
