import Link from "next/link";
import React, { useState } from "react";
import NavItem from "@/components/NavItem";
import { useSession, signIn, signOut } from "next-auth/react"
import styles from '@/styles/Home.module.css'

const MENU_LIST = [
  { text: "Home", href: "/" },
  { text: "About", href: "/about" },
  { text: "Audit", href: "/audit" },
  { text: "GitHub", href: "https://github.com/AndrewSpittlemeister/c4g-efsp-front-end" },
  // { text: "Survey", href: "https://forms.office.com/Pages/ResponsePage.aspx?id=u5ghSHuuJUuLem1_Mvqgg77XCbGawB9Gl_Mb2IsliK9UQ0tBTjQzNk1PWFA1R0FTUEQyRFRTNkdQQS4u"},
];

export default function Navbar() {
  const [navActive, setNavActive] = useState(null);
  const [activeIdx, setActiveIdx] = useState(-1);
  const { data: session } = useSession();

  return (
    <header>
      <nav className={`nav`}>
        <Link href={"/"}>{"United Way of Metro Atlanta: EFSP Dashboard"}</Link>
        <div
          onClick={() => setNavActive(!navActive)}
          className={`nav__menu-bar`}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={`${navActive ? "active" : ""} nav__menu-list`}>
          {MENU_LIST.map((menu, idx) => (
            <div onClick={() => { setActiveIdx(idx); setNavActive(false);}} key={menu.text}>
              <NavItem active={activeIdx === idx} {...menu} />
            </div>
          ))}
          {
            session ? (
              <div>
                <button className={styles.invisibleButton} onClick={() => signOut()}>
                  {'Sign Out'}
                </button>
              </div>
            ) : (
              <div>
                <button className={styles.invisibleButton} onClick={() => signIn()}>
                  {'Sign In'}
                </button>
              </div>
            )
          }
        </div>
      </nav>
    </header>
  );
}
