import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ReviewContractStatus } from 'src/enums/contract.enum';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { ContractService } from 'src/services/contract.service';
import type { RequestWithUser } from 'src/types/express';

@Controller('/api/contract')
@UseGuards(AuthGuard)
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Post('create/:proposalId')
  createContract(
    @Req() req: RequestWithUser,
    @Param('proposalId') proposalId: string,
  ) {
    return this.contractService.createContract(req.user, proposalId);
  }

  @Get('with/:userId')
  getMyContractWithUser(
    @Req() req: RequestWithUser,
    @Param('userId') userId: string,
  ) {
    return this.contractService.getMyContractWithUser(req.user, userId);
  }

  @Put('complete/:contractId')
  completeContract(
    @Req() req: RequestWithUser,
    @Param('contractId') contractId: string,
  ) {
    return this.contractService.completeContract(req.user, contractId);
  }

  @Post('request/cancel/:contractId')
  requestCancelContract(
    @Req() req: RequestWithUser,
    @Param('contractId') contractId: string,
  ) {
    return this.contractService.requestCancelContract(req.user, contractId);
  }

  @Put('review/cancel/:contractId')
  reviewCancelContract(
    @Req() req: RequestWithUser,
    @Param('contractId') contractId: string,
    @Body() status: ReviewContractStatus,
  ) {
    return this.contractService.reviewCancelContract(
      req.user,
      contractId,
      status,
    );
  }

  @Delete('delete/:contractId')
  @UseGuards(AdminGuard)
  deleteContract(@Param('contractId') contractId: string) {
    return this.contractService.deleteContract(contractId);
  }


}
