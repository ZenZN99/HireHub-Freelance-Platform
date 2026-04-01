import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FreelancerProjectDocument = FreelancerProject & Document;

@Schema({ timestamps: true })
export class FreelancerProject {
  @Prop({ required: true })
  freelancerId: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop()
  linkDemo: string;

}

export const FreelancerProjectSchema =
  SchemaFactory.createForClass(FreelancerProject);
