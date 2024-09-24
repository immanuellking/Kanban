export const reducer = (state: StateType, action: ActionType) => {
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
        return { ...state, isAddNewTaskOpen: true, isEditingTask: action.payload };
  
      case "CLOSE_NEW_TASK_DIALOG":
        return { ...state, isAddNewTaskOpen: false, isEditingTask: false };
  
      case "OPEN_VIEW_TASK_DIALOG":
        return { ...state, viewTaskOpen: true, task: action.payload };
  
      case "CLOSE_VIEW_TASK_DIALOG":
        return { ...state, viewTaskOpen: false, };
  
      case "TOGGLE_LOADING_STATE":
        return { ...state, isLoading: action.payload };
  
      default:
        return state;
    }
  };