import { ReactNode, Reducer, createContext, useReducer } from "react";

export enum StoreAction {
  GET_USER = "getUser",
  GET_CLIENT = "getClient",
  UPDATE_CLIENT = "updateClient",
  UPDATE_CHAT = "updateChat",
  CLEAR_CHAT = "clearChat",
  GET_SUPPORTED_CLIENT = "getSupportedClient",
}

interface Action {
  type: StoreAction;
  payload: any;
}

interface State {
  user: any | null;
  client: any;
  chats: any;
  supportedClient: any;
}

export const StoreContext = createContext<any>({});

const StoreReducer = (state: State, action: Action) => {
  switch (action.type) {
    case StoreAction.GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case StoreAction.GET_CLIENT:
      return { ...state, client: [...(state.client as []), action.payload] };
    case StoreAction.UPDATE_CLIENT:
      return { ...state, client: action.payload };
    case StoreAction.UPDATE_CHAT:
      return { ...state, chats: [...(state.chats as []), action.payload] };
    case StoreAction.CLEAR_CHAT:
      return { ...state, chats: [] };
    case StoreAction.GET_SUPPORTED_CLIENT:
      return { ...state, supportedClient: action.payload };
    default:
      return state;
  }
};

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer<Reducer<State, Action>>(StoreReducer, {
    user: null,
    client: [],
    chats: [],
    supportedClient: null,
  });

  return (
    <StoreContext.Provider value={{ ...state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
