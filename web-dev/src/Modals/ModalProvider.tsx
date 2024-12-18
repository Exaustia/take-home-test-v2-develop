import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface ModalContextProps {
  modal: ModalType;
  setModal: (modal: ModalType) => void;
}

type ModalType = {
  component?: ReactNode;
  open: boolean;
  showClose?: boolean;
  disableOverlayClose?: boolean;
};

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<ModalType>({
    component: null,
    open: false,
    showClose: true,
    disableOverlayClose: false,
  });

  useEffect(() => {
    if (!modal.open) {
      setModal({ component: null, open: false });
    }
  }, [modal.open]);

  useEffect(() => {
    if (modal.open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modal]);

  useEffect(() => {
    if (modal.showClose === undefined) {
      setModal({ ...modal, showClose: true });
    }
  }, [modal, modal.showClose]);

  useEffect(() => {
    if (modal.showClose) {
      // listen for escape key and click oustide
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setModal({ open: false });
        }
      };
      const handleClick = (e: MouseEvent) => {
        if (
          !modal.disableOverlayClose &&
          e.target === document.getElementById("modal")
        ) {
          setModal({ open: false });
        }
      };

      window.addEventListener("keydown", handleEsc);
      window.addEventListener("click", handleClick);

      return () => {
        window.removeEventListener("keydown", handleEsc);
        window.removeEventListener("click", handleClick);
      };
    }
  }, [modal]);

  return (
    <ModalContext.Provider
      value={{
        modal,
        setModal,
      }}
    >
      <Overlay onClick={() => setModal({ open: false })} hidden={!modal.open} />
      <section
        id="modal"
        style={{
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          margin: "auto",

          zIndex: 1000,
          display: modal.open ? "flex" : "none",
        }}
      >
        <div
          style={{
            paddingTop: modal.showClose ? "1.5rem" : "0",
            paddingBottom: modal.showClose ? "1.5rem" : "0",
            backgroundColor: "white",
            minWidth: "14rem",
            position: "relative",
            borderRadius: "10px",
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          {modal.showClose && (
            <button
              style={{
                position: "absolute",
                top: "0.5rem",
                right: "0.5rem",
              }}
              onClick={() => setModal({ open: false })}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="24"
                height="24"
                viewBox="0 0 30 30"
              >
                <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
              </svg>
            </button>
          )}
          {modal.component}
        </div>
      </section>

      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
};

const Overlay = ({
  onClick,
  hidden,
}: {
  onClick: () => void;
  hidden: boolean;
}) => {
  return (
    <div
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: hidden ? "none" : "block",
        zIndex: 999,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
      onClick={() => onClick()}
    ></div>
  );
};
