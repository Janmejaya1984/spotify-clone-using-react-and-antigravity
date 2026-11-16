import React, { useMemo } from 'react';
import { Play, Pause, Flame, Sparkles, TrendingUp, Compass, ChevronRight } from 'lucide-react';
import { INITIAL_SONGS, ARTISTS } from '../data/songs';
import { usePlayer } from '../context/PlayerContext';
import { usePlaylist } from '../context/PlaylistContext';
import { useAuth } from '../context/AuthContext';
import SongCard from '../components/SongCard';

export default function HomeView({ setCurrentView, setSelectedGenre }) {
  const { currentSong, isPlaying, playSong, togglePlay } = usePlayer();
  const { playlists, setActivePlaylistId } = usePlaylist();
  const { user } = useAuth();

  // Dynamic greeting based on time
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }, []);

  // Quick 6 top cards for the home header
  const quickPicks = useMemo(() => INITIAL_SONGS.slice(0, 6), []);
  const featuredHits = useMemo(() => INITIAL_SONGS.slice(0, 8), []);
  const chillPicks = useMemo(() => INITIAL_SONGS.filter(s => s.genreId === 'lofi' || s.genreId === 'ambient' || s.genreId === 'rnb'), []);
  const energyPicks = useMemo(() => INITIAL_SONGS.filter(s => s.genreId === 'rock' || s.genreId === 'electronic' || s.genreId === 'hip-hop'), []);

  const handleQuickPlay = (song, e) => {
    e.stopPropagation();
    if (currentSong?.id === song.id) {
      togglePlay();
    } else {
      playSong(song, INITIAL_SONGS);
    }
  };

  const handlePlaylistClick = (playlistId) => {
    setActivePlaylistId(playlistId);
    setCurrentView('playlist');
  };

  const handleGenreClick = (genreId) => {
    if (setSelectedGenre) setSelectedGenre(genreId);
    setCurrentView('search');
  };

  return (
    <div className="home-view-container animate-fade-in">
      {/* Top Welcome Greeting Header */}
      <section className="home-greeting-section">
        <h1 className="home-greeting-title">
          {greeting}{user ? `, ${user.name.split(' ')[0]}` : ''}
        </h1>

        {/* 6 Quick Play Top Cards */}
        <div className="quick-picks-grid">
          {quickPicks.map((song) => {
            const isThisPlaying = currentSong?.id === song.id && isPlaying;
            return (
              <div 
                key={song.id} 
                className="quick-pick-card group"
                onClick={() => playSong(song, INITIAL_SONGS)}
              >
                <img src={song.cover} alt={song.title} className="quick-pick-img" />
                <div className="quick-pick-info">
                  <span className="quick-pick-title">{song.title}</span>
                  <span className="quick-pick-artist">{song.artist}</span>
                </div>
                
                {/* Green circular play button on hover */}
                <button
                  className={`quick-play-btn ${isThisPlaying ? 'is-playing' : ''}`}
                  onClick={(e) => handleQuickPlay(song, e)}
                  title={isThisPlaying ? 'Pause' : 'Play'}
                >
                  {isThisPlaying ? (
                    <Pause size={18} fill="black" stroke="black" />
                  ) : (
                    <Play size={18} fill="black" stroke="black" className="ml-0.5" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Made For You Section */}
      <section className="content-shelf-section">
        <div className="shelf-header">
          <div className="shelf-title-group">
            <h2 className="shelf-title">Made For You</h2>
            <p className="shelf-subtitle">Curated picks based on your recent listening</p>
          </div>
          <button 
            className="shelf-see-all-btn"
            onClick={() => setCurrentView('search')}
          >
            Show all <ChevronRight size={16} />
          </button>
        </div>

        <div className="shelf-cards-grid custom-scrollbar">
          {featuredHits.map((song) => (
            <SongCard key={song.id} song={song} queue={featuredHits} />
          ))}
        </div>
      </section>

      {/* Featured Playlists Shelf */}
      <section className="content-shelf-section">
        <div className="shelf-header">
          <div className="shelf-title-group">
            <h2 className="shelf-title">Featured Playlists</h2>
            <p className="shelf-subtitle">Hand-picked mixes for every mood</p>
          </div>
          <button 
            className="shelf-see-all-btn"
            onClick={() => setCurrentView('library')}
          >
            Show all <ChevronRight size={16} />
          </button>
        </div>

        <div className="shelf-cards-grid">
          {playlists.map((pl) => (
            <div 
              key={pl.id} 
              className="spotify-song-card group playlist-card"
              onClick={() => handlePlaylistClick(pl.id)}
            >
              <div className="card-image-wrapper">
                <img src={pl.cover} alt={pl.name} className="card-image" />
                <button 
                  className="card-play-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlaylistClick(pl.id);
                  }}
                >
                  <Play size={22} fill="black" stroke="black" className="ml-0.5" />
                </button>
              </div>
              <div className="card-details">
                <h4 className="card-title">{pl.name}</h4>
                <p className="card-artist">{pl.description}</p>
                <div className="card-footer-meta">
                  <span className="card-genre-pill">
                    {pl.songIds ? pl.songIds.length : 0} tracks
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* High Energy & Beats Shelf */}
      <section className="content-shelf-section">
        <div className="shelf-header">
          <div className="shelf-title-group">
            <h2 className="shelf-title">High Energy & Beats</h2>
            <p className="shelf-subtitle">Electronic, Rock & Hip-Hop to pump up the vibe</p>
          </div>
        </div>

        <div className="shelf-cards-grid">
          {energyPicks.map((song) => (
            <SongCard key={song.id} song={song} queue={energyPicks} />
          ))}
        </div>
      </section>

      {/* Popular Artists Section */}
      <section className="content-shelf-section">
        <div className="shelf-header">
          <div className="shelf-title-group">
            <h2 className="shelf-title">Popular Artists</h2>
            <p className="shelf-subtitle">Artists you might like</p>
          </div>
        </div>

        <div className="artists-shelf-grid">
          {ARTISTS.map((artist) => (
            <div 
              key={artist.id} 
              className="artist-card group"
              onClick={() => {
                if (setSelectedGenre) setSelectedGenre('all');
                setCurrentView('search');
              }}
            >
              <div className="artist-avatar-wrapper">
                <img src={artist.image} alt={artist.name} className="artist-avatar" />
              </div>
              <h4 className="artist-name">{artist.name}</h4>
              <p className="artist-role">{artist.role}</p>
              <span className="artist-listeners">{artist.monthlyListeners} monthly listeners</span>
            </div>
          ))}
        </div>
      </section>

      {/* Chill & Lo-Fi Shelf */}
      <section className="content-shelf-section pb-12">
        <div className="shelf-header">
          <div className="shelf-title-group">
            <h2 className="shelf-title">Chill, Lo-Fi & Soul</h2>
            <p className="shelf-subtitle">Mellow beats for relaxation and focus</p>
          </div>
        </div>

        <div className="shelf-cards-grid">
          {chillPicks.map((song) => (
            <SongCard key={song.id} song={song} queue={chillPicks} />
          ))}
        </div>
      </section>
    </div>
  );
}
