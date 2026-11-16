import React, { useState, useMemo } from 'react';
import { Search, Play, Pause, Disc3, Mic2, Sparkles, Filter, X } from 'lucide-react';
import { INITIAL_SONGS, GENRES, ARTISTS } from '../data/songs';
import { usePlayer } from '../context/PlayerContext';
import { usePlaylist } from '../context/PlaylistContext';
import TrackRow from '../components/TrackRow';
import SongCard from '../components/SongCard';

export default function SearchView({ searchQuery, setSearchQuery, selectedGenre, setSelectedGenre }) {
  const { currentSong, isPlaying, playSong, togglePlay } = usePlayer();
  const { toggleLikeSong, isLiked } = usePlaylist();
  const [selectedSinger, setSelectedSinger] = useState('all');

  // List of unique singers/artists for filter dropdown
  const uniqueSingers = useMemo(() => {
    const set = new Set();
    INITIAL_SONGS.forEach(s => {
      if (s.artist) set.add(s.artist);
    });
    return ['all', ...Array.from(set)];
  }, []);

  // Filter songs based on search query, genre, and singer
  const filteredSongs = useMemo(() => {
    let list = INITIAL_SONGS;

    // Filter by Genre if not 'all'
    if (selectedGenre && selectedGenre !== 'all') {
      list = list.filter(song => song.genreId === selectedGenre || song.genre.toLowerCase() === selectedGenre.toLowerCase());
    }

    // Filter by Singer if not 'all'
    if (selectedSinger && selectedSinger !== 'all') {
      list = list.filter(song => song.artist === selectedSinger || song.singer.toLowerCase().includes(selectedSinger.toLowerCase()));
    }

    // Filter by Search Query (Title, Singer/Artist, Genre, Album)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(song => 
        song.title.toLowerCase().includes(q) ||
        song.artist.toLowerCase().includes(q) ||
        song.singer.toLowerCase().includes(q) ||
        song.genre.toLowerCase().includes(q) ||
        song.album.toLowerCase().includes(q)
      );
    }

    return list;
  }, [searchQuery, selectedGenre, selectedSinger]);

  // Matching Artists based on search query
  const matchingArtists = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return ARTISTS.filter(a => a.name.toLowerCase().includes(q) || a.role.toLowerCase().includes(q));
  }, [searchQuery]);

  // Top Result when searching
  const topResult = filteredSongs.length > 0 ? filteredSongs[0] : null;

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedGenre('all');
    setSelectedSinger('all');
  };

  const hasActiveFilters = searchQuery.trim() !== '' || selectedGenre !== 'all' || selectedSinger !== 'all';

  return (
    <div className="search-view-container animate-fade-in">
      {/* Search Header Controls */}
      <div className="search-header-panel">
        <h1 className="search-view-title">Search</h1>
        
        {/* Search Input Box */}
        <div className="search-bar-field">
          <Search size={22} className="search-field-icon" />
          <input
            type="text"
            placeholder="Search songs, singers, artists, genres..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-field-input"
            autoFocus
          />
          {searchQuery && (
            <button 
              className="search-field-clear" 
              onClick={() => setSearchQuery('')}
              title="Clear search"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Singer / Artist Quick Filter Dropdown */}
        <div className="search-filters-row">
          <div className="singer-filter-selector">
            <span className="filter-label"><Mic2 size={14} /> Singer / Artist:</span>
            <select 
              value={selectedSinger} 
              onChange={(e) => setSelectedSinger(e.target.value)}
              className="spotify-select"
            >
              <option value="all">All Singers</option>
              {uniqueSingers.filter(s => s !== 'all').map(singer => (
                <option key={singer} value={singer}>{singer}</option>
              ))}
            </select>
          </div>

          {/* Reset Filters button */}
          {hasActiveFilters && (
            <button 
              className="clear-all-filters-btn"
              onClick={handleClearFilters}
            >
              <X size={14} /> Clear all filters
            </button>
          )}
        </div>

        {/* Genre Pill Filter Tags */}
        <div className="genre-pills-scroll custom-scrollbar">
          {GENRES.map((g) => {
            const isSelected = selectedGenre === g.id;
            return (
              <button
                key={g.id}
                className={`genre-pill-btn ${isSelected ? 'active' : ''}`}
                onClick={() => setSelectedGenre(g.id)}
              >
                {g.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Section when searching or filtering */}
      {hasActiveFilters ? (
        <div className="search-results-section animate-fade-in">
          {filteredSongs.length > 0 ? (
            <>
              {/* Top Result & Top Songs Two-Column Split */}
              <div className="search-results-split">
                {/* Left: Top Result Highlight Card */}
                {topResult && (
                  <div className="top-result-box">
                    <h3 className="section-heading">Top result</h3>
                    <div 
                      className="top-result-card group"
                      onClick={() => playSong(topResult, filteredSongs)}
                    >
                      <img 
                        src={topResult.cover} 
                        alt={topResult.title} 
                        className="top-result-img" 
                      />
                      <h2 className="top-result-title">{topResult.title}</h2>
                      <div className="top-result-meta">
                        <span className="top-result-artist">{topResult.artist}</span>
                        <span className="top-result-tag">{topResult.genre}</span>
                      </div>

                      {/* Floating Play Button */}
                      <button
                        className="top-result-play-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (currentSong?.id === topResult.id) {
                            togglePlay();
                          } else {
                            playSong(topResult, filteredSongs);
                          }
                        }}
                      >
                        {currentSong?.id === topResult.id && isPlaying ? (
                          <Pause size={24} fill="black" stroke="black" />
                        ) : (
                          <Play size={24} fill="black" stroke="black" className="ml-1" />
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Right: Songs List Table */}
                <div className="top-songs-list-box">
                  <h3 className="section-heading">Songs</h3>
                  <div className="search-tracklist">
                    {filteredSongs.slice(0, 5).map((song, idx) => (
                      <TrackRow 
                        key={song.id} 
                        song={song} 
                        index={idx} 
                        queue={filteredSongs}
                        showAlbum={false}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Matching Artists Shelf (if any) */}
              {matchingArtists.length > 0 && (
                <div className="artists-matching-section mt-8">
                  <h3 className="section-heading">Matching Artists</h3>
                  <div className="artists-shelf-grid">
                    {matchingArtists.map((artist) => (
                      <div 
                        key={artist.id} 
                        className="artist-card"
                        onClick={() => setSelectedSinger(artist.name)}
                      >
                        <div className="artist-avatar-wrapper">
                          <img src={artist.image} alt={artist.name} className="artist-avatar" />
                        </div>
                        <h4 className="artist-name">{artist.name}</h4>
                        <p className="artist-role">{artist.role}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Full Matching Catalog Grid */}
              <div className="all-matching-songs-section mt-8">
                <h3 className="section-heading">All Matching Tracks ({filteredSongs.length})</h3>
                <div className="shelf-cards-grid">
                  {filteredSongs.map((song) => (
                    <SongCard key={song.id} song={song} queue={filteredSongs} />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="no-results-view">
              <div className="no-results-icon">
                <Disc3 size={64} className="text-secondary" />
              </div>
              <h3 className="no-results-title">No songs found matching your search</h3>
              <p className="no-results-text">
                Please check the spelling or try searching for another artist, song, or genre.
              </p>
              <button 
                className="modal-btn-submit"
                onClick={handleClearFilters}
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      ) : (
        /* When search is empty: Spotify Colorful Genre Browse Grid */
        <div className="browse-genres-section animate-fade-in">
          <h2 className="section-heading">Browse all genres</h2>
          <div className="genre-cards-grid">
            {GENRES.filter(g => g.id !== 'all').map((genre) => (
              <div
                key={genre.id}
                className="spotify-genre-card"
                style={{
                  background: genre.gradient || `linear-gradient(135deg, ${genre.color}, #121212)`
                }}
                onClick={() => setSelectedGenre(genre.id)}
              >
                <h3 className="genre-card-name">{genre.name}</h3>
                <div className="genre-card-art">
                  <Disc3 size={70} className="genre-disc-watermark" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
