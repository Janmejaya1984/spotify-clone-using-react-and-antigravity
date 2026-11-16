import React, { useEffect, useState } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Shuffle, 
  Repeat, 
  Repeat1, 
  Volume2, 
  VolumeX, 
  Heart, 
  Mic2,
  Sparkles
} from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { usePlaylist } from '../context/PlaylistContext';

export default function FullscreenPlayer() {
  const { 
    currentSong, 
    isPlaying, 
    currentTime, 
    duration, 
    progress, 
    volume, 
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
    isFullscreen,
    toggleFullscreen,
    waveFrequencies
  } = usePlayer();

  const { isLiked, toggleLikeSong } = usePlaylist();
  const [activeTab, setActiveTab] = useState('artwork'); // 'artwork' | 'lyrics'

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isFullscreen) {
        toggleFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, toggleFullscreen]);

  if (!isFullscreen || !currentSong) return null;

  const liked = isLiked(currentSong.id);

  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Calculate current active lyric line based on time progress
  const lyricLines = currentSong.lyrics || [
    'Enjoying the rhythm of the moment',
    'Feel the bass vibrate through the speakers',
    'Music connects the soul and mind',
    'Close your eyes and drift away'
  ];
  const lyricIndex = Math.floor((currentTime / (duration || 200)) * lyricLines.length);

  return (
    <div className="fullscreen-overlay animate-fade-in">
      {/* Dynamic Ambient Background */}
      <div 
        className="fullscreen-ambient-bg"
        style={{
          backgroundImage: `url(${currentSong.cover})`
        }}
      />
      <div className="fullscreen-backdrop-gradient" />

      {/* Top Header */}
      <div className="fullscreen-top-nav">
        <div className="fullscreen-header-info">
          <span className="playing-from-label">PLAYING FROM</span>
          <span className="playing-album-name">{currentSong.album}</span>
        </div>

        <div className="fullscreen-tab-switch">
          <button 
            className={`tab-btn ${activeTab === 'artwork' ? 'active' : ''}`}
            onClick={() => setActiveTab('artwork')}
          >
            Artwork & Visualizer
          </button>
          <button 
            className={`tab-btn ${activeTab === 'lyrics' ? 'active' : ''}`}
            onClick={() => setActiveTab('lyrics')}
          >
            <Mic2 size={15} /> Lyrics
          </button>
        </div>

        <button 
          className="fullscreen-close-btn"
          onClick={toggleFullscreen}
          title="Exit Fullscreen (Esc)"
        >
          <X size={24} />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="fullscreen-content-body">
        {activeTab === 'artwork' ? (
          <div className="artwork-visualizer-view animate-scale-up">
            <div className={`giant-cover-container ${isPlaying ? 'pulse-subtle' : ''}`}>
              <img 
                src={currentSong.cover} 
                alt={currentSong.title} 
                className="giant-cover-img"
              />
              <div className="giant-cover-gloss" />
            </div>

            {/* Dynamic Equalizer Visualizer */}
            <div className="fullscreen-wave-display">
              {waveFrequencies.map((h, i) => (
                <div 
                  key={i} 
                  className="full-wave-bar" 
                  style={{ 
                    height: `${isPlaying ? h : 15}%`,
                    background: isPlaying ? 'linear-gradient(to top, #1DB954, #1ed760)' : '#444'
                  }} 
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="lyrics-scroller-view custom-scrollbar animate-fade-in">
            <div className="lyrics-list">
              {lyricLines.map((line, idx) => {
                const isActiveLine = idx === lyricIndex;
                const isPastLine = idx < lyricIndex;
                return (
                  <p 
                    key={idx} 
                    className={`lyric-line ${isActiveLine ? 'active-line' : isPastLine ? 'past-line' : 'upcoming-line'}`}
                  >
                    {line}
                  </p>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Controls Bar */}
      <div className="fullscreen-footer-controls">
        <div className="fullscreen-song-details">
          <div className="fullscreen-song-text">
            <h2 className="fullscreen-title">{currentSong.title}</h2>
            <p className="fullscreen-artist">{currentSong.singer || currentSong.artist}</p>
          </div>
          <button 
            className={`fullscreen-like-btn ${liked ? 'is-liked' : ''}`}
            onClick={() => toggleLikeSong(currentSong)}
            title="Like this song"
          >
            <Heart size={28} fill={liked ? '#1DB954' : 'none'} color={liked ? '#1DB954' : 'white'} />
          </button>
        </div>

        {/* Progress scrub */}
        <div className="fullscreen-progress-wrapper">
          <span className="fs-time">{formatTime(currentTime)}</span>
          <input 
            type="range" 
            min="0" 
            max="100" 
            step="0.1"
            value={progress || 0} 
            onChange={(e) => {
              const targetTime = (parseFloat(e.target.value) / 100) * (duration || 1);
              seek(targetTime);
            }}
            className="fullscreen-progress-range"
            style={{
              background: `linear-gradient(to right, #1DB954 ${progress}%, #4d4d4d ${progress}%)`
            }}
          />
          <span className="fs-time">{formatTime(duration)}</span>
        </div>

        {/* Transport controls */}
        <div className="fullscreen-transport-row">
          <button 
            className={`fs-btn ${isShuffle ? 'active text-spotify-green' : ''}`}
            onClick={toggleShuffle}
          >
            <Shuffle size={20} />
          </button>

          <button className="fs-btn step-prev" onClick={prevSong}>
            <SkipBack size={26} fill="white" />
          </button>

          <button 
            className="fs-play-btn"
            onClick={togglePlay}
          >
            {isPlaying ? (
              <Pause size={28} fill="black" stroke="black" />
            ) : (
              <Play size={28} fill="black" stroke="black" className="ml-1" />
            )}
          </button>

          <button className="fs-btn step-next" onClick={nextSong}>
            <SkipForward size={26} fill="white" />
          </button>

          <button 
            className={`fs-btn ${repeatMode !== 'off' ? 'active text-spotify-green' : ''}`}
            onClick={cycleRepeatMode}
          >
            {repeatMode === 'one' ? <Repeat1 size={20} /> : <Repeat size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}
