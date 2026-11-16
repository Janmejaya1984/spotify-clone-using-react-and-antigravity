import React, { useState, useMemo } from 'react';
import { Heart, Play, Pause, Shuffle, Search, Clock, Disc3 } from 'lucide-react';
import { usePlaylist } from '../context/PlaylistContext';
import { usePlayer } from '../context/PlayerContext';
import { useAuth } from '../context/AuthContext';
import TrackRow from '../components/TrackRow';

export default function LikedSongsView({ setCurrentView }) {
  const { likedSongs, likedSongIds } = usePlaylist();
  const { currentSong, isPlaying, playSong, togglePlay, isShuffle, toggleShuffle } = usePlayer();
  const { user } = useAuth();
  const [filterQuery, setFilterQuery] = useState('');

  // Filter within liked songs
  const filteredLikedSongs = useMemo(() => {
    if (!filterQuery.trim()) return likedSongs;
    const q = filterQuery.toLowerCase();
    return likedSongs.filter(s => 
      s.title.toLowerCase().includes(q) ||
      s.artist.toLowerCase().includes(q) ||
      s.genre.toLowerCase().includes(q) ||
      s.album.toLowerCase().includes(q)
    );
  }, [likedSongs, filterQuery]);

  // Total duration in minutes
  const totalMinutes = useMemo(() => {
    const totalSecs = likedSongs.reduce((acc, s) => acc + (s.duration || 200), 0);
    return Math.round(totalSecs / 60);
  }, [likedSongs]);

  const isLikedQueuePlaying = isPlaying && likedSongs.some(s => s.id === currentSong?.id);

  const handlePlayAll = () => {
    if (likedSongs.length === 0) return;
    if (isLikedQueuePlaying) {
      togglePlay();
    } else {
      playSong(likedSongs[0], likedSongs);
    }
  };

  return (
    <div className="playlist-detail-container animate-fade-in">
      {/* Signature Purple Liked Songs Header */}
      <div className="playlist-hero-banner liked-songs-hero">
        <div className="liked-hero-heart-box animate-scale-up">
          <Heart size={72} fill="white" color="white" />
        </div>

        <div className="playlist-hero-info">
          <span className="playlist-type-badge">PLAYLIST</span>
          <h1 className="playlist-hero-title">Liked Songs</h1>
          <p className="playlist-hero-description">Your personal collection of favorite tracks</p>
          
          <div className="playlist-meta-row">
            <img 
              src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'} 
              alt="User" 
              className="meta-user-avatar"
            />
            <span className="meta-username">{user ? user.name : 'You'}</span>
            <span className="meta-dot">•</span>
            <span className="meta-song-count">{likedSongs.length} {likedSongs.length === 1 ? 'song' : 'songs'}</span>
            <span className="meta-dot">•</span>
            <span className="meta-duration">about {totalMinutes} min</span>
          </div>
        </div>
      </div>

      {/* Main Tracklist Actions Bar */}
      <div className="playlist-actions-bar">
        {/* Big Green Play Button */}
        <button 
          className="playlist-main-play-btn"
          onClick={handlePlayAll}
          disabled={likedSongs.length === 0}
          title={isLikedQueuePlaying ? 'Pause' : 'Play'}
        >
          {isLikedQueuePlaying ? (
            <Pause size={28} fill="black" stroke="black" />
          ) : (
            <Play size={28} fill="black" stroke="black" className="ml-1" />
          )}
        </button>

        {/* Shuffle toggle */}
        <button 
          className={`playlist-action-icon-btn ${isShuffle ? 'active text-spotify-green' : ''}`}
          onClick={toggleShuffle}
          title={isShuffle ? 'Disable Shuffle' : 'Enable Shuffle'}
        >
          <Shuffle size={24} />
        </button>

        {/* Filter within liked songs */}
        {likedSongs.length > 0 && (
          <div className="filter-in-playlist-box">
            <Search size={16} className="filter-icon" />
            <input
              type="text"
              placeholder="Search in Liked Songs"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="filter-in-playlist-input"
            />
          </div>
        )}
      </div>

      {/* Tracks Table */}
      {likedSongs.length > 0 ? (
        <div className="tracks-table-container">
          <div className="tracks-table-header">
            <div className="th-col th-index">#</div>
            <div className="th-col th-title">Title</div>
            <div className="th-col th-album">Album</div>
            <div className="th-col th-genre">Genre</div>
            <div className="th-col th-duration">
              <Clock size={16} />
            </div>
          </div>

          <div className="tracks-table-body">
            {filteredLikedSongs.map((song, idx) => (
              <TrackRow 
                key={song.id} 
                song={song} 
                index={idx} 
                queue={likedSongs}
                showAlbum={true}
                showGenre={true}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="empty-playlist-view">
          <div className="empty-icon-box">
            <Heart size={48} className="text-secondary" />
          </div>
          <h3 className="empty-title">Songs you like will appear here</h3>
          <p className="empty-subtitle">Save songs by tapping the heart icon anywhere in the app.</p>
          <button 
            className="modal-btn-submit"
            onClick={() => setCurrentView('search')}
          >
            Find songs
          </button>
        </div>
      )}
    </div>
  );
}
