"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./header.module.scss";
import { handleLogout } from "@/app/crochet/(helpers)/auth.helpers";
import Link from "@/app/crochet/(components)/link/link";

const Header = () => {
  const pathname = usePathname() || "";
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const isLoginPage = pathname.startsWith("/crochet/login");
  const isSignupPage = pathname.startsWith("/crochet/signup");

  const displayAuthLinks = !loading && !isLoginPage && !isSignupPage;

  useEffect(() => {
    // Check authentication status from API
    const checkAuth = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/auth/status");
        const data = await response.json();
        console.log(data);
        setIsLoggedIn(data.isAuthenticated);
      } catch (error) {
        console.error("Error checking auth status:", error);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [pathname]); // Re-check when pathname changes

  if (!pathname.startsWith("/crochet")) {
    return null;
  }

  const links = [
    {
      label: "Yarns",
      href: "/crochet/yarns",
    },
    {
      label: "About",
      href: "/crochet/about",
    },
  ];

  function renderAuthLinks() {
    if (isLoggedIn) {
      return (
        <form
          onSubmit={async (e) => {
            await handleLogout(e);
            setIsLoggedIn(false);
          }}
        >
          <button type="submit">Logout</button>
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
        {!loading && <div className={styles["links"]}>{renderAuthLinks()}</div>}
      </div>
    </div>
  );
};

export default Header;
