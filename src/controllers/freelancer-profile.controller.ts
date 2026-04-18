import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { UpdateFreelancerProfileDto } from 'src/dtos/freelancer/update-freelancer-profile.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { FreelancerGuard } from 'src/guards/freelancer.guard';
import { FreelancerProfileService } from 'src/services/freelancer-profile.service';
import type { RequestWithUser } from 'src/types/express';

@Controller('/api/freelancer')
export class FreelancerProfileController {
  constructor(
    private readonly freelancerProfileService: FreelancerProfileService,
  ) {}

  @Get('profile')
  @UseGuards(AuthGuard)
  getMyProfile(@Req() req: RequestWithUser) {
    return this.freelancerProfileService.getMyProfile(req.user._id);
  }

  @Put('update/profile')
  @UseGuards(AuthGuard, FreelancerGuard)
  updateProfile(
    @Req() req: RequestWithUser,
    @Body() data: UpdateFreelancerProfileDto,
  ) {
    return this.freelancerProfileService.updateProfile(req.user, data);
  }
}
