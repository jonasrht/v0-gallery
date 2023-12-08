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
          sql`MATCH(${projects.prompt}) AGAINST("${input.searchQuery}" IN NATURAL LANGUAGE MODE) AND id < ${input.cursor ?? 1000000} ORDER BY id DESC` : undefined,
        limit: input.limit,
      })
    }),
});

// example of a insert procedure
// create: publicProcedure
// .input(z.object({ name: z.string().min(1) }))
// .mutation(async ({ ctx, input }) => {
//   // simulate a slow db call
//   await new Promise((resolve) => setTimeout(resolve, 1000));

//   await ctx.db.insert(projects).values({
//     name: input.name,
//   });
// }),

// hello: publicProcedure
// .input(z.object({ text: z.string() }))
// .query(({ input }) => {
//   return {
//     greeting: `Hello ${input.text}`,
//   };
// }),
