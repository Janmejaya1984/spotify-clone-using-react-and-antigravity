import React, { useState } from 'react';
import { X, Music, Sparkles } from 'lucide-react';
import { usePlaylist } from '../context/PlaylistContext';

const PRESET_GRADIENTS = [
  { id: 'green', color: '#1DB954', name: 'Spotify Green' },
  { id: 'purple', color: '#8d67ab', name: 'Velvet Purple' },
  { id: 'sunset', color: '#ba5d07', name: 'Amber Sunset' },
  { id: 'blue', color: '#509bf5', name: 'Electric Blue' },
  { id: 'crimson', color: '#e91429', name: 'Crimson Heat' },
  { id: 'midnight', color: '#1e3264', name: 'Midnight Navy' },
];

export default function CreatePlaylistModal() {
  const { isCreateModalOpen, setIsCreateModalOpen, createPlaylist, setActivePlaylistId } = usePlaylist();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedColor, setSelectedColor] = useState(PRESET_GRADIENTS[0].color);

  if (!isCreateModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newPl = createPlaylist(
      name.trim(),
      description.trim() || 'Created by you.',
      null,
      selectedColor
    );

    setActivePlaylistId(newPl.id);
    setName('');
    setDescription('');
    setIsCreateModalOpen(false);
  };

  return (
    <div className="spotify-modal-backdrop" onClick={() => setIsCreateModalOpen(false)}>
      <div 
        className="spotify-modal-content create-playlist-modal animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3 className="modal-title">Create New Playlist</h3>
          <button 
            className="modal-close-btn"
            onClick={() => setIsCreateModalOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="create-playlist-layout">
            {/* Cover Preview */}
            <div 
              className="playlist-cover-preview"
              style={{
                background: `linear-gradient(135deg, ${selectedColor}, #121212)`
              }}
            >
              <Music size={48} className="preview-icon" />
              <span className="preview-label">Custom Cover</span>
            </div>

            {/* Inputs */}
            <div className="playlist-form-fields">
              <div className="form-group">
                <label className="form-label">Playlist Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Late Night Vibes"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="modal-input"
                  required
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description (Optional)</label>
                <textarea
                  placeholder="Give your playlist a catchy description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="modal-textarea"
                  rows={2}
                />
              </div>

              {/* Color Theme Selector */}
              <div className="form-group">
                <label className="form-label">Theme Color</label>
                <div className="color-palette-options">
                  {PRESET_GRADIENTS.map((p) => (
                    <button
                      type="button"
                      key={p.id}
                      className={`color-choice-btn ${selectedColor === p.color ? 'active' : ''}`}
                      style={{ backgroundColor: p.color }}
                      onClick={() => setSelectedColor(p.color)}
                      title={p.name}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="modal-btn-cancel"
              onClick={() => setIsCreateModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="modal-btn-submit"
              disabled={!name.trim()}
            >
              <Sparkles size={16} /> Create Playlist
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
