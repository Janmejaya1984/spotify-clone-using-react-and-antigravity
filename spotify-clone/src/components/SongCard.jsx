import React from 'react';
import { Play, Pause, Heart, Plus, MoreHorizontal } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { usePlaylist } from '../context/PlaylistContext';

export default function SongCard({ song, queue = null }) {
  const { currentSong, isPlaying, playSong, togglePlay } = usePlayer();
  const { isLiked, toggleLikeSong, setSongToAddToPlaylist } = usePlaylist();

  const isCurrent = currentSong?.id === song.id;
  const isThisPlaying = isCurrent && isPlaying;
  const liked = isLiked(song.id);

  const handlePlayClick = (e) => {
    e.stopPropagation();
    if (isCurrent) {
      togglePlay();
    } else {
      playSong(song, queue);
    }
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();
    toggleLikeSong(song);
  };

  const handleAddToPlaylist = (e) => {
    e.stopPropagation();
    setSongToAddToPlaylist(song);
  };

  return (
    <div 
      className={`spotify-song-card group ${isCurrent ? 'is-active' : ''}`}
      onClick={() => {
        if (!isCurrent) playSong(song, queue);
      }}
    >
      {/* Cover Image Container */}
      <div className="card-image-wrapper">
        <img 
          src={song.cover} 
          alt={song.title} 
          className="card-image" 
          loading="lazy" 
        />
        
        {/* Animated Equalizer Wave Overlay when playing */}
        {isThisPlaying && (
          <div className="card-equalizer-overlay">
            <div className="card-wave-bar bar-1" />
            <div className="card-wave-bar bar-2" />
            <div className="card-wave-bar bar-3" />
            <div className="card-wave-bar bar-4" />
          </div>
        )}

        {/* Floating Green Play Button with animation */}
        <button
          className={`card-play-button ${isThisPlaying ? 'playing' : ''}`}
          onClick={handlePlayClick}
          aria-label={isThisPlaying ? 'Pause' : 'Play'}
        >
          {isThisPlaying ? (
            <Pause size={22} fill="black" stroke="black" />
          ) : (
            <Play size={22} fill="black" stroke="black" className="play-icon-offset" />
          )}
        </button>

        {/* Card Quick Action Buttons */}
        <div className="card-overlay-actions">
          <button 
            className={`card-action-btn like-btn ${liked ? 'liked' : ''}`}
            onClick={handleLikeClick}
            title={liked ? 'Remove from Liked' : 'Save to Liked'}
          >
            <Heart size={16} fill={liked ? '#1DB954' : 'none'} color={liked ? '#1DB954' : 'white'} />
          </button>
          
          <button 
            className="card-action-btn add-btn"
            onClick={handleAddToPlaylist}
            title="Add to Playlist"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Card Info */}
      <div className="card-details">
        <h4 className={`card-title ${isCurrent ? 'text-spotify-green' : ''}`} title={song.title}>
          {song.title}
        </h4>
        <p className="card-artist" title={song.artist}>
          {song.artist}
        </p>
        
        <div className="card-footer-meta">
          <span className="card-genre-pill">{song.genre}</span>
          <span className="card-duration">{song.durationFormatted}</span>
        </div>
      </div>
    </div>
  );
}
