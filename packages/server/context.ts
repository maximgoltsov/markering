import * as trpcExpress from "@trpc/server/adapters/express";
import { inferAsyncReturnType, initTRPC, TRPCError } from "@trpc/server";
import { prisma } from ".";

const getUser = async (token?: string) => {
  if (token) {
    const user = await prisma.user.findFirst({
      where: { token },
    });
    return user;
  }
  return null;
};

export async function createContext({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) {
  const token = req.headers.authorization;
  const user = await getUser(token);
  return {
    user,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
