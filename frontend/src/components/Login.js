import { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { auth } from "../utils/auth";
import InfoTooltip from "./InfoTooltip";
import { save } from "../utils/localStorage";
import { api } from "../utils/api";

const loginInfo = {
  success: {
    ok: true,
    message: "Success! You have now been registered.",
    show: true,
  },
  failure: {
    ok: false,
    message: "Oops, something went wrong! Please try again.",
    show: true,
  },
  default: { ok: true, message: "", show: false },
};

const Login = (props) => {
  const context = useContext(CurrentUserContext);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showModal, setShowModal] = useState(loginInfo.default);

  const handlerSubmit = (e) => {
    e.preventDefault();
    auth
      .login(email, password)
      .then((res) => {
        console.log(res);
        save(res.token);
        api.addHeader("Authorization", `Bearer ${res.token}`);
        getUserInfo();
      })
      .catch((error) => {
        console.log(error);
        setShowModal(loginInfo.failure);
      });
  };

  const handleCloseModal = () => {
    setShowModal(loginInfo.default);
  };

  const getUserInfo = () => {
    api
      .getUserInfo()
      .then((userInfo) => {
        props.setCurrrentUser(userInfo.data);
        history.push("/");
        console.log(context);
      })
      .catch((error) => {
        console.log("Error fetching user data:", error);
      });
  };

  return (
    <div className="auth">
      {showModal.show && (
        <InfoTooltip
          ok={showModal.ok}
          message={showModal.message}
          onClose={handleCloseModal}
        />
      )}
      <h2 className="auth__title">Login</h2>
      <form className="auth__form" onSubmit={handlerSubmit}>
        <input
          className="auth__input"
          id="email"
          type="email"
          required
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          className="auth__input"
          id="password"
          type="password"
          required
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button className="auth__button" type="submit">
          Login
        </button>
      </form>
      <div className="auth__footer">
        <p className="auth__footer-text">Already a member?</p>
        <Link to="/signup" className="auth__login-link">
          Sign up here
        </Link>
      </div>
    </div>
  );
};

export default Login;
