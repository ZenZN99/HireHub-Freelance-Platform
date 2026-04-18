import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { PaymentService } from 'src/services/payment.service';
import type { RequestWithUser } from 'src/types/express';

@Controller('/api/payment')
@UseGuards(AuthGuard)
export class PaymentController {
  constructor(private readonly paymentSerivce: PaymentService) {}

  @Post('create/:contractId')
  createPayment(
    @Param('contractId') contractId: string,
    @Req() req: RequestWithUser,
  ) {
    return this.paymentSerivce.createPayment(contractId, req.user._id);
  }

  @Get('user')
  getPaymentsUser(@Req() req: RequestWithUser) {
    return this.paymentSerivce.getPaymentsUser(req.user._id);
  }

  @Put('release/:paymentId')
  releasePayment(
    @Req() req: RequestWithUser,
    @Param('paymentId') paymentId: string,
  ) {
    return this.paymentSerivce.releasePayment(req.user, paymentId);
  }

  @Put('refund/:paymentId')
  @UseGuards(AdminGuard)
  refundPayment(
    @Req() req: RequestWithUser,
    @Param('paymentId') paymentId: string,
  ) {
    return this.paymentSerivce.refundPayment(req.user, paymentId);
  }

  @Post('recharge')
  rechargeBalance(@Req() req: RequestWithUser, @Body() amount: number) {
    return this.paymentSerivce.rechargeBalance(req.user._id, amount);
  }
}
