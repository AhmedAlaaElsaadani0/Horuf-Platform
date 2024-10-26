import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { Link } from "react-router-dom";
import style from "./MobileNav.module.css";

import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { authContext } from "../../Context/authContext";
import ApiManager from "../../Utilies/ApiManager";
import { HashLink } from "react-router-hash-link";
import DarkModeToggle from "../../Component/DarkModeToggle/DarkModeToggle";
import { isThemeModeContext } from "../../Context/isThemeModeContext";
import { IsMobileContext } from "../../Context/isMobileContext";
const MobileNav = () => {
  const { t } = useTranslation();
  const [active, setActive] = useState("Home");
  const [isOpenSide, setIsOpenSide] = useState(false);
  const location = useLocation();
  const { isDarkMode, setIsDarkMode } = useContext(isThemeModeContext);
  let { isRegistered, setToken, token, user } = useContext(authContext);
  const { isMobile } = useContext(IsMobileContext);

  const navBar = useRef(null);
  const navBarTop = useRef(null);

  const links = [
    {
      icon: <i className="fa-solid fa-house"></i>,
      link: t("mobile_nav_link_Home"),
      active: "Home",
      to: "./#Home",
    },
    {
      icon: <i className="fa-solid fa-circle-info"></i>,
      link: t("mobile_nav_link_About"),
      active: "About",
      to: "About#About",
    },
    {
      icon: <i className="fa-solid fa-book"></i>,
      link: t("mobile_nav_link_Subjects"),
      active: "Subjects",
      to: "subjects#subjects",
    },
    {
      icon: <i className="fa-solid fa-envelope"></i>,
      link: t("mobile_nav_link_Contact"),
      active: "Contact",
      to: "Contact#Contact",
    },
  ];
  // logout function
  const logOut = async () => {
    setToken(null);
    await ApiManager.logOut(token);
  };
  let profileLinks = [
    {
      link: t("nav_link_edit_password"),
      active: "edit-password",
      to: "/profile/edit-password",
      clickFun: null,
    },
    {
      link: t("nav_link_my_courses"),
      active: "my-courses",
      to: "/profile/my-courses",
      clickFun: null,
    },
    {
      link: t("nav_link_logout"),
      active: "logout",
      to: "",
      clickFun: logOut,
    },
  ];

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const options = {
      threshold: 0.01,
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    }, options);

    if (sections.length > 0) {
      sections.forEach((section) => {
        observer.observe(section);
      });
    }

    return () => {
      if (sections.length > 0) {
        sections.forEach((section) => {
          observer.unobserve(section);
        });
      }
    };
  }, [location.pathname]);

  const linksLoginRegister = [
    {
      link: t("nav_link_Login"),
      active: "Login",
      to: "/Login",
    },
    {
      link: t("nav_link_Register"),
      active: "Register",
      to: "/Register",
    },
  ];
  var toggleAside = () => {
    setIsOpenSide(!isOpenSide);
  };

  useEffect(() => {
    // Add padding to the body to prevent the content from being hidden behind the navbar when the page is scrolled
    if (isMobile) {
      document.body.style.paddingBottom = `${navBar.current.clientHeight}px`;
      document.body.style.paddingTop = `${navBarTop.current.clientHeight}px`;
    } else {
      document.body.style.paddingBottom = "0px";
      document.body.style.paddingTop = "0px";
    }
    return () => {
      document.body.style.paddingBottom = "0px";
      document.body.style.paddingTop = "0px";
    };
  }, []);

  return (
    <>
      <div className={"w-100  fixed-top " + style["navbarTop"]} ref={navBarTop}>
        <div className="container text-center p-3 ">
          <motion.p
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="m-0 "
          >
            مرحبا بك فى اكادمية حروف <span>اكتشف المزيد ! </span>
          </motion.p>
        </div>
      </div>
      <div className={`${style.mobile}`}>
        <div className="floated ">
          <div className={`${style.fixedButton} position-fixed`}>
            <button
              className="btn position-relative btn-primary rounded-circle p-3"
              onClick={toggleAside}
            >
              {isRegistered ? (
                <i className="fa-solid fa-user"></i>
              ) : (
                <i className="fa-solid fa-bars"></i>
              )}
              {user && !user?.isVerified && (
                <span
                  className="position-absolute end-0 top-0 translate-middle p-1 bg-danger border border-light rounded-circle"
                  style={{}}
                >
                  <span className="visually-hidden">New alerts</span>
                </span>
              )}
            </button>
          </div>
          {isOpenSide && (
            <aside className={`${style.full_screen} position-fixed`}>
              <div className={`${`aside_content`} w-100 position-relative p-4`}>
                <div className="sideTop mb-4 ">
                  <button
                    className={`${`close_aside`} btn btn-danger position-absolute top-0 right-0 m-3 `}
                    onClick={toggleAside}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
                <div className="navlist">
                  <motion.ul
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-4 d-flex flex-column  align-items-center "
                  >
                    {isRegistered ? (
                      <div className={" position-relative  "}>
                        <ul className="d-flex flex-column  align-items-center">
                          <li
                            onClick={() =>
                              isOpenSide ? setIsOpenSide(false) : isOpenSide
                            }
                            className="  position-relative"
                          >
                            <Link to="/profile">
                              {t("nav_link_edit_profile")}
                            </Link>
                          </li>

                          <li
                            onClick={() =>
                              isOpenSide ? setIsOpenSide(false) : isOpenSide
                            }
                            className="  position-relative"
                          >
                            <Link to="/profile/edit-email">
                              {user && !user?.isVerified
                                ? t("nav_link_verify_email")
                                : t("nav_link_edit_email")}
                              {user && !user?.isVerified && (
                                <span
                                  className={`position-absolute end-0 top-50 translate-middle-y p-1 ${style.minus} bg-danger border border-light rounded-circle`}
                                >
                                  <span className="visually-hidden">
                                    New alerts
                                  </span>
                                </span>
                              )}
                            </Link>
                          </li>
                          {profileLinks.map((link, idx) => (
                            <li
                              onClick={() =>
                                isOpenSide ? setIsOpenSide(false) : isOpenSide
                              }
                              key={idx}
                              className="  position-relative"
                            >
                              <Link
                                className={``}
                                to={link.to}
                                onClick={link.clickFun}
                              >
                                {link.link}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      linksLoginRegister.map((link, idx) => (
                        <li
                          onClick={() =>
                            isOpenSide ? setIsOpenSide(false) : isOpenSide
                          }
                          key={idx}
                          className=" "
                        >
                          <HashLink className={``} to={link.to}>
                            {link.link}
                          </HashLink>
                        </li>
                      ))
                    )}
                    <ul className=" d-flex flex-column  align-items-cente">
                      <li>
                        <DarkModeToggle
                          isDarkMode={isDarkMode}
                          setIsDarkMode={setIsDarkMode}
                        />
                      </li>
                      <li
                        onClick={() =>
                          isOpenSide ? setIsOpenSide(false) : isOpenSide
                        }
                      >
                        <button
                          className="btn btn-outline-primary"
                          // onClick={toggleLanguage}
                        >
                          {/* {t("nav_lang")} */}
                          الكويت
                          <i className="fa-solid fa-globe mx-2"></i>
                        </button>
                      </li>
                    </ul>
                  </motion.ul>
                </div>
              </div>
            </aside>
          )}
        </div>

        <nav
          className={`navbar lead navbar-expand-lg shadow  fixed-bottom pb-5  ${style.navbar}`}
          data-bs-theme={isDarkMode ? "dark" : "light"}
          ref={navBar}
        >
          <div className="container">
            <div
              className={`row w-100  ${style["list-links"]} justify-content-between text-center`}
            >
              {links.map((link, index) => (
                <div key={index} className="col">
                  <Link
                    to={link.to}
                    onClick={() =>
                      isOpenSide ? setIsOpenSide(false) : isOpenSide
                    }
                    className={`nav-link ${
                      link.active == active ? style["selected"] : ""
                    } d-flex flex-column align-items-center`}
                  >
                    {link.icon}
                    <span>{link.link}</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default MobileNav;