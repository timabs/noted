import { createContext, useState } from "react";

interface SidebarState {
  sbOpen: boolean;
  setSbOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SidebarContext = createContext<SidebarState>({
  sbOpen: false,
  setSbOpen: () => {},
});

export const SbProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sbOpen, setSbOpen] = useState(false);
  return (
    <SidebarContext.Provider value={{ sbOpen, setSbOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};
