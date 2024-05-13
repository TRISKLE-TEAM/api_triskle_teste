import fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import dotenv from "dotenv";

import { alunoRoutes } from "./routes/alunoRoutes";


dotenv.config();

export const app = fastify();

app.register(cors, {
  origin: true,
});

app.register(alunoRoutes);

app
  .listen({
    port: 3333,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log("HTTP server running on http://localhost:3333");
  });
