import { TypographyH1 } from "@/components/typography/typography-h1";
import { api } from "@/trpc/server";
import { Suspense } from "react";
import ProjectsListNew from "./_components/projects-list-new";
import SearchBar from "./_components/search-bar";

interface HomeProps {
  searchParams: {
    page: string;
    search: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const page = searchParams.page ?? "1";
  console.log(searchParams.search);

  const projects = await api.post.getProjects.query({
    page: parseInt(page),
    limit: 25,
    searchQuery: searchParams.search,
  });

  return (
    <main className="container flex min-h-screen flex-col">
      <header className="my-8">
        <TypographyH1>Latest Generations</TypographyH1>
      </header>
      <SearchBar searchQuery={searchParams.search} />
      <div className="mx-auto grid w-full grid-cols-1 gap-4 md:grid-cols-[repeat(auto-fit,_minmax(436px,1fr))]">
        <Suspense fallback={<div>Loading...</div>}>
          <ProjectsListNew projects={projects} page={page} />
        </Suspense>
      </div>
    </main>
  );
}
