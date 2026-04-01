import { useEffect, useState } from "react";
import type { IClient } from "../types/client-profile";
import { getClientProfile } from "../apis/client-profile.api";

export const useClient = () => {
  const [clientProfile, setClientProfile] = useState<IClient | null>(null);

  useEffect(() => {
    const fetchClientData = async () => {
      const data = await getClientProfile();
      setClientProfile(data);
    };
    fetchClientData();
  }, []);

  return { clientProfile };
};
