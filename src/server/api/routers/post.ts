import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const postRouter = createTRPCRouter({
  /**
   * Get all projects with pagination
   */
  getProjects: publicProcedure
    .input(
      z.object({
        limit: z.number(),
        cursor: z.number().nullish(),
        searchQuery: z.string().optional(),
      }),
    )
    .query(({ ctx, input }) => {
      console.log('input', input);

      return ctx.db.query.projects.findMany({
        where: input.searchQuery ? (projects, { sql }) =>
          sql`MATCH(${projects.prompt}) AGAINST("${input.searchQuery}" IN NATURAL LANGUAGE MODE) AND id < ${input.cursor ?? 1000000} ORDER BY id DESC` :
          (projects, { sql }) => sql`id < ${input.cursor ?? 1000000} ORDER BY id DESC`,
        limit: input.limit,
      })
    }),
});
