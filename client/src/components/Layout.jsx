import NavBar from './navBarComponents/NavBar';
import Footer from './footerComponents/Footer';
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();

  const isHomePage = location.pathname === '/'; // Check if the current path is the homepage

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main
        className={`flex-grow ${
          isHomePage ? '' : 'flex items-center justify-center'
        }`}
      >
        <Outlet />
      </main>
      {location.pathname !== '/map' && <Footer />}
    </div>
  );
};

export default Layout;

