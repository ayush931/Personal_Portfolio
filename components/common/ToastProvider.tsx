"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "info";

export interface ToastItem {
  id: string;
  title?: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType, title?: string, duration?: number) => void;
  toast: {
    success: (message: string, title?: string) => void;
    error: (message: string, title?: string) => void;
    info: (message: string, title?: string) => void;
  };
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastType = "info", title?: string, duration = 4500) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
      const newToast: ToastItem = { id, message, type, title, duration };
      setToasts((prev) => [...prev.slice(-4), newToast]); // Limit to max 5 stacked toasts

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  const toastHelpers = {
    success: (message: string, title?: string) => showToast(message, "success", title),
    error: (message: string, title?: string) => showToast(message, "error", title),
    info: (message: string, title?: string) => showToast(message, "info", title),
  };

  return (
    <ToastContext.Provider value={{ showToast, toast: toastHelpers }}>
      {children}
      {/* Toast Render Portal Container */}
      <div
        aria-live="polite"
        className="aria-hidden:hidden fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 max-w-md w-[calc(100vw-3rem)] pointer-events-none"
      >
        <AnimatePresence mode="sync">
          {toasts.map((t) => (
            <ToastCard key={t.id} toast={t} onClose={() => removeToast(t.id)} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

function ToastCard({ toast, onClose }: { toast: ToastItem; onClose: () => void }) {
  const isSuccess = toast.type === "success";
  const isError = toast.type === "error";

  const badgeText = isSuccess
    ? "SYS // TRANSMISSION_OK"
    : isError
    ? "SYS // TRANSMISSION_ERR"
    : "SYS // NOTICE";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.95 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-auto relative rounded-panel border border-cobalt/40 bg-canvas-raised/95 backdrop-blur-md shadow-2xl overflow-hidden font-mono"
    >
      {/* Blueprint Grid Accent Header */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-cobalt/10 border-b border-cobalt/20 text-[0.65rem] uppercase tracking-widest text-cobalt">
        <span className="flex items-center gap-1.5 font-bold">
          <span className="h-1.5 w-1.5 rounded-full bg-cobalt animate-pulse" />
          {badgeText}
        </span>
        <button
          onClick={onClose}
          className="text-ink-muted hover:text-cobalt transition-colors p-0.5 rounded cursor-pointer"
          aria-label="Close notification"
        >
          <X size={13} />
        </button>
      </div>

      {/* Content Body */}
      <div className="p-4 flex items-start gap-3">
        <div className="shrink-0 mt-0.5">
          {isSuccess && <CheckCircle2 className="h-5 w-5 text-acid" />}
          {isError && <AlertCircle className="h-5 w-5 text-vermilion" />}
          {!isSuccess && !isError && <Info className="h-5 w-5 text-cobalt" />}
        </div>
        <div className="flex-1 min-w-0">
          {toast.title && (
            <h4 className="text-xs font-bold text-ink uppercase tracking-wider mb-1 truncate">
              {toast.title}
            </h4>
          )}
          <p className="text-xs text-ink leading-relaxed break-words">
            {toast.message}
          </p>
        </div>
      </div>

      {/* Subtle Progress Bar */}
      {toast.duration && toast.duration > 0 && (
        <motion.div
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: toast.duration / 1000, ease: "linear" }}
          className={`h-0.5 origin-left ${
            isSuccess ? "bg-acid" : isError ? "bg-vermilion" : "bg-cobalt"
          }`}
        />
      )}
    </motion.div>
  );
}
