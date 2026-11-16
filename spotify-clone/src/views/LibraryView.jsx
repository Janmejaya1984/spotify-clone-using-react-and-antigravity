import React, { useState } from 'react';
import { Heart, Plus, Play, Music, Sparkles } from 'lucide-react';
import { usePlaylist } from '../context/PlaylistContext';
import { usePlayer } from '../context/PlayerContext';

export default function LibraryView({ setCurrentView }) {
  const { playlists, likedSongs, setActivePlaylistId, setIsCreateModalOpen } = usePlaylist();
  const { playSong } = usePlayer();
  const [filterType, setFilterType] = useState('all'); // 'all' | 'playlists' | 'liked'

  const handlePlaylistClick = (playlistId) => {
    setActivePlaylistId(playlistId);
    setCurrentView('playlist');
  };

  return (
    <div className="library-view-container animate-fade-in">
      {/* Header */}
      <div className="library-header">
        <h1 className="library-title">Your Library</h1>
        
        <div className="library-filters-row">
          <button 
            className={`library-filter-pill ${filterType === 'all' ? 'active' : ''}`}
            onClick={() => setFilterType('all')}
          >
            All
          </button>
          <button 
            className={`library-filter-pill ${filterType === 'playlists' ? 'active' : ''}`}
            onClick={() => setFilterType('playlists')}
          >
            Playlists
          </button>
          <button 
            className={`library-filter-pill ${filterType === 'liked' ? 'active' : ''}`}
            onClick={() => setFilterType('liked')}
          >
            Liked
          </button>
        </div>
      </div>

      {/* Grid of Library Items */}
      <div className="library-grid">
        {/* Prominent Liked Songs Card */}
        {(filterType === 'all' || filterType === 'liked') && (
          <div 
            className="library-liked-card group animate-scale-up"
            onClick={() => setCurrentView('liked')}
          >
            <div className="liked-card-decor">
              <Heart size={40} fill="white" color="white" />
            </div>

            <div className="liked-card-content">
              <h3 className="liked-card-title">Liked Songs</h3>
              <p className="liked-card-count">
                {likedSongs.length} {likedSongs.length === 1 ? 'liked song' : 'liked songs'}
              </p>
            </div>

            {likedSongs.length > 0 && (
              <button 
                className="library-play-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  playSong(likedSongs[0], likedSongs);
                }}
                title="Play Liked Songs"
              >
                <Play size={22} fill="black" stroke="black" className="ml-0.5" />
              </button>
            )}
          </div>
        )}

        {/* Create Playlist Action Card */}
        {(filterType === 'all' || filterType === 'playlists') && (
          <div 
            className="library-create-card group"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <div className="create-card-icon-box">
              <Plus size={36} />
            </div>
            <h4 className="create-card-title">Create Playlist</h4>
            <p className="create-card-subtitle">Build your own custom mix</p>
          </div>
        )}

        {/* Playlists Cards */}
        {(filterType === 'all' || filterType === 'playlists') && (
          playlists.map((pl) => (
            <div 
              key={pl.id} 
              className="spotify-song-card group playlist-card"
              onClick={() => handlePlaylistClick(pl.id)}
            >
              <div className="card-image-wrapper">
                {pl.cover ? (
                  <img src={pl.cover} alt={pl.name} className="card-image" />
                ) : (
                  <div 
                    className="card-image-fallback"
                    style={{ backgroundColor: pl.color || '#1DB954' }}
                  >
                    <Music size={40} />
                  </div>
                )}
                
                <button 
                  className="card-play-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlaylistClick(pl.id);
                  }}
                  title="Open Playlist"
                >
                  <Play size={22} fill="black" stroke="black" className="ml-0.5" />
                </button>
              </div>

              <div className="card-details">
                <h4 className="card-title">{pl.name}</h4>
                <p className="card-artist">{pl.description || 'Playlist'}</p>
                <div className="card-footer-meta">
                  <span className="card-genre-pill">
                    {pl.songIds ? pl.songIds.length : 0} tracks
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
