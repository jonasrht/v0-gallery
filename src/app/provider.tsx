"use client";
import NextAdapterApp from "next-query-params/app";
import type { FC, ReactNode } from "react";
import { QueryParamProvider } from "use-query-params";

interface ProviderProps {
  children: ReactNode;
}

const Provider: FC<ProviderProps> = ({ children }) => {
  return (
    <QueryParamProvider adapter={NextAdapterApp}>{children}</QueryParamProvider>
  );
};

export default Provider;
