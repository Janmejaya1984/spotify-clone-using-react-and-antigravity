import React from 'react';
import { 
  Home, 
  Search, 
  Library, 
  PlusSquare, 
  Heart, 
  Music, 
  Compass, 
  Disc3,
  Sparkles
} from 'lucide-react';
import { usePlaylist } from '../context/PlaylistContext';
import { useAuth } from '../context/AuthContext';
import { usePlayer } from '../context/PlayerContext';

export default function Sidebar({ currentView, setCurrentView }) {
  const { playlists, likedSongIds, activePlaylistId, setActivePlaylistId, setIsCreateModalOpen } = usePlaylist();
  const { user } = useAuth();
  const { isPlaying } = usePlayer();

  const handleNavClick = (view) => {
    setActivePlaylistId(null);
    setCurrentView(view);
  };

  const handlePlaylistClick = (playlistId) => {
    setActivePlaylistId(playlistId);
    setCurrentView('playlist');
  };

  return (
    <aside className="spotify-sidebar">
      {/* Brand Header */}
      <div className="sidebar-header" onClick={() => handleNavClick('home')} role="button" tabIndex={0}>
        <div className="spotify-logo-icon">
          <Disc3 className={`logo-disc ${isPlaying ? 'spin-slow' : ''}`} size={28} />
        </div>
        <div className="brand-name">
          <span className="brand-spotify">Spotify</span>
          <span className="brand-badge">Clone</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="sidebar-nav">
        <button
          className={`nav-item ${currentView === 'home' && !activePlaylistId ? 'active' : ''}`}
          onClick={() => handleNavClick('home')}
        >
          <Home size={22} className="nav-icon" />
          <span className="nav-label">Home</span>
        </button>

        <button
          className={`nav-item ${currentView === 'search' && !activePlaylistId ? 'active' : ''}`}
          onClick={() => handleNavClick('search')}
        >
          <Search size={22} className="nav-icon" />
          <span className="nav-label">Search</span>
        </button>

        <button
          className={`nav-item ${currentView === 'library' && !activePlaylistId ? 'active' : ''}`}
          onClick={() => handleNavClick('library')}
        >
          <Library size={22} className="nav-icon" />
          <span className="nav-label">Your Library</span>
        </button>
      </nav>

      {/* Action Section */}
      <div className="sidebar-actions">
        <button
          className="action-btn create-playlist-btn"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <div className="action-icon-box create-icon">
            <PlusSquare size={18} />
          </div>
          <span className="action-label">Create Playlist</span>
        </button>

        <button
          className={`action-btn liked-songs-btn ${currentView === 'liked' ? 'active' : ''}`}
          onClick={() => handleNavClick('liked')}
        >
          <div className="action-icon-box liked-icon">
            <Heart size={16} fill="white" />
          </div>
          <div className="liked-label-group">
            <span className="action-label">Liked Songs</span>
            <span className="liked-count-badge">{likedSongIds.length}</span>
          </div>
        </button>
      </div>

      <div className="sidebar-divider" />

      {/* Playlists Section */}
      <div className="sidebar-playlists-container">
        <div className="playlists-header">
          <span className="playlists-title">PLAYLISTS</span>
          <button 
            className="quick-add-btn" 
            title="Create Playlist"
            onClick={() => setIsCreateModalOpen(true)}
          >
            +
          </button>
        </div>

        <div className="playlists-list custom-scrollbar">
          {playlists.map((pl) => {
            const isActive = currentView === 'playlist' && activePlaylistId === pl.id;
            return (
              <button
                key={pl.id}
                className={`playlist-item ${isActive ? 'active' : ''}`}
                onClick={() => handlePlaylistClick(pl.id)}
              >
                <div 
                  className="playlist-item-dot" 
                  style={{ backgroundColor: pl.color || '#1DB954' }} 
                />
                <span className="playlist-item-name">{pl.name}</span>
                <span className="playlist-item-count">{pl.songIds ? pl.songIds.length : 0}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Pro Banner / User Status */}
      <div className="sidebar-footer">
        <div className="user-mini-card">
          <img 
            src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'} 
            alt="User avatar" 
            className="user-mini-avatar"
          />
          <div className="user-mini-info">
            <span className="user-mini-name">{user ? user.name : 'Guest User'}</span>
            <span className="user-mini-plan">
              <Sparkles size={11} className="premium-star" /> Premium Plan
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
