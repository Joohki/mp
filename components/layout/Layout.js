import MainNavigation from '../navmenu/MainNavigation';
import Footer from './Footer';
import classes from './Layout.module.css'
import AdminProvider from './AdminProvider'
function Layout(props) {
  return (
    <div className={classes.layout}>
      <MainNavigation /><AdminProvider>
      <main>{props.children}</main></AdminProvider>
      <Footer/>
    </div>
  );
}

export default Layout;
