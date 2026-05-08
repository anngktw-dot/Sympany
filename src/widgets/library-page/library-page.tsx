"use client";

import Link from "next/link";
import { Edit3, Home, Library, Plus, Trash2, UserCircle } from "lucide-react";
import { FormEvent, useState } from "react";
import type { Playlist } from "@/entities/playlist/model/types";
import { useLocalPlaylists } from "@/features/playlists/model/use-local-playlists";
import { AuthLogo } from "@/shared/ui/auth-logo/auth-logo";
import styles from "./library-page.module.css";

export function LibraryPage() {
  const { playlists, createPlaylist, renamePlaylist, deletePlaylist } = useLocalPlaylists();
  const [newName, setNewName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    createPlaylist(newName);
    setNewName("");
  }

  function startRename(playlist: Playlist) {
    setEditingId(playlist.id);
    setEditingName(playlist.name);
  }

  function saveRename(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!editingId) {
      return;
    }

    renamePlaylist(editingId, editingName);
    setEditingId(null);
    setEditingName("");
  }

  return (
    <main className={styles.page}>
      <AppSidebar playlists={playlists} active="library" />

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
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Local mode</p>
            <h1>Your library</h1>
            <p>
              Create local playlists in Sympany. After Spotify connection they can be pushed into
              your Spotify account.
            </p>
          </div>
          <button className={styles.spotifyButton} type="button">
            <SpotifyIcon />
            Connect to Spotify
          </button>
        </header>

        <form className={styles.createPanel} onSubmit={handleCreate}>
          <label htmlFor="playlistName">Create local playlist</label>
          <div>
            <input
              id="playlistName"
              name="playlistName"
              placeholder="Playlist name"
              value={newName}
              onChange={(event) => setNewName(event.target.value)}
            />
            <button type="submit">
              <Plus size={23} strokeWidth={2} />
              Create
            </button>
          </div>
        </form>

        <section className={styles.playlistGrid} aria-label="Local playlists">
          {playlists.map((playlist) => (
            <article className={styles.playlistCard} key={playlist.id}>
              <Link className={styles.cardLink} href={`/playlist/${playlist.id}`}>
                <span className={`${styles.cover} ${styles[playlist.cover]}`} />
                <span>
                  <strong>{playlist.name}</strong>
                  <small>
                    {playlist.tracks.length} songs
                    {playlist.isLocal ? " · Local" : " · Synced"}
                  </small>
                </span>
              </Link>

              <div className={styles.cardActions}>
                <button
                  type="button"
                  onClick={() => startRename(playlist)}
                  aria-label="Rename playlist"
                >
                  <Edit3 size={20} strokeWidth={1.9} />
                </button>
                <button
                  type="button"
                  onClick={() => deletePlaylist(playlist.id)}
                  aria-label="Delete playlist"
                >
                  <Trash2 size={20} strokeWidth={1.9} />
                </button>
              </div>
            </article>
          ))}
        </section>
      </section>

      <nav className={styles.mobileNav} aria-label="Mobile navigation">
        <Link href="/home">
          <Home size={27} strokeWidth={1.7} />
          <span>Home</span>
        </Link>
        <Link href="/library" aria-current="page">
          <Library size={27} strokeWidth={1.7} />
          <span>Library</span>
        </Link>
        <Link href="/profile">
          <UserCircle size={27} strokeWidth={1.7} />
          <span>Profile</span>
        </Link>
      </nav>

      {editingId && (
        <section className={styles.dialogOverlay} aria-label="Rename playlist">
          <form className={styles.dialog} onSubmit={saveRename}>
            <h2>Edit playlist name</h2>
            <input
              autoFocus
              value={editingName}
              onChange={(event) => setEditingName(event.target.value)}
            />
            <div>
              <button type="button" onClick={() => setEditingId(null)}>
                Cancel
              </button>
              <button type="submit">Save</button>
            </div>
          </form>
        </section>
      )}
    </main>
  );
}

type AppSidebarProps = {
  playlists: Playlist[];
  active: "home" | "library" | "playlist" | "profile";
};

function AppSidebar({ playlists, active }: AppSidebarProps) {
  return (
    <aside className={styles.sidebar} aria-label="Library sidebar">
      <div className={styles.sidebarLogo}>
        <AuthLogo />
      </div>

      <nav className={styles.sidebarNav}>
        <Link
          className={styles.sidebarItem}
          href="/home"
          aria-current={active === "home" ? "page" : undefined}
        >
          <Home size={28} strokeWidth={1.7} />
          Home
        </Link>
        <Link
          className={styles.sidebarItem}
          href="/library"
          aria-current={active === "library" ? "page" : undefined}
        >
          <Library size={28} strokeWidth={1.7} />
          Library
        </Link>

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

      <Link
        className={styles.settingsPill}
        href="/profile"
        aria-current={active === "profile" ? "page" : undefined}
      >
        <UserCircle size={28} strokeWidth={1.7} />
        Settings
      </Link>
    </aside>
  );
}

function SpotifyIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="currentColor" />
      <path
        d="M17.638 14.947a.75.75 0 0 1-1.033.248c-2.828-1.728-6.39-2.12-10.587-1.167a.75.75 0 0 1-.332-1.463c4.584-1.041 8.503-.594 11.701 1.359a.75.75 0 0 1 .251 1.023Z"
        fill="#ffffff"
      />
      <path
        d="M18.74 11.855a.95.95 0 0 1-1.304.314c-3.238-1.982-8.17-2.555-11.996-1.394a.95.95 0 0 1-.552-1.818c4.33-1.314 9.708-.682 13.54 1.663a.95.95 0 0 1 .312 1.235Z"
        fill="#ffffff"
      />
      <path
        d="M18.91 8.624c-3.881-2.305-10.293-2.518-13.998-1.403a1.15 1.15 0 1 1-.662-2.203c4.254-1.28 11.32-1.032 15.84 1.652a1.15 1.15 0 0 1-1.18 1.954Z"
        fill="#ffffff"
      />
    </svg>
  );
}
