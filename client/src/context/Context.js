import { createContext, useEffect } from "react";
import { useImmerReducer } from "use-immer";

export const StateContext = createContext();
export const DispatchContext = createContext();

const ContextProvider = ({ children }) => {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("GreetToken")),
    flashMessages: [],
    token: localStorage.getItem("GreetToken"),
    user: {
      username: localStorage.getItem("GreetUsername"),
      email: localStorage.getItem("GreetEmail"),
      photo: localStorage.getItem("GreetPhoto"),
    },
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case "login":
        draft.loggedIn = true;
        draft.token = action.data;
        return;
      case "logout":
        draft.loggedIn = false;
        return;
      case "flashMessage":
        draft.flashMessages.push({
          message: action.value,
          status: action.status,
        });
        return;
      case "updateProfile":
        draft.user = action.value;
        return;
      default:
        return;
    }
  }
  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem("GreetToken", state.token);
    } else {
      localStorage.removeItem("GreetToken");
      localStorage.removeItem("GreetAppUsername");
      localStorage.removeItem("GreetAppEmail");
      localStorage.removeItem("GreetAppPhoto");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.loggedIn]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export { ContextProvider };
