import { api } from "@/trpc/server";

export default async function Home() {
  // const hello = await api.post.hello.query({ text: "from tRPC" });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <h1></h1>
    </main>
  );
}

async function CrudShowcase() {
  const latestPost = await api.post.getLatestProject.query();

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">
          Your most recent post: {latestPost.projectLink}
        </p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      {/* <CreatePost /> */}
    </div>
  );
}
