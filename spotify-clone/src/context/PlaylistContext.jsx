import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { INITIAL_SONGS, INITIAL_PLAYLISTS } from '../data/songs';
import { useToast } from './ToastContext';

const PlaylistContext = createContext();

export function PlaylistProvider({ children }) {
  const { addToast } = useToast();

  // Load liked song IDs from localStorage
  const [likedSongIds, setLikedSongIds] = useState(() => {
    try {
      const saved = localStorage.getItem('spotify_clone_liked');
      return saved ? JSON.parse(saved) : ['s1', 's2', 's4', 's6'];
    } catch {
      return ['s1', 's2', 's4', 's6'];
    }
  });

  // Load playlists from localStorage
  const [playlists, setPlaylists] = useState(() => {
    try {
      const saved = localStorage.getItem('spotify_clone_playlists');
      return saved ? JSON.parse(saved) : INITIAL_PLAYLISTS;
    } catch {
      return INITIAL_PLAYLISTS;
    }
  });

  const [activePlaylistId, setActivePlaylistId] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [songToAddToPlaylist, setSongToAddToPlaylist] = useState(null); // When opening Add-To-Playlist modal

  // Persist liked songs
  useEffect(() => {
    localStorage.setItem('spotify_clone_liked', JSON.stringify(likedSongIds));
  }, [likedSongIds]);

  // Persist playlists
  useEffect(() => {
    localStorage.setItem('spotify_clone_playlists', JSON.stringify(playlists));
  }, [playlists]);

  const allSongs = useMemo(() => INITIAL_SONGS, []);

  const likedSongs = useMemo(() => {
    return allSongs.filter(song => likedSongIds.includes(song.id));
  }, [allSongs, likedSongIds]);

  const isLiked = useCallback((songId) => {
    return likedSongIds.includes(songId);
  }, [likedSongIds]);

  const toggleLikeSong = useCallback((song) => {
    if (!song) return;
    const songId = typeof song === 'string' ? song : song.id;
    const songObj = typeof song === 'string' ? allSongs.find(s => s.id === songId) : song;
    const songTitle = songObj ? songObj.title : 'Song';

    setLikedSongIds(prev => {
      const exists = prev.includes(songId);
      if (exists) {
        addToast(`Removed "${songTitle}" from your Liked Songs`, 'info');
        return prev.filter(id => id !== songId);
      } else {
        addToast(`Added "${songTitle}" to your Liked Songs`, 'success');
        return [...prev, songId];
      }
    });
  }, [allSongs, addToast]);

  const createPlaylist = useCallback((name, description = '', cover = null, color = '#1DB954') => {
    const newPlaylist = {
      id: 'p_' + Date.now(),
      name: name || 'My Playlist #' + (playlists.length + 1),
      description: description || 'Created by you.',
      cover: cover || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80',
      color: color || '#1DB954',
      songIds: []
    };

    setPlaylists(prev => [newPlaylist, ...prev]);
    setIsCreateModalOpen(false);
    addToast(`Playlist "${newPlaylist.name}" created!`, 'success');
    return newPlaylist;
  }, [playlists.length, addToast]);

  const deletePlaylist = useCallback((playlistId) => {
    const playlist = playlists.find(p => p.id === playlistId);
    setPlaylists(prev => prev.filter(p => p.id !== playlistId));
    if (playlist) {
      addToast(`Deleted playlist "${playlist.name}"`, 'info');
    }
    if (activePlaylistId === playlistId) {
      setActivePlaylistId(null);
    }
  }, [playlists, activePlaylistId, addToast]);

  const addSongToPlaylist = useCallback((playlistId, songId) => {
    const playlist = playlists.find(p => p.id === playlistId);
    const song = allSongs.find(s => s.id === songId);

    if (!playlist || !song) return;

    if (playlist.songIds.includes(songId)) {
      addToast(`"${song.title}" is already in "${playlist.name}"`, 'info');
      return;
    }

    setPlaylists(prev => prev.map(p => {
      if (p.id === playlistId) {
        return { ...p, songIds: [...p.songIds, songId] };
      }
      return p;
    }));

    addToast(`Added "${song.title}" to "${playlist.name}"`, 'success');
    setSongToAddToPlaylist(null);
  }, [playlists, allSongs, addToast]);

  const removeSongFromPlaylist = useCallback((playlistId, songId) => {
    const playlist = playlists.find(p => p.id === playlistId);
    const song = allSongs.find(s => s.id === songId);

    setPlaylists(prev => prev.map(p => {
      if (p.id === playlistId) {
        return { ...p, songIds: p.songIds.filter(id => id !== songId) };
      }
      return p;
    }));

    if (playlist && song) {
      addToast(`Removed "${song.title}" from "${playlist.name}"`, 'info');
    }
  }, [playlists, allSongs, addToast]);

  const getPlaylist = useCallback((playlistId) => {
    return playlists.find(p => p.id === playlistId);
  }, [playlists]);

  const getPlaylistSongs = useCallback((playlistId) => {
    const pl = playlists.find(p => p.id === playlistId);
    if (!pl) return [];
    return pl.songIds.map(id => allSongs.find(s => s.id === id)).filter(Boolean);
  }, [playlists, allSongs]);

  return (
    <PlaylistContext.Provider
      value={{
        playlists,
        allSongs,
        likedSongs,
        likedSongIds,
        isLiked,
        toggleLikeSong,
        createPlaylist,
        deletePlaylist,
        addSongToPlaylist,
        removeSongFromPlaylist,
        getPlaylist,
        getPlaylistSongs,
        activePlaylistId,
        setActivePlaylistId,
        isCreateModalOpen,
        setIsCreateModalOpen,
        songToAddToPlaylist,
        setSongToAddToPlaylist
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
}

export const usePlaylist = () => useContext(PlaylistContext);
