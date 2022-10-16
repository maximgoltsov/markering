import create from "zustand";
import { persist } from "zustand/middleware";
import client from "../../../shared/api/client";

interface TokenStore {
  token: string;
  getToken: () => void;
}

export const useTokenStore = create(
  persist<TokenStore>(
    (set) => ({
      token: "",
      getToken: async () => {
        const token = await client.createToken.query();
        set({ token });
      },
    }),
    {
      name: "token",
    }
  )
);
