"use client";
import { createContext, ReactNode, useContext, useReducer } from "react";

type StateType = {
  isOpen: boolean;
  isAddNewColumnOpen: boolean;
  isLoading: boolean;
  isAddNewTaskOpen: boolean;
};

type ActionType =
  | { type: "OPEN_DIALOG" }
  | { type: "CLOSE_DIALOG" }
  | { type: "OPEN_NEW_COLUMN_DIALOG" }
  | { type: "CLOSE_NEW_COLUMN_DIALOG" }
  | { type: "OPEN_NEW_TASK_DIALOG" }
  | { type: "CLOSE_NEW_TASK_DIALOG" }
  | { type: "TOGGLE_LOADING_STATE"; payload: boolean };

const initialState: StateType = {
  isOpen: false,
  isAddNewColumnOpen: false,
  isLoading: false,
  isAddNewTaskOpen: false,
};

const DialogContext = createContext<{
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
  openDialog: () => void;
  closeDialog: () => void;
  openNewColumnDialog: () => void;
  closeNewColumnDialog: () => void;
  openNewTaskDialog: () => void;
  closeNewTaskDialog: () => void;
  setIsLoading: (value: boolean) => void;
}>({
  state: initialState,
  dispatch: () => null,
  openDialog: () => {},
  closeDialog: () => {},
  openNewColumnDialog: () => {},
  closeNewColumnDialog: () => {},
  openNewTaskDialog: () => {},
  closeNewTaskDialog: () => {},
  setIsLoading: () => {},
});

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "OPEN_DIALOG":
      return { ...state, isOpen: true };

    case "CLOSE_DIALOG":
      return { ...state, isOpen: false };

    case "OPEN_NEW_COLUMN_DIALOG":
      return { ...state, isAddNewColumnOpen: true };

    case "CLOSE_NEW_COLUMN_DIALOG":
      return { ...state, isAddNewColumnOpen: false };

    case "OPEN_NEW_TASK_DIALOG":
      return { ...state, isAddNewTaskOpen: true };

    case "CLOSE_NEW_TASK_DIALOG":
      return { ...state, isAddNewTaskOpen: false };

    case "TOGGLE_LOADING_STATE":
      return { ...state, isLoading: action.payload };

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

  const openNewColumnDialog = () => {
    dispatch({ type: "OPEN_NEW_COLUMN_DIALOG" });
  };

  const closeNewColumnDialog = () => {
    dispatch({ type: "CLOSE_NEW_COLUMN_DIALOG" });
  };

  const openNewTaskDialog = () => {
    dispatch({ type: "OPEN_NEW_TASK_DIALOG" });
  };

  const closeNewTaskDialog = () => {
    dispatch({ type: "CLOSE_NEW_TASK_DIALOG" });
  };

  const setIsLoading = (value: boolean) => {
    dispatch({ type: "TOGGLE_LOADING_STATE", payload: value });
  };

  return (
    <DialogContext.Provider
      value={{
        state,
        dispatch,
        openDialog,
        closeDialog,
        closeNewColumnDialog,
        openNewColumnDialog,
        closeNewTaskDialog,
        openNewTaskDialog,
        setIsLoading,
      }}
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
