import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from './Footer';
import HeaderAnnouncement from './HeaderAnnouncement';

const Layout = () => {
  return (    <div className="min-h-screen flex flex-col">
      <HeaderAnnouncement />
      <Navbar />      
      <main className="flex-grow mt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
