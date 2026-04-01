import { useEffect, useState } from "react";
import type { IFreelancer } from "../types/freelancer-profile";
import { getFreelancerProfile } from "../apis/freelancer-profile.api";

export const useFreelancer = () => {
  const [freelancerProfile, setFreelancerProfile] =
    useState<IFreelancer | null>(null);

  useEffect(() => {
    const fetchFreelancerData = async () => {
      const data = await getFreelancerProfile();
      setFreelancerProfile(data);
    };
    fetchFreelancerData();
  }, []);

  return {
    freelancerProfile,
  };
};
