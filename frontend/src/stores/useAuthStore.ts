import { create } from "zustand";
import toast from "react-hot-toast";
import { logout, me } from "../apis/user.api";
import type { UserStore } from "../types/user";

export const useAuthStore = create<UserStore>((set) => ({
  user: null,
  isLoading: false,

  setUser: (user) => set({ user }),

  loadUser: async () => {
    set({ isLoading: true });

    try {
      const data = await me();

      if (data?.statusCode === 401) {
        set({ user: null });
        return;
      }

      if (data) {
        set({ user: data.user || data });
      } else {
        set({ user: null });
      }
    } catch (err) {
      set({ user: null });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    try {
      await logout();
      set({ user: null });
      toast.success("Logged out");
    } catch (err) {
      toast.error("Logout failed");
    }
  },
}));
