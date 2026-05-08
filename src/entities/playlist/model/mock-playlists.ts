import type { Playlist } from "./types";

export const mockPlaylists: Playlist[] = [
  {
    id: "my-playlist-3",
    name: "My playlist 3",
    description: "Saved from today's music matches",
    cover: "space",
    isLocal: true,
    tracks: [
      {
        id: "earthquake",
        title: "Earthquake",
        artist: "Tyler, the creator",
        duration: "3:10",
        cover: "pink",
      },
      {
        id: "pride",
        title: "PRIDE.",
        artist: "Kendrick Lamar",
        duration: "4:36",
        cover: "red",
      },
      {
        id: "bound-2",
        title: "Bound 2",
        artist: "Kanye West",
        duration: "3:50",
        cover: "disc",
      },
      {
        id: "505",
        title: "505",
        artist: "Arctic Monkeys",
        duration: "4:15",
        cover: "dark",
      },
      {
        id: "let-it-happen",
        title: "Let It Happen",
        artist: "Tame Impala",
        duration: "7:48",
        cover: "purple",
      },
    ],
  },
  {
    id: "my-playlist-2",
    name: "My playlist 2",
    description: "Warm tracks for evening listening",
    cover: "sunset",
    isLocal: true,
    tracks: [
      {
        id: "telepatia",
        title: "telepatia",
        artist: "Kali Uchis",
        duration: "2:40",
        cover: "purple",
      },
      {
        id: "borderline",
        title: "Borderline",
        artist: "Tame Impala",
        duration: "3:57",
        cover: "pink",
      },
    ],
  },
  {
    id: "lol",
    name: "lol",
    description: "Fast local draft",
    cover: "space",
    isLocal: true,
    tracks: [
      {
        id: "instant-crush",
        title: "Instant Crush",
        artist: "Daft Punk",
        duration: "5:37",
        cover: "disc",
      },
    ],
  },
];
