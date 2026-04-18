import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateProposalDto } from 'src/dtos/proposal/create-proposal.dto';
import { ProposalStatus } from 'src/enums/proposal.enum';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { ProposalService } from 'src/services/proposal.service';
import type { RequestWithUser } from 'src/types/express';

@Controller('/api/proposal')
@UseGuards(AuthGuard)
export class ProposalController {
  constructor(private readonly proposalService: ProposalService) {}

  @Post('create/:projectId')
  createProposal(
    @Req() req: RequestWithUser,
    @Param('projectId') projectId: string,
    @Body() data: CreateProposalDto,
  ) {
    return this.proposalService.createProposal(req.user, projectId, data);
  }

  @Get('project/:projectId')
  async getProposalByProject(
    @Param('projectId') projectId: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    return this.proposalService.getProposalByProject(
      projectId,
      Number(page) || 1,
      Number(limit) || 10,
    );
  }

  @Put('update/:proposalId')
  updateProposal(
    @Req() req: RequestWithUser,
    @Param('proposalId') proposalId: string,
    @Body() data: CreateProposalDto,
  ) {
    return this.proposalService.updateProposal(req.user, proposalId, data);
  }

  @Put('approve/:proposalId')
  approveProposalUpdate(
    @Req() req: RequestWithUser,
    @Param('proposalId') proposalId: string,
  ) {
    return this.proposalService.approveProposalUpdate(req.user, proposalId);
  }

  @Delete('delete/:proposalId')
  @UseGuards(AdminGuard)
  deleteProposal(
    @Req() req: RequestWithUser,
    @Param('proposalId') proposalId: string,
  ) {
    return this.proposalService.deleteProposal(req.user, proposalId);
  }

  @Patch('status/:proposalId')
  updateProposalStatus(
    @Req() req: RequestWithUser,
    @Param('proposalId') proposalId: string,
    @Body() status: ProposalStatus,
  ) {
    return this.proposalService.updateProposalStatus(
      req.user,
      proposalId,
      status,
    );
  }
}
