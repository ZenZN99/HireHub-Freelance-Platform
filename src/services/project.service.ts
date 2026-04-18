import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProjectDto } from 'src/dtos/project/create-project.dto';
import { ProjectStatus } from 'src/enums/project.enum';
import { UserRole } from 'src/enums/user.enum';
import { Project, ProjectDocument } from 'src/schemas/project.schema';
import { User, UserDocument } from 'src/schemas/user.schema';
import { AuthUser } from 'src/types/auth-user-interface';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async createProject(clientId: string, data: CreateProjectDto) {
    const { title, description, budget, budgetType } = data;

    const project = await this.projectModel.create({
      clientId,
      title,
      description,
      budgetType,
      budget,
      status: ProjectStatus.PENDING_REVIEW,
    });

    return {
      success: true,
      message: 'تم إرسال المشروع للمراجعة',
      project,
    };
  }

  async reviewProject(
    adminId: string,
    projectId: string,
    status: ProjectStatus.OPEN | ProjectStatus.REJECTED,
  ) {
    const admin = await this.userModel.findById(adminId);

    if (
      !admin ||
      (admin.role !== UserRole.ADMIN && admin.role !== UserRole.SUPPORT)
    ) {
      throw new ForbiddenException('غير مصرح لك');
    }

    const project = await this.projectModel.findById(projectId);

    if (!project) {
      throw new NotFoundException('المشروع غير موجود');
    }

    if (project.status !== ProjectStatus.PENDING_REVIEW) {
      throw new BadRequestException('المشروع تمت مراجعته مسبقاً');
    }

    project.status = status;
    await project.save();

    return {
      success: true,
      message:
        status === ProjectStatus.OPEN
          ? 'تم قبول المشروع ونشره'
          : 'تم رفض المشروع',
      project,
    };
  }

  async getAllProjects(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [projects, total] = await Promise.all([
      this.projectModel
        .find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      this.projectModel.countDocuments(),
    ]);

    const hasMore = skip + projects.length < total;

    return {
      projects,
      pagination: {
        page,
        limit,
        total,
        hasMore,
      },
    };
  }

  async getProjectById(projectId: string) {
    const project = await this.projectModel.findById(projectId);
    if (!project) {
      throw new NotFoundException('لم يتم العثور على المشروع');
    }
    return project;
  }

  async getProjectsByClient(clientId: string) {
    const projects = await this.projectModel
      .find({ clientId })
      .sort({ createdAt: -1 });
    return projects;
  }

  async deleteProject(authUser: AuthUser, projectId: string) {
    const project = await this.projectModel.findById(projectId);

    if (!project) {
      throw new NotFoundException('لم يتم العثور على المشروع');
    }

    const isOwner = project.clientId === authUser._id;

    const isAdmin = authUser.role === UserRole.ADMIN;

    if (!isOwner && !isAdmin) {
      throw new ForbiddenException('غير مصرح بك');
    }

    await this.projectModel.findByIdAndDelete(projectId);

    return {
      success: 'تم حذف المشروع بنجاح',
    };
  }
}
