"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useToast, type Toast, type ToastType } from "@/hooks/use-toast";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

interface ToastContextType {
  addToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType>({
  addToast: () => {},
});

export const useToastContext = () => useContext(ToastContext);

export function ToastProvider({ children }: { children: ReactNode }) {
  const { toasts, addToast, removeToast } = useToast();

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({
  toast,
  onRemove,
}: {
  toast: Toast;
  onRemove: (id: string) => void;
}) {
  const icons = {
    success: <CheckCircle className="h-4 w-4 text-green-500" />,
    error: <AlertCircle className="h-4 w-4 text-red-500" />,
    info: <Info className="h-4 w-4 text-blue-500" />,
  };

  return (
    <div className="animate-fade-in flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 shadow-lg">
      {icons[toast.type]}
      <span className="text-sm text-card-foreground">{toast.message}</span>
      <button
        onClick={() => onRemove(toast.id)}
        className="ml-2 text-muted-foreground hover:text-foreground"
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  );
}
