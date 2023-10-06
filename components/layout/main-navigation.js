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
function MainNavigation() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [isCartClicked, setIsCartClicked] = useState(false);
  const [isMouseOverMenu, setIsMouseOverMenu] = useState(false);
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const showModal = () => {
    setIsMenuClicked(true);
  };
  const hideModal = () => {
    setIsMenuClicked(false);
    setIsMouseOverMenu(false);
  };
  const showCartModal = () => {
    setIsCartClicked(true);
  };
  const hideCartModal = () => {
    setIsCartClicked(false);
  };
  return (
    <>
      {isMenuClicked && (
        <Modal onCloseModal={hideModal}>
          <NavMenu onCloseModal={hideModal}></NavMenu>
        </Modal>
      )}
      {isCartClicked && <Cart onCloseCart={hideCartModal} />}
      {!isMenuClicked && !isCartClicked && (
        <header
          className={
            isMouseOverMenu ? classes.additionalHeader : classes.header
          }
        >
          <Link href="/">
            <Logo isMouseOverMenu={isMouseOverMenu} />
          </Link>
          <nav>
            <ul>
              <li>
                <Link href="/companies">회사소개</Link>
              </li>
              <div className={classes.dropdowncontent}>
                <a href="#">Link 1</a>
                <a href="#">Link 2</a>
                <a href="#">Link 3</a>
              </div>
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
                    onMouseOver={() => {
                      setIsMouseOverMenu(true);
                    }}
                    onMouseOut={() => {
                      setIsMouseOverMenu(false);
                    }}
                    onClick={() => {
                      setIsMenuClicked(true);
                    }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faBars}
                    style={{ fontSize: 25, color: "white" }}
                    onMouseOver={() => {
                      setIsMouseOverMenu(true);
                    }}
                    onMouseOut={() => {
                      setIsMouseOverMenu(false);
                    }}
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
      )}
    </>
  );
}

export default MainNavigation;
