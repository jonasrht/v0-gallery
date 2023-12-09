import { TypographyH1 } from "@/components/typography/typography-h1";
import { api } from "@/trpc/server";
import Link from "next/link";
import { Suspense } from "react";
import ProjectsList from "./_components/projects-list";
import SearchBar from "./_components/search-bar";

interface HomeProps {
  searchParams: {
    search: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  console.log(searchParams.search);

  const projects = await api.post.getProjects.query({
    limit: 25,
    searchQuery: searchParams.search,
  });

  return (
    <main className="container flex min-h-screen flex-col">
      <header className="my-8">
        <Link href={"/"}>
          <TypographyH1>v0 Generations Gallery</TypographyH1>
        </Link>
      </header>
      <SearchBar searchQuery={searchParams.search} />
      <div className="mx-auto grid w-full grid-cols-1 gap-4 md:grid-cols-[repeat(auto-fit,_minmax(436px,1fr))]">
        <Suspense fallback={<Skeleton />}>
          <ProjectsList projects={projects} searchQuery={searchParams.search} />
        </Suspense>
      </div>
    </main>
  );
}

function Skeleton() {
  return (
    <>
      <div className="aspect-preview group relative block w-full overflow-hidden rounded-lg border border-gray-200 transition-all">
        <div className="group relative flex max-w-[70%] items-center p-4"></div>
      </div>
    </>
  );
}