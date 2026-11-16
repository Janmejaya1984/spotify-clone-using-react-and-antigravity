import React, { useState, useEffect, useRef } from 'react';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { PlayerProvider } from './context/PlayerContext';
import { PlaylistProvider, usePlaylist } from './context/PlaylistContext';

import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import PlayerBar from './components/PlayerBar';
import CreatePlaylistModal from './components/CreatePlaylistModal';
import AddToPlaylistModal from './components/AddToPlaylistModal';
import LoginModal from './components/LoginModal';
import FullscreenPlayer from './components/FullscreenPlayer';

import HomeView from './views/HomeView';
import SearchView from './views/SearchView';
import LikedSongsView from './views/LikedSongsView';
import PlaylistDetailView from './views/PlaylistDetailView';
import LibraryView from './views/LibraryView';

function SpotifyAppContent() {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'search' | 'library' | 'liked' | 'playlist'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [headerBg, setHeaderBg] = useState('rgba(18, 18, 18, 0.4)');

  const { activePlaylistId } = usePlaylist();
  const mainContentRef = useRef(null);

  // Dynamic header background on scroll
  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    if (scrollTop > 100) {
      setHeaderBg('rgba(18, 18, 18, 0.95)');
    } else if (scrollTop > 40) {
      setHeaderBg('rgba(18, 18, 18, 0.7)');
    } else {
      setHeaderBg('rgba(18, 18, 18, 0.3)');
    }
  };

  // Scroll to top whenever view changes
  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentView, activePlaylistId]);

  return (
    <div className="spotify-app-layout">
      {/* Sidebar Navigation */}
      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
      />

      {/* Main Dynamic Scrollable Content */}
      <div 
        className="spotify-main-content custom-scrollbar" 
        ref={mainContentRef}
        onScroll={handleScroll}
      >
        <TopBar 
          currentView={currentView}
          setCurrentView={setCurrentView}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          headerBg={headerBg}
        />

        <main className="content-view-wrapper">
          {activePlaylistId ? (
            <PlaylistDetailView 
              playlistId={activePlaylistId} 
              setCurrentView={setCurrentView} 
            />
          ) : currentView === 'home' ? (
            <HomeView 
              setCurrentView={setCurrentView} 
              setSelectedGenre={setSelectedGenre} 
            />
          ) : currentView === 'search' ? (
            <SearchView 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedGenre={selectedGenre}
              setSelectedGenre={setSelectedGenre}
            />
          ) : currentView === 'liked' ? (
            <LikedSongsView 
              setCurrentView={setCurrentView} 
            />
          ) : currentView === 'library' ? (
            <LibraryView 
              setCurrentView={setCurrentView} 
            />
          ) : (
            <HomeView 
              setCurrentView={setCurrentView} 
              setSelectedGenre={setSelectedGenre} 
            />
          )}
        </main>
      </div>

      {/* Bottom Sticky Player Bar */}
      <PlayerBar />

      {/* Global Modals */}
      <CreatePlaylistModal />
      <AddToPlaylistModal />
      <LoginModal />
      <FullscreenPlayer />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <PlayerProvider>
          <PlaylistProvider>
            <SpotifyAppContent />
          </PlaylistProvider>
        </PlayerProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
