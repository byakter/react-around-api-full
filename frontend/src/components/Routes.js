import { Route, useHistory } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import App from "./App";
import Header from "./Header";
import { useState, useEffect, useCallback } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import { remove } from "../utils/localStorage";
import ProtectedRoute from "./ProtectedRoute";
import { load } from "../utils/localStorage";
import { api } from "../utils/api";

const headerLinks = {
  signup: { path: "/signin", text: "Login" },
  signin: { path: "/signup", text: "Signup" },
  logout: { path: "/", text: "Logout" },
};
const Routes = () => {
  const [currentUser, setCurrrentUser] = useState({});
  const [headerLink, setHeaderLink] = useState(headerLinks.signin);
  const history = useHistory();

  const setLogin = () => setHeaderLink(headerLinks.signin);
  const setRegister = () => setHeaderLink(headerLinks.signup);
  const setLogout = () => setHeaderLink(headerLinks.logout);
  const handleLink = () => {
    if (headerLink.path === "/signup") {
      setRegister();
    } else {
      setCurrrentUser({});
      remove();
      setLogin();
    }
  };

  const autoLogin = useCallback(() => {
    const token = load();
    api.addHeader("Authorization", `Bearer ${token}`);
    if (token) {
      api
        .getUserInfo()
        .then((userInfo) => {
          setCurrrentUser(userInfo.data);
          history.push("/");
        })
        .catch((error) => {
          console.log("Error fetching user data:", error);
        });
    }
  }, [history]);

  useEffect(() => {

    if (currentUser?.email) setLogout();
    else autoLogin();
  }, [currentUser, autoLogin]);

  return (
    <CurrentUserContext.Provider value={{ user: currentUser }}>
      <div className="page">
        <Header headerLink={headerLink} onClick={handleLink} />
        <Switch>
          <Route path="/signin">
            <Login setCurrrentUser={setCurrrentUser} />
          </Route>
          <Route path="/signup" component={Register} />
          <ProtectedRoute loggedIn={currentUser?.email}>
            <App setCurrrentUser={setCurrrentUser} />
          </ProtectedRoute>

          <Route path="*">
            <Login />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default Routes;
