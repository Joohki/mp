import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Logo from "./logo";
import classes from "./main-navigation.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Modal from "../ui/modal";
import NavMenu from "../navmenu/navmenu";
import CartButton from "../cart/cartbutton";
import Cart from "../cart/cart";
import HoverNavigation from "./hover-navigation";
import MobileNavMenu from "../navmenu/mobilenavmenu";
function MainNavigation() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [isCartClicked, setIsCartClicked] = useState(false);
  const [isMouseOverMenu, setIsMouseOverMenu] = useState(false);
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const [isMobileMenuClicked, setIsMobileMenuClicked] = useState(false);
  const showModal = () => {
    setIsMenuClicked(true);
  };
  const showMobileModal = () => {
    setIsMobileMenuClicked(true);
  };
  const hideModal = () => {
    setIsMenuClicked(false);
    setIsMobileMenuClicked(false);
    setIsCartClicked(false);
    setIsMouseOverMenu(false);
  };
  const showCartModal = () => {
    setIsCartClicked(true);
  };
  
  return (
    <>
      {isMenuClicked && <NavMenu onCloseModal={hideModal}></NavMenu>}
      {isCartClicked && <Cart onCloseCart={hideModal} />}
      {isMobileMenuClicked && <MobileNavMenu onCloseModal={hideModal}></MobileNavMenu>}
      {!isMenuClicked && !isCartClicked && !isMobileMenuClicked && (
        <div
          onMouseOver={() => {
            setIsMouseOverMenu(true);
          }}
          onMouseOut={() => {
            setIsMouseOverMenu(false);
          }}
        >
          <header
            className={
              isMouseOverMenu ? classes.additionalHeader : classes.header
            }
          >
            <Link href="/">
              <Logo isMouseOverMenu={isMouseOverMenu} />
            </Link>
            <ul className={classes.mobile}>
              {!session && (
                <li className={classes.mobile}>
                  <Link href="/auth">로그인</Link>
                </li>
              )}

              {session && (
                <li className={classes.mobile}>
                  <Link href="/profile">프로필</Link>
                </li>
              )}
              <li className={classes.mobile}>
                {isMouseOverMenu ? (
                  <FontAwesomeIcon
                    icon={faBars}
                    style={{ fontSize: 25, color: "black" }}
                    onClick={showMobileModal}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faBars}
                    style={{ fontSize: 25, color: "white" }}
                    onClick={showMobileModal}
                  />
                )}
              </li>
            </ul>
            <nav>
              <ul>
                <li>
                  <Link href="/companies">회사소개</Link>
                </li>

                <li>
                  <Link href="/products">상품</Link>
                </li>

                {!session && (
                  <li>
                    <Link href="/auth">로그인</Link>
                  </li>
                )}

                {session && (
                  <li>
                    <Link href="/profile">프로필</Link>
                  </li>
                )}

                <li>
                  <Link href="/contact">문의</Link>
                </li>

                <li>
                  {isMouseOverMenu ? (
                    <FontAwesomeIcon
                      icon={faBars}
                      style={{ fontSize: 25, color: "black" }}
                      onClick={showModal}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faBars}
                      style={{ fontSize: 25, color: "white" }}
                      onClick={showModal}
                    />
                  )}
                </li>
                <li>
                  <CartButton onCart={showCartModal} />
                </li>
              </ul>
            </nav>
          </header>
          {isMouseOverMenu && (
            <div className={classes.mobilehover}>
              {" "}
              <HoverNavigation />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default MainNavigation;
