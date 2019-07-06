import React, { useState, useEffect } from "react";
import classnames from "classnames";
import "./Header.css";

const Header = () => {
  const [prevScrollpos, setPrevScrollpos] = useState(null);
  const [visible, setVisible] = useState(true);

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    const visible = prevScrollpos > currentScrollPos;
    setVisible(visible);
    setPrevScrollpos(currentScrollPos);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return function() {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={classnames("navbar", {
        "navbar--hidden": visible
      })}
    >
      <div className="rmdb-header">
        <div className="rmdb-header-content">
          <img
            className="rmdb-logo"
            src="./images/reactMovie_logo.png"
            alt="rmdb-logo"
          />
          <img
            className="rmdb-tmdb-logo"
            src="./images/tmdb_logo.png"
            alt="tmdb-logo"
          />
        </div>
      </div>
    </nav>
  );
};

export default Header;
