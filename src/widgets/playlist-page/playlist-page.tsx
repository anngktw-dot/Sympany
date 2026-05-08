"use client";

import Link from "next/link";
import {
  Clock3,
  Edit3,
  Filter,
  Home,
  Library,
  MoreHorizontal,
  Trash2,
  UserCircle,
} from "lucide-react";
import { useState } from "react";
import type { Playlist, PlaylistTrack } from "@/entities/playlist/model/types";
import { useLocalPlaylists } from "@/features/playlists/model/use-local-playlists";
import { AuthLogo } from "@/shared/ui/auth-logo/auth-logo";
import styles from "./playlist-page.module.css";

type PlaylistPageProps = {
  playlistId: string;
};

export function PlaylistPage({ playlistId }: PlaylistPageProps) {
  const { playlists, renamePlaylist, deleteTrack } = useLocalPlaylists();
  const playlist = playlists.find((item) => item.id === playlistId) ?? playlists[0];
  const [draftName, setDraftName] = useState(playlist?.name ?? "");
  const [isEditing, setIsEditing] = useState(false);

  if (!playlist) {
    return (
      <main className={styles.page}>
        <AppSidebar playlists={playlists} />
        <section className={styles.emptyPage}>
          <h1>Playlist not found</h1>
          <Link href="/library">Back to library</Link>
        </section>
      </main>
    );
  }

  function saveName() {
    renamePlaylist(playlist.id, draftName);
    setIsEditing(false);
  }

  const totalDuration = playlist.tracks.reduce(
    (sum, track) => sum + parseDuration(track.duration),
    0
  );

  return (
    <main className={styles.page}>
      <AppSidebar playlists={playlists} />

      <header className={styles.mobileTop}>
        <div className={styles.statusBar}>
          <span>9:41</span>
          <span className={styles.statusIcons}>||| Wi-Fi</span>
        </div>
        <div className={styles.mobileHeader}>
          <AuthLogo />
          <Link href="/profile" aria-label="Profile">
            <UserCircle size={37} strokeWidth={1.7} />
          </Link>
        </div>
      </header>

      <section className={styles.content}>
        <header className={styles.playlistHeader}>
          <span className={`${styles.cover} ${styles[playlist.cover]}`} aria-hidden="true" />
          <div className={styles.titleBlock}>
            {isEditing ? (
              <div className={styles.editTitle}>
                <input value={draftName} onChange={(event) => setDraftName(event.target.value)} />
                <button type="button" onClick={saveName}>
                  Save
                </button>
              </div>
            ) : (
              <h1>{playlist.name}</h1>
            )}
            <p>
              {playlist.tracks.length} songs, {formatDuration(totalDuration)}
            </p>
            <button className={styles.spotifyButton} type="button">
              <SpotifyIcon />
              Connect to Spotify
            </button>
          </div>
          <div className={styles.headerActions}>
            <button
              type="button"
              onClick={() => setIsEditing((value) => !value)}
              aria-label="Edit playlist name"
            >
              <Edit3 size={26} strokeWidth={1.8} />
            </button>
            <button type="button" aria-label="More playlist options">
              <MoreHorizontal size={34} strokeWidth={1.8} />
            </button>
          </div>
        </header>

        <section className={styles.trackTable} aria-label="Playlist tracks">
          <div className={styles.tableHead}>
            <span>#</span>
            <span>Track</span>
            <span>
              <Clock3 size={24} strokeWidth={1.8} />
            </span>
            <span>
              Filter <Filter size={25} strokeWidth={1.8} />
            </span>
          </div>

          {playlist.tracks.map((track, index) => (
            <TrackRow
              index={index + 1}
              key={track.id}
              onDelete={() => deleteTrack(playlist.id, track.id)}
              track={track}
            />
          ))}
        </section>
      </section>

      <nav className={styles.mobileNav} aria-label="Mobile navigation">
        <Link href="/home">
          <Home size={27} strokeWidth={1.7} />
          <span>Home</span>
        </Link>
        <Link href="/library">
          <Library size={27} strokeWidth={1.7} />
          <span>Library</span>
        </Link>
        <Link href="/profile">
          <UserCircle size={27} strokeWidth={1.7} />
          <span>Profile</span>
        </Link>
      </nav>
    </main>
  );
}

function TrackRow({
  index,
  track,
  onDelete,
}: {
  index: number;
  track: PlaylistTrack;
  onDelete: () => void;
}) {
  return (
    <article className={styles.trackRow}>
      <span>{index}</span>
      <div className={styles.trackInfo}>
        <span className={`${styles.trackCover} ${styles[track.cover]}`} />
        <div>
          <h2>{track.title}</h2>
          <p>{track.artist}</p>
        </div>
      </div>
      <time>{track.duration}</time>
      <button type="button" onClick={onDelete} aria-label={`Delete ${track.title}`}>
        <Trash2 size={23} strokeWidth={1.8} />
      </button>
    </article>
  );
}

function AppSidebar({ playlists }: { playlists: Playlist[] }) {
  return (
    <aside className={styles.sidebar} aria-label="Library sidebar">
      <div className={styles.sidebarLogo}>
        <AuthLogo />
      </div>

      <nav className={styles.sidebarNav}>
        <Link className={styles.sidebarItem} href="/home">
          <Home size={28} strokeWidth={1.7} />
          Home
        </Link>
        <Link className={styles.sidebarItem} href="/library">
          <Library size={28} strokeWidth={1.7} />
          Library
        </Link>

        <p className={styles.sidebarSection}>Playlist</p>
        <div className={styles.playlists}>
          {playlists.slice(0, 4).map((playlist) => (
            <Link
              className={styles.playlistItem}
              href={`/playlist/${playlist.id}`}
              key={playlist.id}
            >
              <span className={`${styles.smallCover} ${styles[playlist.cover]}`} />
              {playlist.name}
            </Link>
          ))}
        </div>
      </nav>

      <Link className={styles.profileIcon} href="/profile" aria-label="Profile">
        <UserCircle size={38} strokeWidth={1.7} />
      </Link>
    </aside>
  );
}

function parseDuration(duration: string) {
  const [minutes = "0", seconds = "0"] = duration.split(":");
  return Number(minutes) * 60 + Number(seconds);
}

function formatDuration(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours} hr ${minutes} min`;
  }

  return `${minutes} min`;
}

function SpotifyIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="currentColor" />
      <path
        d="M17.638 14.947a.75.75 0 0 1-1.033.248c-2.828-1.728-6.39-2.12-10.587-1.167a.75.75 0 0 1-.332-1.463c4.584-1.041 8.503-.594 11.701 1.359a.75.75 0 0 1 .251 1.023Z"
        fill="#101820"
      />
      <path
        d="M18.74 11.855a.95.95 0 0 1-1.304.314c-3.238-1.982-8.17-2.555-11.996-1.394a.95.95 0 0 1-.552-1.818c4.33-1.314 9.708-.682 13.54 1.663a.95.95 0 0 1 .312 1.235Z"
        fill="#101820"
      />
      <path
        d="M18.91 8.624c-3.881-2.305-10.293-2.518-13.998-1.403a1.15 1.15 0 1 1-.662-2.203c4.254-1.28 11.32-1.032 15.84 1.652a1.15 1.15 0 0 1-1.18 1.954Z"
        fill="#101820"
      />
    </svg>
  );
}
