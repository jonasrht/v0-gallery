"use client";
import Image from "@/components/image";
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

const ProjectsList: FC<ProjectsListProps> = ({
  projects: initialProjects,
  searchQuery,
}) => {
  const [ref, inView] = useInView();

  const { data, fetchNextPage, hasNextPage } =
    api.post.getProjects.useInfiniteQuery(
      { limit: 25, searchQuery },
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
      fetchNextPage().catch(() => console.log("something went wrong"));
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (data?.pages[0]?.length === 0) return <_EmptyState />;

  return (
    <>
      {data?.pages.map((group) => {
        return group.map((project) => (
          <div className="aspect-preview group relative block w-full overflow-hidden rounded-lg border border-gray-200 transition-all">
            <a href={project.projectLink!} target="_blank" key={project.id}>
              {/* eslint-disable @next/next/no-img-element */}
              <Image
                src={project.imageLink!}
                alt={project.imageAlt!}
                width={658}
                height={367}
              />
            </a>
            <div className="group relative flex max-w-[70%] items-center gap-2 p-4">
              <a href={project.profileLink!} target="_blank">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {project.profileLink
                      ?.replace("https://v0.dev/", "")
                      .charAt(0)
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </a>
              <a href={project.projectLink!} target="_blank" key={project.id}>
                <MyTooltip
                  text={project.prompt!}
                  searchQuery={searchQuery ?? ""}
                />
              </a>
            </div>
          </div>
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
      {!hasNextPage && (
        <div className="col-span-2 flex h-24 w-full items-center justify-center">
          Congratulations! You reached the end of the list ^^
        </div>
      )}
    </>
  );
};

export default ProjectsList;

function MyTooltip({
  text,
  searchQuery,
}: {
  text: string;
  searchQuery: string;
}) {
  searchQuery.split(" ").map((word) => {
    text = text.replace(new RegExp(word, "gi"), "<strong>$&</strong>");
  });

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <p
            className="line-clamp-1 text-ellipsis text-left text-sm"
            dangerouslySetInnerHTML={{
              __html: text,
            }}
          />
        </TooltipTrigger>
        <TooltipContent className="max-w-sm">
          <p
            dangerouslySetInnerHTML={{
              __html: text,
            }}
          />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function _EmptyState() {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="animate-slide-right">
        <img
          src="https://media3.giphy.com/media/tj2MwoqitZLtm/giphy.gif?cid=ecf05e478d0hmiih5q3g9q741pc4hpxsmlismvnnjz4x144f&ep=v1_gifs_search&rid=giphy.gif&ct=g"
          alt="No orders found"
          width={64}
          height={64}
        />
      </div>
      <div className="text-center">Nothing found 😴</div>
    </div>
  );
}
