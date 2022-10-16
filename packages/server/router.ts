import * as trpcExpress from "@trpc/server/adapters/express";
import { inferAsyncReturnType, initTRPC, TRPCError } from "@trpc/server";
import { User, UserDTO } from "./models/user";
import { z } from "zod";

const data: User[] = [];

const getUser = (token?: string) => {
  if (token) {
    return data.find((user) => user.token === token);
  }
  return undefined;
};

export async function createContext({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) {
  const token = req.headers.authorization;
  const user = getUser(token);
  return {
    user,
  };
}
type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.context<Context>().create();

const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});
// you can reuse this for any procedure
const protectedProcedure = t.procedure.use(isAuthed);

export const appRouter = t.router({
  createToken: t.procedure.query(() => {
    const now = Date.now();
    const newUser : User = {id: now, shared: false, email: '', token: now.toString()};
    data.push(newUser)
    return newUser.token;
  }),
  getUser: protectedProcedure.query((req) => {
    const useDTO: UserDTO = { ...req.ctx.user };
    return useDTO;
  }),
  updateUser: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        shared: z.boolean(),
        email: z.string(),
      })
    )
    .mutation((req) => {
      const { user } = req.ctx;

      user.shared = req.input.shared;
      user.email = req.input.email;

      const userDTO: UserDTO = { ...user };
      return userDTO;
    }),
  hello: t.procedure.query((req) => {
    return "Hello";
  }),
});

export type AppRouter = typeof appRouter;
