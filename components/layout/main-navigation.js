import Link from "next/link";
import { useSession, signOut } from "next-auth/client";
import Logo from "./logo";
import classes from "./main-navigation.module.css";

function MainNavigation() {
  const [session, loading] = useSession();
  function logoutHandler(){
    signOut()
  }
  return (
    <header className={classes.header}>
      <Link href="/">
        <Logo />
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/companies">Companies</Link>
          </li>
          {!session && !loading && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}

          {session && (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          )}
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          {session && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;