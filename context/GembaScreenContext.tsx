"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type Props = {
  children: ReactNode;
};

type FullScreen = {
  isFullScreen: boolean;
  setIsFullScreen: Dispatch<SetStateAction<boolean>>;
};

export const FullScreenContext = createContext<FullScreen>({
  isFullScreen: false,
  setIsFullScreen: (prevState: SetStateAction<boolean>) => prevState,
});

export default function FullScreenProvider({ children }: Props) {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  return (
    <FullScreenContext.Provider value={{ isFullScreen, setIsFullScreen }}>
      {children}
    </FullScreenContext.Provider>
  );
}
