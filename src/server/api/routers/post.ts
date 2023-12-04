import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { withCursorPagination } from '@/server/db/db-utils';
import { projects } from "@/server/db/schema";
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

      return ctx.db.query.projects.findMany(
        withCursorPagination({
          // @ts-expect-error TODO: fix this
          where: input.searchQuery ? (projects, { sql }) =>
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            sql`MATCH(${projects.prompt}) AGAINST("${input.searchQuery}" IN NATURAL LANGUAGE MODE)` : undefined,
          limit: 32,
          cursors: [
            [
              projects.id,
              'desc',
              input.cursor
            ],
          ]
        }),
      );
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
