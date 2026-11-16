# Spotify Clone — Activity Diagram

This diagram summarizes the main user journey through the React app: opening the app, browsing music, controlling playback, and managing liked songs and playlists. User and playlist data are persisted in browser local storage; authentication is a client-side demo flow, and a demo user is available by default.

```mermaid
flowchart TD
    START([Start]) --> INIT[Load app and initialize contexts]
    INIT --> HOME[Show home dashboard]
    HOME --> AUTH_CHECK{Open login or sign-up?}
    AUTH_CHECK -->|No| NAV{Choose a section}
    AUTH_CHECK -->|Yes| AUTH[Open login or sign-up]
    AUTH --> FORM[Enter details or choose a demo account]
    FORM --> LOGIN[Set user in app state and local storage]
    LOGIN --> NAV

    NAV -->|Home| BROWSE[Browse recommendations, artists, and playlists]
    NAV -->|Search| SEARCH[Search songs or browse by genre]
    NAV -->|Library| LIBRARY[Browse playlists]
    NAV -->|Liked Songs| LIKED[Browse liked songs]
    NAV -->|Playlist| DETAIL[Open playlist details]

    BROWSE --> ITEM[Select a song or playlist]
    SEARCH --> ITEM
    LIBRARY --> ITEM
    LIKED --> ITEM
    DETAIL --> ITEM

    ITEM --> ACTION{Choose an action}
    ACTION -->|Play song| PLAY[Set current song and queue]
    ACTION -->|Playback controls| CONTROLS[Pause, resume, skip, seek, shuffle, or repeat]
    ACTION -->|Like or unlike| LIKE[Update liked songs]
    ACTION -->|Add to playlist| ADD[Choose a playlist or create one]
    ACTION -->|Create playlist| CREATE[Enter playlist name and optional details]

    PLAY --> AUDIO[Play through browser audio]
    AUDIO --> AUDIO_OK{Audio playback succeeds?}
    AUDIO_OK -->|Yes| PROGRESS[Update playback progress and visualizer]
    AUDIO_OK -->|No| FALLBACK[Start synthetic audio fallback]
    FALLBACK --> PROGRESS
    CONTROLS --> PROGRESS

    LIKE --> SAVE_LIKED[Persist liked songs to local storage]
    ADD --> SAVE_PLAYLIST[Update playlist and persist to local storage]
    CREATE --> SAVE_PLAYLIST

    PROGRESS --> MORE{Continue using the app?}
    SAVE_LIKED --> MORE
    SAVE_PLAYLIST --> MORE
    MORE -->|Yes| NAV
    MORE -->|No| END([End])

    classDef terminal fill:#1DB954,stroke:#117A37,color:#FFFFFF,stroke-width:2px
    classDef decision fill:#FFF1C2,stroke:#D99A00,color:#3D2B00,stroke-width:2px
    classDef navigation fill:#E8F1FF,stroke:#3B82F6,color:#12345A,stroke-width:1.5px
    classDef action fill:#F1EAFE,stroke:#8B5CF6,color:#35205F,stroke-width:1.5px
    classDef playback fill:#DDF7F0,stroke:#0F9D78,color:#073D31,stroke-width:1.5px
    classDef persistence fill:#FFE8E8,stroke:#E05A5A,color:#5C2020,stroke-width:1.5px
    classDef fallback fill:#FFF0E1,stroke:#E8832A,color:#5A3210,stroke-width:1.5px

    class START,END terminal
    class AUTH_CHECK,NAV,ACTION,AUDIO_OK,MORE decision
    class HOME,BROWSE,SEARCH,LIBRARY,LIKED,DETAIL,ITEM navigation
    class AUTH,FORM,LOGIN,CONTROLS,LIKE,ADD,CREATE action
    class PLAY,AUDIO,PROGRESS playback
    class SAVE_LIKED,SAVE_PLAYLIST persistence
    class FALLBACK fallback
```
