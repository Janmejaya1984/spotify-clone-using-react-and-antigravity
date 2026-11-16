import React, { useMemo } from 'react';
import { Play, Pause, Shuffle, Trash2, Clock, Music, Plus, Sparkles } from 'lucide-react';
import { usePlaylist } from '../context/PlaylistContext';
import { usePlayer } from '../context/PlayerContext';
import { useAuth } from '../context/AuthContext';
import TrackRow from '../components/TrackRow';

export default function PlaylistDetailView({ playlistId, setCurrentView }) {
  const { getPlaylist, getPlaylistSongs, deletePlaylist, allSongs, addSongToPlaylist } = usePlaylist();
  const { currentSong, isPlaying, playSong, togglePlay, isShuffle, toggleShuffle } = usePlayer();
  const { user } = useAuth();

  const playlist = getPlaylist(playlistId);
  const playlistSongs = getPlaylistSongs(playlistId);

  // Recommendations to add to this playlist
  const recommendedSongs = useMemo(() => {
    if (!playlist) return [];
    return allSongs.filter(s => !playlist.songIds.includes(s.id)).slice(0, 4);
  }, [playlist, allSongs]);

  if (!playlist) {
    return (
      <div className="playlist-detail-container empty-playlist-view">
        <h3 className="empty-title">Playlist not found</h3>
        <button className="modal-btn-submit" onClick={() => setCurrentView('home')}>
          Go to Home
        </button>
      </div>
    );
  }

  const isPlaylistPlaying = isPlaying && playlistSongs.some(s => s.id === currentSong?.id);

  const handlePlayAll = () => {
    if (playlistSongs.length === 0) return;
    if (isPlaylistPlaying) {
      togglePlay();
    } else {
      playSong(playlistSongs[0], playlistSongs);
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${playlist.name}"?`)) {
      deletePlaylist(playlist.id);
      setCurrentView('home');
    }
  };

  return (
    <div className="playlist-detail-container animate-fade-in">
      {/* Dynamic Playlist Hero Banner */}
      <div 
        className="playlist-hero-banner"
        style={{
          background: `linear-gradient(180deg, ${playlist.color || '#1DB954'}cc 0%, #121212 100%)`
        }}
      >
        <div className="playlist-hero-cover-box animate-scale-up">
          {playlist.cover ? (
            <img src={playlist.cover} alt={playlist.name} className="playlist-hero-img" />
          ) : (
            <div 
              className="playlist-hero-placeholder"
              style={{ backgroundColor: playlist.color || '#1DB954' }}
            >
              <Music size={64} />
            </div>
          )}
        </div>

        <div className="playlist-hero-info">
          <span className="playlist-type-badge">PLAYLIST</span>
          <h1 className="playlist-hero-title">{playlist.name}</h1>
          <p className="playlist-hero-description">{playlist.description}</p>
          
          <div className="playlist-meta-row">
            <img 
              src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'} 
              alt="User" 
              className="meta-user-avatar"
            />
            <span className="meta-username">{user ? user.name : 'Spotify User'}</span>
            <span className="meta-dot">•</span>
            <span className="meta-song-count">{playlistSongs.length} {playlistSongs.length === 1 ? 'song' : 'songs'}</span>
          </div>
        </div>
      </div>

      {/* Playlist Actions Bar */}
      <div className="playlist-actions-bar">
        {/* Play Button */}
        <button 
          className="playlist-main-play-btn"
          onClick={handlePlayAll}
          disabled={playlistSongs.length === 0}
          title={isPlaylistPlaying ? 'Pause' : 'Play'}
        >
          {isPlaylistPlaying ? (
            <Pause size={28} fill="black" stroke="black" />
          ) : (
            <Play size={28} fill="black" stroke="black" className="ml-1" />
          )}
        </button>

        {/* Shuffle */}
        <button 
          className={`playlist-action-icon-btn ${isShuffle ? 'active text-spotify-green' : ''}`}
          onClick={toggleShuffle}
          title={isShuffle ? 'Disable Shuffle' : 'Enable Shuffle'}
        >
          <Shuffle size={24} />
        </button>

        {/* Delete Playlist Button */}
        <button 
          className="playlist-action-icon-btn delete-playlist-btn"
          onClick={handleDelete}
          title="Delete playlist"
        >
          <Trash2 size={22} />
        </button>
      </div>

      {/* Tracklist Table */}
      {playlistSongs.length > 0 ? (
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
            {playlistSongs.map((song, idx) => (
              <TrackRow 
                key={song.id} 
                song={song} 
                index={idx} 
                queue={playlistSongs}
                showAlbum={true}
                showGenre={true}
                playlistId={playlist.id}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="empty-playlist-view">
          <div className="empty-icon-box">
            <Music size={48} className="text-secondary" />
          </div>
          <h3 className="empty-title">This playlist is empty</h3>
          <p className="empty-subtitle">Add songs from the recommendations below or by searching songs!</p>
        </div>
      )}

      {/* Quick Add Recommendations Shelf */}
      {recommendedSongs.length > 0 && (
        <div className="playlist-recommendations-section mt-10">
          <div className="shelf-header">
            <div className="shelf-title-group">
              <h3 className="shelf-title flex items-center gap-2">
                <Sparkles size={18} className="text-spotify-green" /> Recommended Songs
              </h3>
              <p className="shelf-subtitle">Based on what's in this playlist</p>
            </div>
          </div>

          <div className="recommendations-list">
            {recommendedSongs.map((song, i) => (
              <div key={song.id} className="recommendation-row">
                <img src={song.cover} alt={song.title} className="rec-img" />
                <div className="rec-info">
                  <span className="rec-title">{song.title}</span>
                  <span className="rec-artist">{song.artist} • {song.genre}</span>
                </div>
                <button 
                  className="rec-add-btn"
                  onClick={() => addSongToPlaylist(playlist.id, song.id)}
                >
                  <Plus size={16} /> Add
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
