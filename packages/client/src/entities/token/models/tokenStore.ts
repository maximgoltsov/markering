import create from "zustand";
import { persist } from "zustand/middleware";
import client from "../../../shared/api/client";

interface TokenStore {
  token: string;
  checkToken: () => void;
}

export const useTokenStore = create(
  persist<TokenStore>(
    (set, get) => ({
      token: "",
      checkToken: async () => {
        if (get().token === "") {
          const token = await client.createToken.query();
          set({ token });
        }
      },
    }),
    {
      name: "token",
    }
  )
);
