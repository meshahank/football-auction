import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header({ isAdmin, onLogout }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <header className="header">
      <Link to="/" className="header-logo" style={{ textDecoration: 'none' }}>
        AFC<span className="logo-accent">.</span>
      </Link>

      <nav className="header-nav">
        <Link to="/auction"  className={isActive('/auction')}>Live</Link>
        <Link to="/teams"    className={isActive('/teams')}>Teams</Link>
        <Link to="/players"  className={isActive('/players')}>Players</Link>
        <Link to="/unsold"   className={isActive('/unsold')}>Unsold</Link>
        {isAdmin && <Link to="/admin" className={isActive('/admin')}>Admin</Link>}
        {isAdmin && <Link to="/unsold-sale" className={isActive('/unsold-sale')}>Unsold Sale</Link>}
        {isAdmin && <span className="admin-badge">Admin</span>}
        <button className="logout-btn" onClick={onLogout}>Sign out</button>
      </nav>
    </header>
  );
}

export default Header;
