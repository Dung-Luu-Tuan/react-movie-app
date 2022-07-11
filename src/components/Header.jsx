import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [navbarColor, setNavbarColor] = useState();
  const changeBackground = () => {
    if (window.scrollY > 600) {
      setNavbarColor("rgba(51, 10, 103, 0.93)");
    } else {
      setNavbarColor("transparent");
    }
  };

  useEffect(() => {
    const id = window.addEventListener("scroll", changeBackground);

    return () => {
      window.removeEventListener(id);
    };
  }, []);
  return (
    <div className="header2" style={{ backgroundColor: navbarColor }}>
      <Link to="/" className="page-link">
        <div className="appName">
          <img className="movieImg" src="/movie-icon.svg" alt="" />
          <span className="movieLogo">React Movie App</span>
        </div>
      </Link>
    </div>
  );
}

export default Header;
