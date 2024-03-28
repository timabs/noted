import { createContext, useState } from "react";

interface sidebar {
  sbOpen: boolean;
  setSbOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SidebarContext = createContext<sidebar>({
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
