import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Shuffle, 
  Repeat, 
  Repeat1, 
  Volume2, 
  Volume1, 
  VolumeX, 
  Heart, 
  Maximize2, 
  Mic2, 
  ListMusic,
  Plus
} from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { usePlaylist } from '../context/PlaylistContext';

export default function PlayerBar() {
  const { 
    currentSong, 
    isPlaying, 
    currentTime, 
    duration, 
    progress, 
    volume, 
    actualVolume,
    isMuted, 
    isShuffle, 
    repeatMode, 
    togglePlay, 
    nextSong, 
    prevSong, 
    seek, 
    setVolume, 
    toggleMute, 
    toggleShuffle, 
    cycleRepeatMode,
    toggleFullscreen,
    waveFrequencies
  } = usePlayer();

  const { isLiked, toggleLikeSong, setSongToAddToPlaylist } = usePlaylist();
  const [isHoveringProgress, setIsHoveringProgress] = useState(false);

  if (!currentSong) return null;

  const liked = isLiked(currentSong.id);

  // Format seconds to mm:ss
  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleProgressChange = (e) => {
    const newProgress = parseFloat(e.target.value);
    const targetTime = (newProgress / 100) * (duration || 1);
    seek(targetTime);
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value) / 100;
    setVolume(newVol);
  };

  return (
    <footer className="spotify-playerbar">
      {/* LEFT: Currently Playing Track Info */}
      <div className="player-left-section">
        <div className="player-cover-wrapper" onClick={toggleFullscreen} role="button" title="Open full screen player">
          <img 
            src={currentSong.cover} 
            alt={currentSong.title} 
            className={`player-cover-image ${isPlaying ? 'glow-playing' : ''}`} 
          />
          {isPlaying && (
            <div className="player-live-badge">
              <span className="live-dot" />
            </div>
          )}
        </div>

        <div className="player-track-info">
          <div className="player-track-title" onClick={toggleFullscreen} title={currentSong.title}>
            {currentSong.title}
          </div>
          <div className="player-track-artist" title={currentSong.singer || currentSong.artist}>
            {currentSong.singer || currentSong.artist}
          </div>
        </div>

        {/* Like and Quick Add Buttons */}
        <div className="player-track-actions">
          <button 
            className={`player-action-btn ${liked ? 'is-liked' : ''}`}
            onClick={() => toggleLikeSong(currentSong)}
            title={liked ? 'Remove from Liked Songs' : 'Save to Liked Songs'}
          >
            <Heart size={18} fill={liked ? '#1DB954' : 'none'} color={liked ? '#1DB954' : '#b3b3b3'} />
          </button>
          
          <button 
            className="player-action-btn"
            onClick={() => setSongToAddToPlaylist(currentSong)}
            title="Add to playlist"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      {/* CENTER: Main Controls & Progress Bar */}
      <div className="player-center-section">
        <div className="player-controls-row">
          {/* Shuffle button */}
          <button 
            className={`control-btn shuffle-btn ${isShuffle ? 'active' : ''}`}
            onClick={toggleShuffle}
            title={isShuffle ? 'Disable shuffle' : 'Enable shuffle'}
          >
            <Shuffle size={18} />
            {isShuffle && <span className="active-dot" />}
          </button>

          {/* Previous track */}
          <button 
            className="control-btn step-btn"
            onClick={prevSong}
            title="Previous track"
          >
            <SkipBack size={20} fill="#b3b3b3" />
          </button>

          {/* Play / Pause toggle */}
          <button 
            className={`control-btn play-pause-btn ${isPlaying ? 'playing' : ''}`}
            onClick={togglePlay}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause size={20} fill="black" stroke="black" />
            ) : (
              <Play size={20} fill="black" stroke="black" className="play-offset" />
            )}
          </button>

          {/* Next track */}
          <button 
            className="control-btn step-btn"
            onClick={nextSong}
            title="Next track"
          >
            <SkipForward size={20} fill="#b3b3b3" />
          </button>

          {/* Repeat mode */}
          <button 
            className={`control-btn repeat-btn ${repeatMode !== 'off' ? 'active' : ''}`}
            onClick={cycleRepeatMode}
            title={`Repeat mode: ${repeatMode}`}
          >
            {repeatMode === 'one' ? <Repeat1 size={18} /> : <Repeat size={18} />}
            {repeatMode !== 'off' && <span className="active-dot" />}
          </button>
        </div>

        {/* Progress Bar Row */}
        <div 
          className="player-progress-row"
          onMouseEnter={() => setIsHoveringProgress(true)}
          onMouseLeave={() => setIsHoveringProgress(false)}
        >
          <span className="time-display current-time">{formatTime(currentTime)}</span>
          
          <div className="progress-slider-container">
            <input 
              type="range" 
              min="0" 
              max="100" 
              step="0.1"
              value={progress || 0} 
              onChange={handleProgressChange}
              className="spotify-progress-range"
              style={{
                background: `linear-gradient(to right, ${isHoveringProgress ? '#1ed760' : '#1DB954'} ${progress}%, #4d4d4d ${progress}%)`
              }}
              title="Seek time"
            />
          </div>

          <span className="time-display total-time">{formatTime(duration)}</span>
        </div>
      </div>

      {/* RIGHT: Volume, Visualizer & Expansion */}
      <div className="player-right-section">
        {/* Animated Visualizer Sound Waves */}
        <div className="mini-visualizer" onClick={toggleFullscreen} title="Click to view visualizer">
          {waveFrequencies.slice(0, 5).map((height, idx) => (
            <span 
              key={idx} 
              className="mini-vis-bar" 
              style={{ 
                height: `${height}%`,
                backgroundColor: isPlaying ? '#1DB954' : '#535353'
              }} 
            />
          ))}
        </div>

        {/* Lyrics button */}
        <button 
          className="player-action-btn lyrics-toggle-btn"
          onClick={toggleFullscreen}
          title="Lyrics & Visualizer"
        >
          <Mic2 size={18} />
        </button>

        {/* Volume controls */}
        <div className="volume-control-wrapper">
          <button 
            className="player-action-btn volume-btn"
            onClick={toggleMute}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted || volume === 0 ? (
              <VolumeX size={18} />
            ) : volume < 0.5 ? (
              <Volume1 size={18} />
            ) : (
              <Volume2 size={18} />
            )}
          </button>

          <input 
            type="range" 
            min="0" 
            max="100" 
            value={isMuted ? 0 : Math.round(volume * 100)} 
            onChange={handleVolumeChange}
            className="spotify-volume-range"
            style={{
              background: `linear-gradient(to right, #1DB954 ${(isMuted ? 0 : volume) * 100}%, #4d4d4d ${(isMuted ? 0 : volume) * 100}%)`
            }}
            title="Volume"
          />
        </div>

        {/* Maximize / Fullscreen */}
        <button 
          className="player-action-btn fullscreen-btn"
          onClick={toggleFullscreen}
          title="Full screen view"
        >
          <Maximize2 size={17} />
        </button>
      </div>
    </footer>
  );
}
