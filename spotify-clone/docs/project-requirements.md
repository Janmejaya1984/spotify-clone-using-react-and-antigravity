# Spotify Clone - Project Requirements

## Project Overview

Build a Spotify-inspired music player web application using React and Vite. The current project is a client-side demo; it does not provide production streaming services or server-backed accounts.

## Functional Requirements

1. **Browse music**
   - Show featured songs, playlists, artists, and recommendations on the home page.
   - Navigate between Home, Search, Library, Liked Songs, and playlist detail views.

2. **Search and filter music**
   - Search songs by title, artist or singer, album, and genre.
   - Filter songs by genre and artist/singer.
   - Allow users to clear active filters.

3. **Play music**
   - Play a selected song and manage a playback queue.
   - Provide pause/resume, next/previous, seek, volume/mute, shuffle, repeat, and fullscreen controls.
   - Show playback progress and a visualizer.
   - Attempt synthetic audio playback if browser audio playback fails.

4. **Manage liked songs**
   - Let users like and unlike songs.
   - Display, search, and play the liked-song collection.

5. **Manage playlists**
   - Create and delete playlists.
   - Add songs to and remove songs from playlists.
   - View playlist details and recommended songs.

6. **Support demo authentication**
   - Provide client-side login and sign-up flows, including demo accounts.
   - Provide a demo user by default.

## Data and Technical Requirements

- Use the bundled song, artist, and playlist data.
- Persist user information, liked songs, and playlists in browser local storage.
- Implement the application with React and Vite.
- Provide a responsive music-player interface with Spotify-inspired styling.

## Scope and Limitations

- Authentication is for demonstration only; it does not verify users through a backend.
- The project has no server-side API or database.
- Audio playback uses browser-accessible audio sources; the synthetic audio fallback is not the original track audio.

## Related Project Files

- [App.jsx](../src/App.jsx) - Main app layout and view navigation.
- [SearchView.jsx](../src/views/SearchView.jsx) - Song search and filtering.
- [PlayerContext.jsx](../src/context/PlayerContext.jsx) - Playback state and controls.
- [PlaylistContext.jsx](../src/context/PlaylistContext.jsx) - Liked songs and playlist state.
- [AuthContext.jsx](../src/context/AuthContext.jsx) - Demo authentication state.
- [activity-diagram.md](./activity-diagram.md) - Main application activity flow.
