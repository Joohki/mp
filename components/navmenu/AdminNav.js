import classes from "./AdminNav.module.scss";
import { FaUserCircle } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

import Link from "next/link";

const AdminNav = () => {
  const pathname = usePathname();
  const userEmail = useSelector((state) => state.user.email);
  
  return (
    <div className={classes.navbar}>
      <Link href="/admin">
        <div className={classes.user}>
          <FaUserCircle size={40} color="#fff" />
          <h4>{userEmail}</h4>
        </div>
      </Link>
      <nav>
        <ul>
          <li>
            <Link
              href="/admin/dashboard"
              className={
                pathname === "/admin/dashboard" ? `${classes.active}` : ""
              }
            >
              대시보드
            </Link>
          </li>
          <li>
            <Link
              href="/admin/all-products"
              className={
                pathname === "/admin/all-products" ? `${classes.active}` : ""
              }
            >
              총 상품
            </Link>
          </li>
          <li>
            <Link
              href="/admin/addproduct"
              className={
                pathname === "/admin/addproduct" ? `${classes.active}` : ""
              }
            >
              상품 추가
            </Link>
          </li>
          <li>
            <Link
              href="/admin/orders"
              className={
                pathname === "/admin/orders" ? `${classes.active}` : ""
              }
            >
              주문
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminNav;
