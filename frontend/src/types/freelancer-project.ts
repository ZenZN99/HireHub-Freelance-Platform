export interface IFreelancerProject {
  freelancerId: string;
  title: string;
  description: string;
  images: File[] | null;
  linkDemo: string;
  createdAt?: string;
  updatedAt?: string;
}
