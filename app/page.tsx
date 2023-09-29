"use client";

import Gemba from "@/components/Gemba";
import FullScreenProvider from "@/context/GembaScreenContext";

export default function Home() {
  return (
    <FullScreenProvider>
      <Gemba />
    </FullScreenProvider>
  );
}
