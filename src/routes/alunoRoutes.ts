import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

const paramSchema = z.object({
  id: z.string(),
});

const bodySchema = z.object({
  aluno: z.string(),
  email: z.string(),
  materia: z.string(),
  nota: z.string(),
});

export async function alunoRoutes(app: FastifyInstance) {
  app.get("/nota", async (request, reply) => {
    const response = await prisma.aluno.findMany();
    return response;
  });

  app.post("/nota", async (request, reply) => {
    const { aluno, email, materia, nota } = bodySchema.parse(request.body);

    const response = await prisma.aluno.create({
      data: {
        aluno,
        email,
        materia,
        nota: Number(nota),
      },
    });

    reply.send({
        msg: "Cadastrado com sucesso",
        data: response
    })
  });

  app.put("/nota/:id", async (request, reply) => {
    const { id } = paramSchema.parse(request.params);
    const { aluno, email, materia, nota } = bodySchema.parse(request.body);
    const response = await prisma.aluno.update({
      where: {
        id: Number(id),
      },
      data: {
        aluno,
        email,
        materia,
        nota: Number(nota),
      },
    });
    reply.send({
        msg: "Atualizado com sucesso",
        data: response
    })
  });

  app.delete("/nota/:id", async (request, reply) => {
    const { id } = paramSchema.parse(request.params);
    console.log(id)
     await prisma.aluno.delete({
        where: {
            id: Number(id),
        },
      })
      reply.send({
        msg: "Deletado com sucesso",
    })
  });
}
