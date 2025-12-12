import { Outlet } from 'react-router-dom';
import styles from './Sidebar.module.css';
import AppNav from './AppNav';
import Logo from './Logo';

function Sidebar() {
  return (<div className={styles.sidebar}>
     <Logo />
     <AppNav />
     <Outlet />
     
     <footer className={styles.footer} >
       <p>
         &copy; Copyright {new Date().getFullYear()} by worldwise ico
       </p>
     </footer>
  </div>
  )
}

export default Sidebar;
