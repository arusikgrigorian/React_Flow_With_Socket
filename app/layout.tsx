import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StyledComponentsRegistry from "@/lib/AntdRegistry";
import FullScreenProvider from "@/context/GembaScreenContext";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gemba",
  description: "Gemba Flow",
};

export type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <FullScreenProvider>{children}</FullScreenProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
