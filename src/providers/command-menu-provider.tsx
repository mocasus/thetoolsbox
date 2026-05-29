"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { tools } from "@/data/tools";
import { Search, X } from "lucide-react";

interface CommandMenuContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CommandMenuContext = createContext<CommandMenuContextType>({
  open: false,
  setOpen: () => {},
});

export const useCommandMenu = () => useContext(CommandMenuContext);

export function CommandMenuProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <CommandMenuContext.Provider value={{ open, setOpen }}>
      {children}
      {open && (
        <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[20vh]">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative z-10 w-full max-w-lg rounded-xl border border-border bg-card shadow-2xl">
            <Command className="flex flex-col" loop>
              <div className="flex items-center border-b border-border px-4">
                <Search className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
                <Command.Input
                  placeholder="Search tools..."
                  className="flex h-12 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                  autoFocus
                />
                <button
                  onClick={() => setOpen(false)}
                  className="ml-2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <Command.List className="max-h-[300px] overflow-y-auto p-2">
                <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
                  No tools found.
                </Command.Empty>
                {tools.map((tool) => (
                  <Command.Item
                    key={tool.id}
                    value={`${tool.name} ${tool.category} ${tool.tags.join(" ")}`}
                    onSelect={() => {
                      router.push(`/tools/${tool.slug}`);
                      setOpen(false);
                    }}
                    className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground aria-selected:bg-accent"
                  >
                    <span className="text-lg">{tool.icon}</span>
                    <div className="flex flex-col">
                      <span className="font-medium">{tool.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {tool.category} • {tool.description}
                      </span>
                    </div>
                  </Command.Item>
                ))}
              </Command.List>
            </Command>
          </div>
        </div>
      )}
    </CommandMenuContext.Provider>
  );
}
