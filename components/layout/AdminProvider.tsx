import React from "react";
import classes from "./AdminProvider.module.scss";
import { usePathname } from "next/navigation";
import AdminNav from "@/components/navmenu/AdminNav";

const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isAdmin = pathname && pathname.startsWith("/admin");

  return (
    <>
      {isAdmin ? (
        <div className={classes.admin}>
          <div className={classes.navbar}>
            <AdminNav />
          </div>
          <div className={classes.content}>{children}</div>
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default AdminProvider;
