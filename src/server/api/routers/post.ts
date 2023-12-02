
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const postRouter = createTRPCRouter({

  getLatestProject: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.projects.findFirst({
      orderBy: (projects, { desc }) => [desc(projects.createdAt)],
    });
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