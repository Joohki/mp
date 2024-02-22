import MainNavigation from '../navmenu/MainNavigation';
import Footer from './Footer';
import classes from './Layout.module.css'
import AdminProvider from './AdminProvider'
import { ReactNode } from 'react'
interface LayoutProps {
  children: ReactNode;
}
function Layout(props:LayoutProps) {
  return (
    <div className={classes.layout}>
      <MainNavigation /><AdminProvider>
      <main>{props.children}</main></AdminProvider>
      <Footer/>
    </div>
  );
}

export default Layout;
