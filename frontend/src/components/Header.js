import { Link } from "react-router-dom";
import logo from "../images/Vector.svg";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Header = (props) => {
  const context = useContext(CurrentUserContext);

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="around-the-us-logo" />
      <div className="header__content">
        {" "}
        {context.user?.email && (
          <p className="header__user-info">{context.user.email}</p>
        )}
        <Link
          className="header__link"
          onClick={props.onClick}
          to={props.headerLink.path}
        >
          {props.headerLink.text}
        </Link>
      </div>
    </header>
  );
};

export default Header;
