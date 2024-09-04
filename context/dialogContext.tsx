"use client";
import { createContext, ReactNode, useContext, useReducer } from "react";

type StateType = {
  isOpen: boolean;
};

type ActionType =
  | {
      type: "OPEN_DIALOG";
    }
  | { type: "CLOSE_DIALOG" };

const initialState: StateType = {
  isOpen: false,
};

const DialogContext = createContext<{
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
  openDialog: () => void;
  closeDialog: () => void;
}>({
  state: initialState,
  dispatch: () => null,
  openDialog: () => {},
  closeDialog: () => {},
});

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "OPEN_DIALOG":
      return { isOpen: true };

    case "CLOSE_DIALOG":
      return { isOpen: false };

    default:
      return state;
  }
};

export function DialogProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openDialog = () => {
    dispatch({ type: "OPEN_DIALOG" });
  };

  const closeDialog = () => {
    dispatch({ type: "CLOSE_DIALOG" });
  };

  return (
    <DialogContext.Provider
      value={{ state, dispatch, openDialog, closeDialog }}
    >
      {children}
    </DialogContext.Provider>
  );
}

export function useDialog() {
  const context = useContext(DialogContext);

  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
