import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../utils/auth";
import InfoTooltip from "./InfoTooltip";
import xImage from "../images/UnionX.svg";
import vImage from "../images/UnionV.svg";

const registerInfo = {
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
const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showModal, setShowModal] = useState(registerInfo.default);

  const handlerSubmit = (e) => {
    e.preventDefault();
    auth
      .register(email, password)
      .then((res) => {
        console.log(res);
        setShowModal(registerInfo.success);
      })
      .catch((error) => {
        console.log(error);
        setShowModal(registerInfo.failure);
      });
  };

  const handleCloseModal = () => {
    setShowModal(registerInfo.default);
  };

  return (
    <div className="auth">
      {showModal.show && (
        <InfoTooltip
          ok={showModal.ok}
          message={showModal.message}
          onClose={handleCloseModal}
        >
          {showModal.ok ? (
            <img src={vImage} alt="Success" />
          ) : (
            <img src={xImage} alt="Failure" />
          )}
        </InfoTooltip>
      )}
      <h4 className="auth__title">Sign up</h4>
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
          Sign up
        </button>
      </form>
      <div className="auth__footer">
        <p className="auth__footer-text">Already a member?</p>
        <Link to="/signin" className="auth__login-link">
          Log in here
        </Link>
      </div>
    </div>
  );
};

export default Register;
