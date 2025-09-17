import { useState, useRef, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import './AdminLayout.css';
import { useResponsive } from '../../hooks/useResponsive';
import { useClickOutside } from '../../hooks/useClickOutside';
import GalleryIcon from '../../assets/icons/gallery.svg?react';
import ClockIcon from '../../assets/icons/clock.svg?react';
import DashboardIcon from '../../assets/icons/dashboard.svg?react';
import HamburgerIcon from '../../assets/icons/hamburger-menu.svg?react';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDesktop } = useResponsive();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const sidebarRef = useRef<HTMLElement>(null);

  // Close the sidebar when clicking outside of it on mobile/tablet
  useClickOutside(sidebarRef, () => {
    if (!isDesktop && isSidebarOpen) {
      setSidebarOpen(false);
    }
  });

  // Close the sidebar when navigating to a new page
  useEffect(() => {
    if (!isDesktop) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isDesktop]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin-login');
  };

  const sidebarClasses = `admin-sidebar ${isSidebarOpen ? 'is-open' : ''}`;

  return (
    <div className="admin-layout">
      {/* --- Mobile/Tablet Top Bar --- */}
      {!isDesktop && (
        <header className="admin-topbar">
          <button className="sidebar-toggle" onClick={() => setSidebarOpen(true)}>
            <HamburgerIcon />
          </button>
          <h3>Admin Panel</h3>
        </header>
      )}

      {/* --- Sidebar (Desktop) / Off-canvas Menu (Mobile) --- */}
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

      {/* --- Main Content Area --- */}
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;