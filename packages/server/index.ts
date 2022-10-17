import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import { appRouter } from "./router";
import { PrismaClient } from "@prisma/client";
import { createContext } from "./context";

export const prisma = new PrismaClient();
const app = express();

app.use(cors());

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

const port = 8080;
app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
