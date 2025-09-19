import React from "react";

export type EndFlowModalTypes = "success" | "error";

interface State {
  type: EndFlowModalTypes | undefined;
  visible: boolean;
  message: string;
  title: string;
}

export interface SetModalAction {
  type: "SET_MODAL";
  setType: EndFlowModalTypes | undefined;
  setMessage: string;
  setTitle: string;
  setVisible?: boolean;
}

export interface SetVisibleAction {
  type: "SET_VISIBLE";
  setVisible: boolean;
}

type Action = SetModalAction | SetVisibleAction;

type Dispatch = (action: Action) => void;

interface EndFlowModalContextData {
  state: State;
  dispatch: Dispatch;
  showSuccess: ({ title, message }: { title: string; message: string }) => void;
  showError: ({ title, message }: { title: string; message: string }) => void;
}

const EndFlowModalContext = React.createContext<
  EndFlowModalContextData | undefined
>(undefined);

function endFlowModalReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_MODAL":
      return {
        ...state,
        type: action.setType,
        title: action.setTitle,
        message: action.setMessage,
        visible: action.setVisible ? action.setVisible : state.visible,
      };
    case "SET_VISIBLE":
      return {
        ...state,
        visible: action.setVisible,
      };
    default:
      throw new Error(`Unhandled action type`);
  }
}

function EndFlowModalProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  const [state, dispatch] = React.useReducer(endFlowModalReducer, {
    type: undefined,
    visible: false,
    title: "",
    message: "",
  });

  const showSuccess = ({
    title,
    message,
  }: {
    title: string;
    message: string;
  }) => {
    dispatch({
      type: "SET_MODAL",
      setType: "success",
      setVisible: true,
      setTitle: title,
      setMessage: message,
    });
  };

  const showError = ({
    title,
    message,
  }: {
    title: string;
    message: string;
  }) => {
    dispatch({
      type: "SET_MODAL",
      setType: "error",
      setVisible: true,
      setTitle: title,
      setMessage: message,
    });
  };

  return (
    <EndFlowModalContext.Provider
      value={{ state, dispatch, showSuccess, showError }}
    >
      {children}
    </EndFlowModalContext.Provider>
  );
}

function useEndFlowModal(): EndFlowModalContextData {
  const context = React.useContext(EndFlowModalContext);
  if (context === undefined) {
    throw new Error(
      "useEndFlowModal must be used within a EndFlowModalProvider"
    );
  }
  return context;
}

export { EndFlowModalProvider, useEndFlowModal };
