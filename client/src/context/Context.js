import { createContext, useEffect } from "react";
import { useImmerReducer } from "use-immer";
import { useCookies } from "react-cookie";
export const StateContext = createContext();
export const DispatchContext = createContext();

const ContextProvider = ({ children }) => {
  const [cookies, setCookies, removeCookies] = useCookies();
  // const [cookie, setCookie, removeCookie] = useCookies(["google-auth-session"]);

  const initialState = {
    loggedIn: Boolean(cookies?.jwt),
    flashMessages: [],
    token: cookies?.jwt,
    user: {
      username: cookies?.user?.username,
      email: cookies?.user?.email,
      photo: cookies?.user?.photo,
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
        draft.user.username = null;
        draft.user.email = null;
        draft.user.photo = null;
        return;
      case "flashMessage":
        draft.flashMessages.push({
          message: action.value,
          status: action.status,
        });
        return;
      case "updateProfile":
        draft.user.username = action.value.username;
        draft.user.email = action.value.email;
        draft.user.photo = action.value.photo;
        return;
      default:
        return;
    }
  }
  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  useEffect(() => {
    if (state.loggedIn) {
      setCookies("user", state.user);
      // localStorage.setItem("GreetToken", state.token);
      // localStorage.setItem("GreetUsername", state.user.username);
      // localStorage.setItem("GreetEmail", state.user.email);
      // localStorage.setItem("GreetPhoto", state.user.photo);
    } else {
      // localStorage.removeItem("GreetToken");
      // localStorage.removeItem("GreetUsername");
      // localStorage.removeItem("GreetEmail");
      // localStorage.removeItem("GreetPhoto");

      removeCookies("jwt");
      removeCookies("user");
      removeCookies("google-auth-session");
      // console.log(state.user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.loggedIn, state.user]);

  // console.log(state.user);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export { ContextProvider };
