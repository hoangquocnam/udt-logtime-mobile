import React, {
  createContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

export interface IToast {
  message: string;
  visible?: boolean;
  color?: string;
}

const initialToast: IToast = {
  message: "",
  visible: false,
};
export interface IToastContext {
  toast: IToast;
  show: (toast: IToast) => void;
  hide: () => void;
}

export const ToastContext = createContext<IToastContext>({
  toast: initialToast,
  show: () => {},
  hide: () => {},
});

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState<IToast>(initialToast);
  const timeout = useRef<NodeJS.Timeout>();

  const show = useCallback((newToast: IToast) => {
    setToast({ ...initialToast, visible: true, ...newToast });
  }, []);

  const hide = useCallback(() => {
    setToast({ ...toast, visible: false });
  }, [toast]);

  useEffect(() => {
    if (toast.visible) {
      timeout.current = setTimeout(hide, 1500);
      return () => {
        if (timeout.current) {
          clearTimeout(timeout.current);
        }
      };
    }
  }, [hide, toast]);

  return (
    <ToastContext.Provider
      value={{
        hide,
        show,
        toast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};
