import React, { useState } from 'react';
import { Play, Pause, Heart, Plus, MoreHorizontal, Check, Trash2 } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { usePlaylist } from '../context/PlaylistContext';

export default function TrackRow({ 
  song, 
  index, 
  queue = null, 
  showAlbum = true, 
  showGenre = true,
  playlistId = null // If passed, allows removing from this playlist
}) {
  const { currentSong, isPlaying, playSong, togglePlay } = usePlayer();
  const { isLiked, toggleLikeSong, setSongToAddToPlaylist, removeSongFromPlaylist } = usePlaylist();
  const [showMenu, setShowMenu] = useState(false);

  if (!song) return null;

  const isCurrent = currentSong?.id === song.id;
  const isThisPlaying = isCurrent && isPlaying;
  const liked = isLiked(song.id);

  const handleRowClick = () => {
    if (isCurrent) {
      togglePlay();
    } else {
      playSong(song, queue, index);
    }
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();
    toggleLikeSong(song);
  };

  const handleAddToPlaylistClick = (e) => {
    e.stopPropagation();
    setSongToAddToPlaylist(song);
    setShowMenu(false);
  };

  const handleRemoveFromThisPlaylist = (e) => {
    e.stopPropagation();
    if (playlistId) {
      removeSongFromPlaylist(playlistId, song.id);
    }
    setShowMenu(false);
  };

  return (
    <div 
      className={`spotify-track-row group ${isCurrent ? 'is-active' : ''}`}
      onClick={handleRowClick}
    >
      {/* Index or Play Button */}
      <div className="track-col-index">
        {isThisPlaying ? (
          <div className="track-equalizer-bars">
            <span className="eq-bar eq-bar-1" />
            <span className="eq-bar eq-bar-2" />
            <span className="eq-bar eq-bar-3" />
          </div>
        ) : (
          <>
            <span className={`track-number ${isCurrent ? 'text-spotify-green' : ''}`}>
              {index + 1}
            </span>
            <button 
              className="track-row-play-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleRowClick();
              }}
            >
              {isThisPlaying ? <Pause size={14} fill="white" /> : <Play size={14} fill="white" className="ml-0.5" />}
            </button>
          </>
        )}
      </div>

      {/* Title & Artist info */}
      <div className="track-col-title">
        <img 
          src={song.cover} 
          alt={song.title} 
          className="track-thumbnail" 
          loading="lazy" 
        />
        <div className="track-meta">
          <div className={`track-title-text ${isCurrent ? 'text-spotify-green' : ''}`}>
            {song.title}
          </div>
          <div className="track-artist-text">
            {song.singer || song.artist}
          </div>
        </div>
      </div>

      {/* Album name */}
      {showAlbum && (
        <div className="track-col-album">
          <span className="truncate-text">{song.album}</span>
        </div>
      )}

      {/* Genre pill */}
      {showGenre && (
        <div className="track-col-genre">
          <span className="track-genre-badge">{song.genre}</span>
        </div>
      )}

      {/* Like Heart Button */}
      <div className="track-col-actions">
        <button 
          className={`track-action-icon like-btn ${liked ? 'is-liked' : ''}`}
          onClick={handleLikeClick}
          title={liked ? 'Remove from Liked Songs' : 'Save to Liked Songs'}
        >
          <Heart size={16} fill={liked ? '#1DB954' : 'none'} color={liked ? '#1DB954' : '#b3b3b3'} />
        </button>

        {/* Add to playlist button */}
        <button 
          className="track-action-icon add-btn"
          onClick={handleAddToPlaylistClick}
          title="Add to playlist"
        >
          <Plus size={16} />
        </button>

        {/* Remove from this playlist if inside a custom playlist */}
        {playlistId && (
          <button 
            className="track-action-icon remove-btn"
            onClick={handleRemoveFromThisPlaylist}
            title="Remove from this playlist"
          >
            <Trash2 size={15} />
          </button>
        )}

        {/* Duration */}
        <div className="track-col-duration">
          {song.durationFormatted}
        </div>
      </div>
    </div>
  );
}
