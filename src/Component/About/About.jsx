import Lottie from "lottie-react";
import React, { useEffect, useState } from "react";
import Heading1 from "../Heading1/Heading1";
import aboutAnimation from "../../assets/animations/teacher.json";
import { useTranslation } from "react-i18next";
import style from "./About.module.css";
import { NavLink, Outlet, useLocation } from "react-router-dom"; // Use NavLink instead of Link

export default function About() {
  const { t } = useTranslation();
  const [active, setActive] = useState("/About");
  const location = useLocation();
  useEffect(() => {
    setActive(location.pathname);
    console.log(location.pathname);
  }, [location.pathname]);
  const links = [
    {
      to: "/About/ourMission",
      text: t("about_links_1"),
      active: "/About/ourMission",
    },
    {
      to: "/About/ourVision",
      text: t("about_links_2"),
      active: "/About/ourVision",
    },
    {
      to: "/About/ourValues",
      text: t("about_links_3"),
      active: "/About/ourValues",
    },
  ];
  return (
    <section id="About" className={style.About}>
      <Heading1 headingText={t("About us")} />
      <div className={"container " + style["about-content"]}>
        <div className="row justify-content-center g-5 mt-2">
          <div className={"col-lg-4   " + style["text"]}>
            <h2>{t("about_title")}</h2>
            <p>{t("about_subtitle")}</p>
            <Lottie animationData={aboutAnimation} className="w-100 " />
          </div>
          <div className={"col-lg-8 " + style["text-desc"]}>
            <p>{t("about_desc")}</p>
            <div className={style["miniNav"]}>
              {links.map((link, index) => (
                <NavLink
                  key={index}
                  to={link.to}
                  className={
                    link.active === active || (index == 0 && active == "/About")
                      ? style.active
                      : ""
                  }
                >
                  {link.text}
                </NavLink>
              ))}
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
}
