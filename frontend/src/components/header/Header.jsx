import "../../common/common.css";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

const Header = ({ setIsLogIn }) => {
  const username = localStorage.getItem("username");

  const signoutUser = () => {
    // Clear the auth cookie and reset authentication state
    document.cookie = "authToken=; max-age=0; path=/; secure; samesite=strict";
    localStorage.removeItem("username");
    setTimeout(() => {
      toast.error(`🦄 Logout sucess`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }, 1000);
    setIsLogIn(false);
  };

  return (
    <section className=" position-fixed w-100 bg-light ">
      <div class="container  ">
        <div class="row">
          <div class="col">
            <a class="navbar-brand mb-0" href="index.html">
              Your<span>Logo</span>
            </a>
          </div>
        </div>
      </div>
      <nav
        class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light"
        id="ftco-navbar"
      >
        <div class="container">
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#ftco-nav"
            aria-controls="ftco-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="fa fa-bars"></span> Menu
          </button>
          <form
            action="#"
            class="order-lg-last w-25 d-flex justify-content-between "
          >
            <div class="social-media ">
              <p class="mb-0 d-flex justify-content-between align-items-center h-100 w-100">
                <a
                  href="#"
                  class="d-flex align-items-center justify-content-center"
                >
                  <span class="fa fa-user">
                    <i class="sr-only">Dribbble</i>
                  </span>
                </a>
                <span className="legend ml-2">{username}</span>
              </p>
            </div>
            <div class="social-media ">
              <p class="mb-0 d-flex justify-content-between align-items-center h-100 w-100">
                <a
                  class="d-flex align-items-center justify-content-center"
                  onClick={signoutUser}
                >
                  <span class="fa fa-sign-out">
                    <i class="sr-only">Sign Out</i>
                  </span>
                </a>
                <span></span>
              </p>
            </div>
          </form>
          <div class="collapse navbar-collapse" id="ftco-nav">
            <ul class="navbar-nav mr-auto">
              <CustomLink to="/">Home</CustomLink>
              <CustomLink to="/employees">Employees</CustomLink>
            </ul>
          </div>
        </div>
      </nav>
    </section>
  );
};

export default Header;

const CustomLink = ({ to, children, ...props }) => {
  const resolvePath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvePath.pathname, end: true });
  return (
    <li className={`nav-item ${isActive ? "active" : ""}`}>
      <Link className="nav-link" to={to} {...props}>
        {children}
      </Link>
    </li>
  );
};
