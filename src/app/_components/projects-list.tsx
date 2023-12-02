"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Project } from "@/server/db/schema";
import { api } from "@/trpc/react";
import Link from "next/link";
import { FC, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
interface ProjectsListProps {
  projects: Project[];
  page: string;
}

const ProjectsList: FC<ProjectsListProps> = ({
  projects: initialProjects,
  page,
}) => {
  const [projects, setProjects] = useState(initialProjects);
  const pageParam = useRef(page);

  const getProjects = api.post.getProjects.useQuery(
    { limit: 25, page: parseInt(pageParam.current) },
    {
      initialData: initialProjects,
      refetchOnMount: false,
      refetchOnReconnect: false,
      onSuccess: (data) => {
        setProjects((prev) => [...prev, ...data]);
      },
    },
  );

  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      pageParam.current = (parseInt(pageParam.current) + 1).toString();
      console.log(pageParam.current);
      getProjects.refetch().catch((err) => console.log(err));
    }
  }, [inView]);

  return (
    <>
      {projects.map((project, i) => {
        const link = project.profileLink!.split("/");
        const username = link[link.length - 1];
        return (
          <Link href={project.projectLink!} key={i}>
            <div className="aspect-preview group relative block w-full overflow-hidden rounded-lg border border-gray-200 transition-all">
              {/* eslint-disable @next/next/no-img-element */}
              <img src={project.imageLink!} alt={project.imageAlt!} />
              <div className="group relative flex max-w-[70%] items-center p-4">
                <Avatar className="bg-primary">
                  <AvatarFallback>
                    {username?.toUpperCase().charAt(0) ?? "U"}
                  </AvatarFallback>
                </Avatar>
                <p className="line-clamp-1 text-ellipsis text-left text-sm">
                  {project.prompt}
                </p>
                <p>{project.createdAt.toISOString()}</p>
              </div>
            </div>
          </Link>
        );
      })}
      <span ref={ref}>Loading...</span>
      <Skeleton />
    </>
  );
};

export default ProjectsList;

function Skeleton() {
  return (
    <div className="aspect-preview group relative block w-full overflow-hidden rounded-lg border border-gray-200 transition-all">
      <div className="group relative flex max-w-[70%] items-center p-4"></div>
    </div>
  );
}
