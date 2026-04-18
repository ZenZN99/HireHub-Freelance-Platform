import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateProjectDto } from 'src/dtos/project/create-project.dto';
import { UpdateProjectDto } from 'src/dtos/project/update-project.dto';
import { ProjectStatus } from 'src/enums/project.enum';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { ClientGuard } from 'src/guards/client.guard';
import { ProjectService } from 'src/services/project.service';
import type { RequestWithUser } from 'src/types/express';

@Controller('/api/project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('create')
  @UseGuards(AuthGuard, ClientGuard)
  createProject(@Req() req: RequestWithUser, @Body() data: CreateProjectDto) {
    return this.projectService.createProject(req.user, data);
  }

  @Put('review')
  @UseGuards(AuthGuard, AdminGuard)
  reviewProject(
    @Req() req: RequestWithUser,
    @Param('projectId') projectId: string,
    @Body() status: ProjectStatus.OPEN | ProjectStatus.REJECTED,
  ) {
    return this.projectService.reviewProject(req.user._id, projectId, status);
  }

  @Get('projects')
  @UseGuards(AuthGuard)
  getAllProject(@Query('page') page: string, @Query('limit') limit: string) {
    return this.projectService.getAllProjects(
      Number(page) || 1,
      Number(limit) || 10,
    );
  }

  @Get(':projectId')
  @UseGuards(AuthGuard)
  getProjectId(@Param('projectId') projectId: string) {
    return this.projectService.getProjectById(projectId);
  }

  @Get('client')
  @UseGuards(AuthGuard, ClientGuard)
  getProjectsByClient(@Req() req: RequestWithUser) {
    return this.projectService.getProjectsByClient(req.user._id);
  }

  @Delete('delete/:projectId')
  @UseGuards(AuthGuard, ClientGuard)
  deleteProject(
    @Req() req: RequestWithUser,
    @Param('projectId') projectId: string,
  ) {
    return this.projectService.deleteProject(req.user, projectId);
  }
}
