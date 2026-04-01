import { BACKEND_URL } from "./user.api";

export const createFreelancerProject = async (
  title: string,
  description: string,
  images: File[] | null,
  linkDemo?: string,
) => {
  const formData = new FormData();
  if (title) formData.append("title", title);
  if (description) formData.append("description", description);
  if (linkDemo) formData.append("linkDemo", linkDemo);
  if (images) images.forEach((img) => formData.append("images", img));
  try {
    const res = await fetch(`${BACKEND_URL}/api/freelancer/project/create`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const getMyProjects = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/freelancer/project/me`, {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const getFreelancerProjects = async (freelancerId: string) => {
  try {
    const res = await fetch(
      `${BACKEND_URL}/api/freelancer/project/${freelancerId}`,
      {
        method: "GET",
        credentials: "include",
      },
    );
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const updateFreelancerProject = async (
  projectId: string,
  title: string,
  description: string,
  images: File[] | null,
  linkDemo?: string,
) => {
  const formData = new FormData();
  if (title) formData.append("title", title);
  if (description) formData.append("description", description);
  if (linkDemo) formData.append("linkDemo", linkDemo);
  if (images) images.forEach((img) => formData.append("images", img));
  try {
    const res = await fetch(
      `${BACKEND_URL}/api/freelancer/project/update/${projectId}`,
      {
        method: "PUT",
        credentials: "include",
        body: formData,
      },
    );
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const deleteFreelancerProject = async (projectId: string) => {
  try {
    const res = await fetch(
      `${BACKEND_URL}/api/freelancer/project/delete/${projectId}`,
      {
        method: "DELETE",
        credentials: "include",
      },
    );
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};
