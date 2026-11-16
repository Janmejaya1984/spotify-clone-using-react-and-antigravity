import React, { useState } from 'react';
import { X, Check, Plus, Music } from 'lucide-react';
import { usePlaylist } from '../context/PlaylistContext';

export default function AddToPlaylistModal() {
  const { 
    songToAddToPlaylist, 
    setSongToAddToPlaylist, 
    playlists, 
    addSongToPlaylist, 
    removeSongFromPlaylist,
    createPlaylist 
  } = usePlaylist();

  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  if (!songToAddToPlaylist) return null;

  const handleToggleSongInPlaylist = (playlist) => {
    const isAlreadyIn = playlist.songIds.includes(songToAddToPlaylist.id);
    if (isAlreadyIn) {
      removeSongFromPlaylist(playlist.id, songToAddToPlaylist.id);
    } else {
      addSongToPlaylist(playlist.id, songToAddToPlaylist.id);
    }
  };

  const handleQuickCreate = (e) => {
    e.preventDefault();
    if (!newPlaylistName.trim()) return;

    const newPl = createPlaylist(newPlaylistName.trim());
    addSongToPlaylist(newPl.id, songToAddToPlaylist.id);
    setNewPlaylistName('');
    setIsCreatingNew(false);
  };

  return (
    <div className="spotify-modal-backdrop" onClick={() => setSongToAddToPlaylist(null)}>
      <div 
        className="spotify-modal-content add-to-playlist-modal animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-header-meta">
            <h3 className="modal-title">Add to Playlist</h3>
            <span className="modal-subtitle">Select which playlists should include this track</span>
          </div>
          <button 
            className="modal-close-btn"
            onClick={() => setSongToAddToPlaylist(null)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Target Song Preview */}
        <div className="target-song-strip">
          <img 
            src={songToAddToPlaylist.cover} 
            alt={songToAddToPlaylist.title} 
            className="target-song-cover"
          />
          <div className="target-song-meta">
            <div className="target-song-title">{songToAddToPlaylist.title}</div>
            <div className="target-song-artist">{songToAddToPlaylist.singer || songToAddToPlaylist.artist}</div>
          </div>
        </div>

        {/* Existing Playlists Checklist */}
        <div className="modal-playlists-list custom-scrollbar">
          {playlists.map((playlist) => {
            const isAdded = playlist.songIds.includes(songToAddToPlaylist.id);
            return (
              <button
                key={playlist.id}
                className={`playlist-check-row ${isAdded ? 'is-selected' : ''}`}
                onClick={() => handleToggleSongInPlaylist(playlist)}
              >
                <div 
                  className="playlist-check-avatar" 
                  style={{ backgroundColor: playlist.color || '#1DB954' }}
                >
                  <Music size={16} />
                </div>

                <div className="playlist-check-info">
                  <div className="playlist-check-name">{playlist.name}</div>
                  <div className="playlist-check-count">
                    {playlist.songIds.length} {playlist.songIds.length === 1 ? 'song' : 'songs'}
                  </div>
                </div>

                <div className={`checkbox-indicator ${isAdded ? 'checked' : ''}`}>
                  {isAdded && <Check size={14} color="#000" strokeWidth={3} />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Quick Create New Playlist */}
        <div className="modal-quick-create-section">
          {isCreatingNew ? (
            <form onSubmit={handleQuickCreate} className="quick-create-form animate-fade-in">
              <input
                type="text"
                placeholder="New playlist name..."
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                className="modal-input quick-input"
                autoFocus
              />
              <button type="submit" className="quick-submit-btn" disabled={!newPlaylistName.trim()}>
                Create & Add
              </button>
              <button type="button" className="quick-cancel-btn" onClick={() => setIsCreatingNew(false)}>
                Cancel
              </button>
            </form>
          ) : (
            <button 
              className="quick-create-trigger"
              onClick={() => setIsCreatingNew(true)}
            >
              <Plus size={16} />
              <span>Create new playlist</span>
            </button>
          )}
        </div>

        <div className="modal-footer">
          <button 
            className="modal-btn-submit full-width"
            onClick={() => setSongToAddToPlaylist(null)}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
