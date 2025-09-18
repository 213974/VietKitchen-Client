import { useState, useRef, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import './AdminLayout.css';
import { useResponsive } from '../../hooks/useResponsive';
import { useClickOutside } from '../../hooks/useClickOutside';
import GalleryIcon from '../../assets/icons/gallery.svg';
import ClockIcon from '../../assets/icons/clock.svg';
import DashboardIcon from '../../assets/icons/dashboard.svg';
import HamburgerIcon from '../../assets/icons/hamburger-menu.svg';
import { supabase } from '../../services/supabaseClient'; // Import supabase

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDesktop } = useResponsive();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const sidebarRef = useRef<HTMLElement>(null);

  useClickOutside(sidebarRef, () => {
    if (!isDesktop && isSidebarOpen) {
      setSidebarOpen(false);
    }
  });

  useEffect(() => {
    if (!isDesktop) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isDesktop]);

  const handleLogout = async () => {
    // Use Supabase to sign out
    await supabase.auth.signOut();
    // The AuthContext listener will automatically handle the session change.
    // Navigate back to the login page.
    navigate('/admin-login');
  };

  const sidebarClasses = `admin-sidebar ${isSidebarOpen ? 'is-open' : ''}`;

  return (
    <div className="admin-layout">
      {!isDesktop && (
        <header className="admin-topbar">
          <button className="sidebar-toggle" onClick={() => setSidebarOpen(true)}>
            <HamburgerIcon />
          </button>
          <h3>Admin Panel</h3>
        </header>
      )}

      <aside className={sidebarClasses} ref={sidebarRef}>
        <div className="sidebar-header">
          <h3>Admin Panel</h3>
        </div>
        <nav className="admin-nav">
          <NavLink to="/admin/dashboard">
            <DashboardIcon />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/admin/gallery">
            <GalleryIcon />
            <span>Manage Gallery</span>
          </NavLink>
          <NavLink to="/admin/hours">
            <ClockIcon />
            <span>Update Store Hours</span>
          </NavLink>
        </nav>
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </aside>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;