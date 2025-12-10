"use client";
import Link from "../../crochet/(components)/link/link";
import {
  handleLogout,
  isAuthenticated,
} from "../../crochet/(helpers)/auth.helpers";
import { usePathname } from "next/navigation";
import styles from "./header.module.scss";
import { useEffect, useState } from "react";
import Button from "../../crochet/(components)/button/button";

const Header = () => {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname() || "";
  const isLoginPage = pathname.startsWith("/crochet/login");
  const isSignupPage = pathname.startsWith("/crochet/signup");
  const isLoggedIn = isAuthenticated();
  const displayAuthLinks = !isLoginPage && !isSignupPage;

  useEffect(() => {
    setLoading(false);
  }, []);

  if (!pathname.startsWith("/crochet")) {
    return null;
  }

  const links = [
    {
      label: "Dashboard",
      href: "/crochet/dashboard",
    },
    {
      label: "Yarns",
      href: "/crochet/yarns",
    },
    // TODO - add about page
    // {
    //   label: "About",
    //   href: "/crochet/about",
    // },
  ];

  function renderAuthLinks() {
    if (loading) {
      return null;
    }
    if (isLoggedIn) {
      return (
        <form
          onSubmit={async (e) => {
            await handleLogout(e);
          }}
        >
          <Button type="submit">Logout</Button>
        </form>
      );
    } else {
      return (
        <div className={styles["login-link"]}>
          <span>Already have an account?</span>
          <Link href="/crochet/login" displayIcon={false}>
            LogIn
          </Link>
        </div>
      );
    }
  }

  return (
    <div className={`${styles["header"]} header`}>
      <div className={styles["links-wrapper"]}>
        <div className={styles["links"]}>
          {displayAuthLinks &&
            links.map((link, idx) => (
              <a
                key={link.href + idx}
                className={styles["link"]}
                href={link.href}
              >
                {link.label}
              </a>
            ))}
        </div>
        <div className={styles["links"]}>{renderAuthLinks()}</div>
      </div>
    </div>
  );
};

export default Header;
