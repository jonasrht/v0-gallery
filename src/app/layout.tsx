import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "@/trpc/react";
import { Github, Twitter } from "lucide-react";
import Provider from "./provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "v0.gallery",
  description: "v0 generated pages explorer",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <Provider>
          <TRPCReactProvider cookies={cookies().toString()}>
            {children}
            <footer className="border-t border-gray-200 bg-gray-100 p-6">
              <div className="flex items-center justify-center gap-2 text-center text-sm opacity-50">
                <a href="https://twitter.com/Jonasrht" target="_blank">
                  <Twitter />
                </a>
                <a href="https://github.com/jonasrht/" target="_blank">
                  <Github />
                </a>
              </div>
            </footer>
          </TRPCReactProvider>
        </Provider>
      </body>
    </html>
  );
}
