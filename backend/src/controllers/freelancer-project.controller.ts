import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/guards/auth.guard';
import { FreelancerGuard } from 'src/guards/freelancer.guard';
import { FreelancerProject } from 'src/schemas/freelancer-project.schema';
import { FreelancerProjectService } from 'src/services/freelancer-project.service';
import type { RequestWithUser } from 'src/types/express';

@Controller('/api/freelancer/project')
export class FreelancerProjectController {
  constructor(private readonly freelancerProject: FreelancerProjectService) {}

  @Post('create')
  @UseGuards(AuthGuard, FreelancerGuard)
  @UseInterceptors(FilesInterceptor('images', 10))
  create(
    @Req() req: RequestWithUser,
    @Body() data: FreelancerProject,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    return this.freelancerProject.create(req.user, data, images);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  getMyProjects(@Req() req: RequestWithUser) {
    return this.freelancerProject.getMyProjects(req.user._id);
  }

  @Get(':freelancerId')
  @UseGuards(AuthGuard)
  getFreelancerProjects(@Param('freelancerId') freelancerId: string) {
    return this.freelancerProject.getFreelancerProjects(freelancerId);
  }

  @Put('update/:projectId')
  @UseGuards(AuthGuard, FreelancerGuard)
  @UseInterceptors(FilesInterceptor('images', 10))
  update(
    @Req() req: RequestWithUser,
    @Param('projectId') projectId: string,
    @Body() data: FreelancerProject,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    return this.freelancerProject.update(req.user, projectId, data, images);
  }

  @Delete('delete/:projectId')
  @UseGuards(AuthGuard, FreelancerGuard)
  delete(@Req() req: RequestWithUser, @Param('projectId') projectId: string) {
    return this.freelancerProject.delete(req.user, projectId);
  }
}
