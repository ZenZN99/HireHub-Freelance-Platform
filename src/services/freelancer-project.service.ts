import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFreelancerProjectDto } from 'src/dtos/freelancer/create-freelancer-project.dto';
import { UpdateFreelancerProjectDto } from 'src/dtos/freelancer/update-freelancer-project.dto';
import { UserRole } from 'src/enums/user.enum';
import { uploadToCloudinary } from 'src/libs/cloudinary';
import {
  FreelancerProject,
  FreelancerProjectDocument,
} from 'src/schemas/freelancer-project.schema';
import { AuthUser } from 'src/types/auth-user-interface';

@Injectable()
export class FreelancerProjectService {
  constructor(
    @InjectModel(FreelancerProject.name)
    private readonly projectModel: Model<FreelancerProjectDocument>,
  ) {}

  async create(
    authUser: AuthUser,
    data: CreateFreelancerProjectDto,
    files?: Express.Multer.File[],
  ) {
    if (authUser.role !== UserRole.FREELANCER) {
      throw new ForbiddenException('فقط المستقلين يمكنهم إنشاء مشاريع');
    }

    if (!files || files.length === 0) {
      throw new BadRequestException('الصور مطلوبة');
    }

    const images = await Promise.all(
      files.map((file) => uploadToCloudinary(file, 'freelancer-projects')),
    );

    const projectsCount = await this.projectModel.countDocuments({
      freelancerId: authUser._id,
    });

    if (projectsCount >= 5) {
      throw new BadRequestException('الحد الأقصى للمشاريع هو 5');
    }

    const project = await this.projectModel.create({
      freelancerId: authUser._id,
      title: data.title,
      description: data.description,
      images: images.map((img) => img.secure_url),
      linkDemo: data.linkDemo,
    });

    return {
      success: true,
      project,
    };
  }

  async getMyProjects(freelancerId: string) {
    return this.projectModel.find({ freelancerId }).sort({ createdAt: -1 });
  }

  async getFreelancerProjects(freelancerId: string) {
    return this.projectModel.find({ freelancerId }).lean();
  }

  async update(
    authUser: AuthUser,
    projectId: string,
    data: UpdateFreelancerProjectDto,
    files?: Express.Multer.File[],
  ) {
    const project = await this.projectModel.findById(projectId);

    if (!project) {
      throw new NotFoundException('لم يتم العثور على المشروع');
    }

    const isOwner = project.freelancerId === authUser._id;

    const isAdmin = authUser.role === UserRole.ADMIN;

    if (!isOwner && !isAdmin) {
      throw new ForbiddenException('غير مصرح لك');
    }

    let images = project.images || [];

    if (files && files.length > 0) {
      const uploadedImages = await Promise.all(
        files.map((file) => uploadToCloudinary(file, 'freelancer-projects')),
      );

      images = uploadedImages.map((img) => img.secure_url);
    }

    const updatedProject = await this.projectModel.findByIdAndUpdate(
      projectId,
      {
        $set: {
          title: data.title ?? project.title,
          description: data.description ?? project.description,
          linkDemo: data.linkDemo ?? project.linkDemo,
          images,
        },
      },
      { new: true },
    );

    return {
      success: true,
      project: updatedProject,
    };
  }

  async delete(authUser: AuthUser, projectId: string) {
    const project = await this.projectModel.findById(projectId);

    if (!project) {
      throw new NotFoundException('لم يتم العثور على المشروع');
    }

    const isOwner = project.freelancerId === authUser._id;
    const isAdmin = authUser.role === UserRole.ADMIN;

    if (!isOwner && !isAdmin) {
      throw new ForbiddenException('غير مصرح لك');
    }

    await this.projectModel.findByIdAndDelete(projectId);

    return { success: true };
  }
}
