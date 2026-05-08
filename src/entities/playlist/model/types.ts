export type PlaylistTrack = {
  id: string;
  title: string;
  artist: string;
  duration: string;
  cover: "pink" | "red" | "disc" | "dark" | "purple";
};

export type Playlist = {
  id: string;
  name: string;
  description: string;
  cover: "space" | "sunset" | "neon";
  isLocal: boolean;
  tracks: PlaylistTrack[];
};
