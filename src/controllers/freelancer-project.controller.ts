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
import { CreateFreelancerProjectDto } from 'src/dtos/freelancer/create-freelancer-project.dto';
import { UpdateFreelancerProjectDto } from 'src/dtos/freelancer/update-freelancer-project.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { FreelancerGuard } from 'src/guards/freelancer.guard';
import { FreelancerProjectService } from 'src/services/freelancer-project.service';
import type { RequestWithUser } from 'src/types/express';

@Controller('/api/freelancer/project')
export class FreelancerProjectController {
  constructor(
    private readonly freelancerProjectService: FreelancerProjectService,
  ) {}

  @Post('create')
  @UseGuards(AuthGuard, FreelancerGuard)
  @UseInterceptors(FilesInterceptor('images', 10))
  create(
    @Req() req: RequestWithUser,
    @Body() data: CreateFreelancerProjectDto,
    @UploadedFiles() files: { images: Express.Multer.File[] },
  ) {
    return this.freelancerProjectService.create(
      req.user,
      data,
      files.images ?? [],
    );
  }

  @Get('my/project')
  @UseGuards(AuthGuard)
  getMyProject(@Req() req: RequestWithUser) {
    return this.freelancerProjectService.getMyProjects(req.user._id);
  }

  @Get('freelancer/:freelancerId')
  @UseGuards(AuthGuard)
  getFreelancerProjects(@Param('freelancerId') freelancerId: string) {
    return this.freelancerProjectService.getFreelancerProjects(freelancerId);
  }

  @Put('update/:projectId')
  @UseGuards(AuthGuard, FreelancerGuard)
  @UseInterceptors(FilesInterceptor('images', 10))
  update(
    @Req() req: RequestWithUser,
    @Param('projectId') projectId: string,
    @Body() data: UpdateFreelancerProjectDto,
    @UploadedFiles() files: { images: Express.Multer.File[] },
  ) {
    return this.freelancerProjectService.update(
      req.user,
      projectId,
      data,
      files.images ?? [],
    );
  }

  @Delete('delete/:projectId')
  @UseGuards(AuthGuard, FreelancerGuard)
  delete(@Req() req: RequestWithUser, @Param('projectId') projectId: string) {
    return this.freelancerProjectService.delete(req.user, projectId);
  }
}
