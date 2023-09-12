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
      case "register":
      case "login":
        draft.loggedIn = true;
        draft.token = action.token;
        draft.user = action.user;
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
      localStorage.setItem("GreetUsername", state.user.username);
      localStorage.setItem("GreetEmail", state.user.email);
      localStorage.setItem("GreetPhoto", state.user.photo);
    } else {
      localStorage.removeItem("GreetToken");
      localStorage.removeItem("GreetUsername");
      localStorage.removeItem("GreetEmail");
      localStorage.removeItem("GreetPhoto");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.loggedIn, state.user]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export { ContextProvider };
