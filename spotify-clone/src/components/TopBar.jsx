import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  User, 
  LogOut, 
  LogIn, 
  Sparkles, 
  ExternalLink,
  Check,
  Disc3,
  Sliders
} from 'lucide-react';
import { useAuth, DEMO_USERS } from '../context/AuthContext';
import { usePlayer } from '../context/PlayerContext';

export default function TopBar({ 
  currentView, 
  setCurrentView, 
  searchQuery, 
  setSearchQuery,
  headerBg = 'rgba(18, 18, 18, 0.7)' 
}) {
  const { user, isAuthenticated, logout, openAuthModal, login } = useAuth();
  const { isFullscreen, toggleFullscreen } = usePlayer();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSwitchUser = (demoUser) => {
    login(demoUser.email, 'password', demoUser);
    setIsDropdownOpen(false);
  };

  return (
    <header className="spotify-topbar" style={{ background: headerBg }}>
      {/* Navigation Arrows */}
      <div className="topbar-left">
        <button 
          className="topbar-nav-btn" 
          onClick={() => setCurrentView('home')} 
          title="Go to Home"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          className="topbar-nav-btn" 
          onClick={() => setCurrentView('search')} 
          title="Go to Search"
        >
          <ChevronRight size={20} />
        </button>

        {/* Search input in topbar if in search mode */}
        {currentView === 'search' && (
          <div className="topbar-search-wrapper animate-fade-in">
            <Search size={18} className="search-input-icon" />
            <input
              type="text"
              placeholder="What do you want to play? (Song, Artist, Genre)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="topbar-search-input"
              autoFocus
            />
            {searchQuery && (
              <button 
                className="search-clear-btn" 
                onClick={() => setSearchQuery('')}
              >
                ✕
              </button>
            )}
          </div>
        )}
      </div>

      {/* Right Controls */}
      <div className="topbar-right">
        {/* Fullscreen Player Toggle button */}
        <button 
          className="ambient-mode-btn"
          onClick={toggleFullscreen}
          title="Open Immersive Visualizer"
        >
          <Disc3 size={16} className="btn-icon" />
          <span className="ambient-btn-text">Immersive View</span>
        </button>

        {/* User Account / Auth Button */}
        {isAuthenticated ? (
          <div className="profile-menu-container" ref={dropdownRef}>
            <button 
              className="profile-pill-btn"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-expanded={isDropdownOpen}
            >
              <img 
                src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'} 
                alt="Avatar" 
                className="profile-pill-avatar"
              />
              <span className="profile-pill-name">{user?.name}</span>
            </button>

            {/* Profile Dropdown */}
            {isDropdownOpen && (
              <div className="profile-dropdown-menu animate-scale-up">
                <div className="dropdown-user-header">
                  <div className="dropdown-user-name">{user?.name}</div>
                  <div className="dropdown-user-email">{user?.email}</div>
                  <div className="dropdown-user-badge">
                    <Sparkles size={12} /> {user?.plan || 'Spotify Premium'}
                  </div>
                </div>

                <div className="dropdown-divider" />

                <div className="dropdown-section-title">Switch Demo Account</div>
                {DEMO_USERS.map((demo) => (
                  <button
                    key={demo.id}
                    className={`dropdown-item switch-user-item ${user?.email === demo.email ? 'active' : ''}`}
                    onClick={() => handleSwitchUser(demo)}
                  >
                    <img src={demo.avatar} alt={demo.name} className="demo-switch-avatar" />
                    <div className="demo-switch-info">
                      <span className="demo-name">{demo.name}</span>
                      <span className="demo-plan">{demo.plan}</span>
                    </div>
                    {user?.email === demo.email && <Check size={16} className="check-icon" />}
                  </button>
                ))}

                <div className="dropdown-divider" />

                <button 
                  className="dropdown-item logout-item"
                  onClick={() => {
                    logout();
                    setIsDropdownOpen(false);
                  }}
                >
                  <LogOut size={16} />
                  <span>Log out</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="auth-buttons-group">
            <button 
              className="topbar-auth-btn signup-btn"
              onClick={openAuthModal}
            >
              Sign up
            </button>
            <button 
              className="topbar-auth-btn login-btn"
              onClick={openAuthModal}
            >
              <LogIn size={16} />
              <span>Log in</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
