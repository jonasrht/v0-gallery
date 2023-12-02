"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Project } from "@/server/db/schema";
import { api } from "@/trpc/react";
import Link from "next/link";
import { FC, useEffect } from "react";
import { useInView } from "react-intersection-observer";
interface ProjectsListProps {
  projects: Project[];
  page: string;
}

const ProjectsListNew: FC<ProjectsListProps> = ({
  projects: initialProjects,
  page,
}) => {
  const [ref, inView] = useInView();

  const { data, fetchNextPage, hasNextPage } =
    api.post.getProjects.useInfiniteQuery(
      { limit: 25 },
      {
        initialData: {
          pages: [initialProjects],
          pageParams: [null],
        },
        getNextPageParam: (lastPage) => {
          return lastPage[lastPage.length - 1]!.id;
        },
      },
    );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage().catch(() => console.log("error"));
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return (
    <>
      {data?.pages.map((group, i) => {
        return group.map((project) => (
          <Link href={project.projectLink!} key={project.id}>
            <div className="aspect-preview group relative block w-full overflow-hidden rounded-lg border border-gray-200 transition-all">
              {/* eslint-disable @next/next/no-img-element */}
              <img src={project.imageLink!} alt={project.imageAlt!} />
              <div className="group relative flex max-w-[70%] items-center p-4">
                <Avatar className="bg-primary">
                  <AvatarFallback>{"U"}</AvatarFallback>
                </Avatar>
                <p className="line-clamp-1 text-ellipsis text-left text-sm">
                  {project.prompt}
                </p>
                <p>{project.createdAt.toISOString()}</p>
              </div>
            </div>
          </Link>
        ));
      })}
      <div ref={hasNextPage ? ref : null}>Loading...</div>
    </>
  );
};

export default ProjectsListNew;

function Skeleton() {
  return (
    <div className="aspect-preview group relative block w-full overflow-hidden rounded-lg border border-gray-200 transition-all">
      <div className="group relative flex max-w-[70%] items-center p-4"></div>
    </div>
  );
}
