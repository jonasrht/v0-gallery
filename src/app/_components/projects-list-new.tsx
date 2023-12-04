"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Project } from "@/server/db/schema";
import { api } from "@/trpc/react";
import { Loader2 } from "lucide-react";
import type { FC } from "react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface ProjectsListProps {
  projects: Project[];
  searchQuery?: string;
}

const ProjectsListNew: FC<ProjectsListProps> = ({
  projects: initialProjects,
  searchQuery,
}) => {
  const [ref, inView] = useInView();

  const { data, fetchNextPage, hasNextPage } =
    api.post.getProjects.useInfiniteQuery(
      { limit: 25, searchQuery: searchQuery },
      {
        initialData: {
          pages: [initialProjects],
          pageParams: [null],
        },
        getNextPageParam: (lastPage) => {
          return lastPage[lastPage.length - 1]?.id;
        },
        refetchOnMount: false,
        refetchOnReconnect: false,
      },
    );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage().catch(() => console.log("error"));
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return (
    <>
      {data?.pages.map((group) => {
        return group.map((project) => (
          <a href={project.projectLink!} target="_blank" key={project.id}>
            <div className="aspect-preview group relative block w-full overflow-hidden rounded-lg border border-gray-200 transition-all">
              {/* eslint-disable @next/next/no-img-element */}
              <img
                src={project.imageLink!}
                alt={project.imageAlt!}
                width={658}
                height={367}
              />
              <div className="group relative flex max-w-[70%] items-center gap-2 p-4">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{"U"}</AvatarFallback>
                </Avatar>
                <MyTooltip text={project.prompt!} />
              </div>
            </div>
          </a>
        ));
      })}
      {hasNextPage && (
        <div
          className="col-span-2 flex h-24 w-full items-center justify-center"
          ref={ref}
        >
          <Loader2 className="animate-spin" />
        </div>
      )}
      {!hasNextPage && <div>You reached the end of the list</div>}
    </>
  );
};

export default ProjectsListNew;

function MyTooltip({ text }: { text: string }) {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <p className="line-clamp-1 text-ellipsis text-left text-sm">{text}</p>
        </TooltipTrigger>
        <TooltipContent className="max-w-sm">
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
