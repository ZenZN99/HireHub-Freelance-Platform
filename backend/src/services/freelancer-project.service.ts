import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRole } from 'src/enums/user.enum';
import {
  FreelancerProject,
  FreelancerProjectDocument,
} from 'src/schemas/freelancer-project.schema';
import { uploadToCloudinary } from 'src/cloudinary/cloudinary';

import { AuthUser } from 'src/types/auth-user.interface';

@Injectable()
export class FreelancerProjectService {
  constructor(
    @InjectModel(FreelancerProject.name)
    private readonly projectModel: Model<FreelancerProjectDocument>,
  ) {}

  async create(
    authUser: AuthUser,
    data: FreelancerProject,
    files?: Express.Multer.File[],
  ) {
    if (authUser.role !== UserRole.FREELANCER) {
      throw new ForbiddenException('Only freelancers can create projects');
    }
    const { title, description, linkDemo } = data;
    if (!title || !description) {
      throw new BadRequestException('Title and description is required');
    }

    if (!files) {
      throw new BadRequestException('Images is required');
    }

    let images: string[] = [];

    if (files && files.length > 0) {
      const uploadedImages = await Promise.all(
        files.map((file) => uploadToCloudinary(file, 'freelancer-projects')),
      );

      images = uploadedImages.map((img) => img.secure_url);
    }

    const project = await this.projectModel.create({
      freelancerId: authUser._id,
      title: title,
      description: description,
      images,
      linkDemo: linkDemo,
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
    data: Partial<FreelancerProject>,
    files?: Express.Multer.File[],
  ) {
    const project = await this.projectModel.findById(projectId);

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const isOwner = project.freelancerId === authUser._id;
    const isAdmin = authUser.role === UserRole.ADMIN;

    if (!isOwner && !isAdmin) {
      throw new ForbiddenException('Not Allowed');
    }

    let images: string[] = project.images || [];

    if (files && files.length > 0) {
      const uploadedImages = await Promise.all(
        files.map((file) => uploadToCloudinary(file, 'freelancer-projects')),
      );

      const newImages = uploadedImages.map((img) => img.secure_url);

      images = newImages;
    }

    const updatedProject = await this.projectModel.findByIdAndUpdate(
      projectId,
      {
        title: data.title ?? project.title,
        description: data.description ?? project.description,
        linkDemo: data.linkDemo ?? project.linkDemo,
        images,
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
    if (!project) throw new NotFoundException('Project not found');

    const isOwner = project.freelancerId === authUser._id;
    const isAdmin = authUser.role === UserRole.ADMIN;

    if (!isOwner && !isAdmin) {
      throw new ForbiddenException('Not Allowed');
    }

    await this.projectModel.findByIdAndDelete(projectId);

    return { success: true };
  }
}
