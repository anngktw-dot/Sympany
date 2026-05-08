"use client";

import { useEffect, useState } from "react";
import { mockPlaylists } from "@/entities/playlist/model/mock-playlists";
import type { Playlist } from "@/entities/playlist/model/types";
import type { Track } from "@/entities/track/model/types";

const STORAGE_KEY = "sympany-local-playlists-v2";

function createPlaylistId(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9а-яіїєґ]+/gi, "-")
    .replace(/^-|-$/g, "");
}

export function useLocalPlaylists() {
  const [playlists, setPlaylists] = useState<Playlist[]>(mockPlaylists);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const savedPlaylists = window.localStorage.getItem(STORAGE_KEY);

    if (savedPlaylists) {
      setPlaylists(JSON.parse(savedPlaylists) as Playlist[]);
    }

    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(playlists));
  }, [isHydrated, playlists]);

  function createPlaylist(name: string) {
    const cleanName = name.trim();

    if (!cleanName) {
      return;
    }

    const idBase = createPlaylistId(cleanName) || "playlist";
    const id = playlists.some((playlist) => playlist.id === idBase)
      ? `${idBase}-${Date.now()}`
      : idBase;

    setPlaylists((items) => [
      {
        id,
        name: cleanName,
        description: "Local playlist created in Sympany",
        cover: "neon",
        isLocal: true,
        tracks: [],
      },
      ...items,
    ]);
  }

  function renamePlaylist(playlistId: string, name: string) {
    const cleanName = name.trim();

    if (!cleanName) {
      return;
    }

    setPlaylists((items) =>
      items.map((playlist) =>
        playlist.id === playlistId ? { ...playlist, name: cleanName } : playlist
      )
    );
  }

  function deletePlaylist(playlistId: string) {
    setPlaylists((items) => items.filter((playlist) => playlist.id !== playlistId));
  }

  function deleteTrack(playlistId: string, trackId: string) {
    setPlaylists((items) =>
      items.map((playlist) =>
        playlist.id === playlistId
          ? {
              ...playlist,
              tracks: playlist.tracks.filter((track) => track.id !== trackId),
            }
          : playlist
      )
    );
  }

  function addTrackToPlaylist(playlistId: string, track: Track) {
    setPlaylists((items) =>
      items.map((playlist) => {
        if (playlist.id !== playlistId) {
          return playlist;
        }

        if (playlist.tracks.some((item) => item.id === track.id)) {
          return playlist;
        }

        return {
          ...playlist,
          tracks: [
            ...playlist.tracks,
            {
              id: track.id,
              title: track.title,
              artist: track.artist,
              duration: track.duration,
              cover: getPlaylistTrackCover(track.mood),
            },
          ],
        };
      })
    );
  }

  return {
    playlists,
    createPlaylist,
    renamePlaylist,
    deletePlaylist,
    deleteTrack,
    addTrackToPlaylist,
  };
}

function getPlaylistTrackCover(trackMood: Track["mood"]) {
  switch (trackMood) {
    case "dance":
      return "disc";
    case "focus":
      return "dark";
    case "late night":
      return "purple";
    case "romantic":
      return "pink";
    case "workout":
      return "red";
    case "chill":
    default:
      return "pink";
  }
}
