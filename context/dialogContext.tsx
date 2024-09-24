"use client";
import { createContext, ReactNode, useContext, useReducer } from "react";
import { reducer } from "./reducer";

const initialState: StateType = {
  isOpen: false,
  isAddNewColumnOpen: false,
  isLoading: false,
  isAddNewTaskOpen: false,
  viewTaskOpen: false,
  isEditingTask: false,
  task: null,
};

const DialogContext = createContext<{
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
  openDialog: () => void;
  closeDialog: () => void;
  openNewColumnDialog: () => void;
  closeNewColumnDialog: () => void;
  openNewTaskDialog: (isEdit: boolean) => void;
  closeNewTaskDialog: () => void;
  openViewTaskDialog: (task: Task) => void;
  closeViewTaskDialog: () => void;
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
  openViewTaskDialog: () => {},
  closeViewTaskDialog: () => {},
  setIsLoading: () => {},
});

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

  const openNewTaskDialog = (isEdit: boolean) => {
    dispatch({ type: "OPEN_NEW_TASK_DIALOG", payload: isEdit });
  };

  const closeNewTaskDialog = () => {
    dispatch({ type: "CLOSE_NEW_TASK_DIALOG" });
  };

  const openViewTaskDialog = (task: Task) => {
    dispatch({ type: "OPEN_VIEW_TASK_DIALOG", payload: task });
  };

  const closeViewTaskDialog = () => {
    dispatch({ type: "CLOSE_VIEW_TASK_DIALOG" });
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
        closeViewTaskDialog,
        openViewTaskDialog,
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
    throw new Error("useDialog must be used within a Dialog Provider");
  }

  return context;
}
