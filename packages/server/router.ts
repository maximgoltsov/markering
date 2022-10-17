import { initTRPC, TRPCError } from "@trpc/server";
import { UserDTO } from "./models/user";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { prisma } from ".";
import { Context } from "./context";

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
const protectedProcedure = t.procedure.use(isAuthed);

export const appRouter = t.router({
  createToken: t.procedure.query(async () => {
    const newUser = await prisma.user.create({
      data: {
        token: uuidv4(),
      },
    });
    return newUser.token;
  }),
  getUser: protectedProcedure.query((req) => {
    const { id, shared, email } = req.ctx.user;
    const useDTO: UserDTO = { id, shared, email };
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
    .mutation(async (req) => {
      const {
        user: { id },
      } = req.ctx;
      const { shared, email } = req.input;

      const user = await prisma.user.update({
        where: { id },
        data: { shared, email },
      });

      const userDTO: UserDTO = { id, shared, email };
      return userDTO;
    }),
});

export type AppRouter = typeof appRouter;
