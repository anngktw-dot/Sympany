"use client";

import Link from "next/link";
import {
  ChevronRight,
  Heart,
  Home,
  Library,
  Pause,
  Play,
  RotateCcw,
  UserCircle,
  X,
} from "lucide-react";
import { useState } from "react";
import { mockTracks } from "@/entities/track/model/mock-tracks";
import type { Track } from "@/entities/track/model/types";
import { useTrackDeck } from "@/features/music-match/model/use-track-deck";
import { useLocalPlaylists } from "@/features/playlists/model/use-local-playlists";
import { AuthLogo } from "@/shared/ui/auth-logo/auth-logo";
import styles from "./home-page.module.css";

export function HomePage() {
  const {
    currentTrack,
    currentIndex,
    totalTracks,
    history,
    likedTracks,
    passedTracks,
    isFinished,
    progressPercent,
    likeTrack,
    passTrack,
    undoLastAction,
    resetDeck,
  } = useTrackDeck(mockTracks);
  const { playlists, addTrackToPlaylist, deleteTrack } = useLocalPlaylists();
  const [isPlaying, setIsPlaying] = useState(false);

  const nextTracks = mockTracks.slice(currentIndex + 1, currentIndex + 4);
  const targetPlaylist = playlists[0];

  function handleLikeTrack() {
    if (targetPlaylist && currentTrack) {
      addTrackToPlaylist(targetPlaylist.id, currentTrack);
    }

    likeTrack();
    setIsPlaying(false);
  }

  function handlePassTrack() {
    passTrack();
    setIsPlaying(false);
  }

  function handleUndoLastAction() {
    const lastAction = history.at(-1);

    if (targetPlaylist && lastAction?.decision === "liked") {
      deleteTrack(targetPlaylist.id, lastAction.track.id);
    }

    undoLastAction();
    setIsPlaying(false);
  }

  function handleResetDeck() {
    resetDeck();
    setIsPlaying(false);
  }

  return (
    <main className={styles.page}>
      <aside className={styles.sidebar} aria-label="Library sidebar">
        <div className={styles.sidebarLogo}>
          <AuthLogo />
        </div>

        <nav className={styles.sidebarNav}>
          <Link
            className={`${styles.sidebarItem} ${styles.activeItem}`}
            href="/home"
            aria-current="page"
          >
            <Home size={29} strokeWidth={1.7} />
            Home
          </Link>
          <Link className={styles.sidebarItem} href="/library">
            <Library size={29} strokeWidth={1.7} />
            Library
          </Link>

          <div className={styles.playlists}>
            {playlists.slice(0, 4).map((playlist) => (
              <Link
                className={styles.playlistItem}
                href={`/playlist/${playlist.id}`}
                key={playlist.id}
              >
                <span className={`${styles.playlistArt} ${styles[playlist.cover]}`} />
                {playlist.name}
              </Link>
            ))}
          </div>
        </nav>

        <Link className={styles.settingsPill} href="/profile">
          <UserCircle size={29} strokeWidth={1.7} />
          Settings
        </Link>
      </aside>

      <section className={styles.mobileTop} aria-label="Mobile home header">
        <div className={styles.statusBar}>
          <span>9:41</span>
          <span className={styles.statusIcons}>||| Wi-Fi</span>
        </div>
        <div className={styles.mobileHeader}>
          <AuthLogo />
          <Link href="/profile" aria-label="Open profile">
            <UserCircle size={38} strokeWidth={1.8} />
          </Link>
        </div>
      </section>

      <section className={styles.content}>
        <section className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>Today&apos;s match</p>
            <h1>Find the track that fits right now</h1>
          </div>
          <div className={styles.progressBlock} aria-label="Match progress">
            <span>
              {Math.min(currentIndex + 1, totalTracks)} / {totalTracks}
            </span>
            <div className={styles.progressTrack}>
              <span style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        </section>

        <section className={styles.matchGrid}>
          <section className={styles.deckPanel} aria-label="Track card">
            {currentTrack && !isFinished ? (
              <TrackCard
                isPlaying={isPlaying}
                onPlayToggle={() => setIsPlaying((value) => !value)}
                track={currentTrack}
              />
            ) : (
              <section className={styles.finishedCard}>
                <h2>Playlist draft is ready</h2>
                <p>{likedTracks.length} tracks matched your mood. Review them or start again.</p>
                <button className={styles.primaryButton} type="button" onClick={handleResetDeck}>
                  <RotateCcw size={22} strokeWidth={1.9} />
                  Start over
                </button>
              </section>
            )}

            <div className={styles.controls} aria-label="Track actions">
              <button
                className={styles.controlButton}
                type="button"
                onClick={handlePassTrack}
                disabled={isFinished}
              >
                <X size={30} strokeWidth={2} />
                <span>Pass</span>
              </button>
              <button
                className={styles.controlButton}
                type="button"
                onClick={handleUndoLastAction}
                disabled={currentIndex === 0}
              >
                <RotateCcw size={28} strokeWidth={1.9} />
                <span>Undo</span>
              </button>
              <button
                className={`${styles.controlButton} ${styles.likeButton}`}
                type="button"
                onClick={handleLikeTrack}
                disabled={isFinished}
              >
                <Heart size={30} strokeWidth={2} />
                <span>Like</span>
              </button>
            </div>
          </section>

          <aside className={styles.queuePanel} aria-label="Match details">
            <section className={styles.stats}>
              <article>
                <span>{likedTracks.length}</span>
                Liked
              </article>
              <article>
                <span>{passedTracks.length}</span>
                Passed
              </article>
            </section>

            <section className={styles.nextList}>
              <h2>Up next</h2>
              {nextTracks.length > 0 ? (
                nextTracks.map((track) => <QueueItem key={track.id} track={track} />)
              ) : (
                <p className={styles.emptyState}>No more tracks in this match.</p>
              )}
            </section>

            <section className={styles.savedList}>
              <h2>Liked tracks</h2>
              {likedTracks.length > 0 ? (
                likedTracks
                  .slice(-3)
                  .map((track) => <QueueItem key={track.id} track={track} compact />)
              ) : (
                <p className={styles.emptyState}>Like a card to build the playlist.</p>
              )}
            </section>
          </aside>
        </section>
      </section>

      <section className={styles.spotifyCta}>
        <div>
          <h2>Ready for a music match?</h2>
          <p>Sync your library and start swiping through personalized recommendations.</p>
        </div>
        <button className={styles.spotifyButton} type="button">
          <SpotifyIcon />
          <span>Connect to Spotify</span>
        </button>
      </section>

      <nav className={styles.mobileNav} aria-label="Mobile navigation">
        <Link href="/home" aria-current="page">
          <Home size={30} strokeWidth={1.7} />
          <span>Home</span>
        </Link>
        <Link href="/library">
          <Library size={30} strokeWidth={1.7} />
          <span>Library</span>
        </Link>
        <Link href="/profile">
          <UserCircle size={30} strokeWidth={1.7} />
          <span>Profile</span>
        </Link>
      </nav>
    </main>
  );
}

type TrackCardProps = {
  track: Track;
  isPlaying: boolean;
  onPlayToggle: () => void;
};

function TrackCard({ track, isPlaying, onPlayToggle }: TrackCardProps) {
  return (
    <article className={styles.trackCard}>
      <div
        className={styles.artwork}
        style={{
          background: `linear-gradient(135deg, ${track.accent}, ${track.secondaryAccent})`,
        }}
        aria-hidden="true"
      >
        <span />
      </div>

      <div className={styles.trackInfo}>
        <div className={styles.trackMeta}>
          <span>{track.matchPercent}% match</span>
          <span>{track.mood}</span>
        </div>
        <h2>{track.title}</h2>
        <p>{track.artist}</p>
        <dl className={styles.trackFacts}>
          <div>
            <dt>Album</dt>
            <dd>{track.album}</dd>
          </div>
          <div>
            <dt>BPM</dt>
            <dd>{track.bpm}</dd>
          </div>
          <div>
            <dt>Time</dt>
            <dd>{track.duration}</dd>
          </div>
        </dl>
      </div>

      <button
        className={styles.playButton}
        type="button"
        onClick={onPlayToggle}
        aria-label={isPlaying ? "Pause preview" : "Play preview"}
      >
        {isPlaying ? (
          <Pause size={34} fill="currentColor" />
        ) : (
          <Play size={34} fill="currentColor" />
        )}
      </button>
    </article>
  );
}

function QueueItem({ track, compact = false }: { track: Track; compact?: boolean }) {
  return (
    <article className={styles.queueItem}>
      <span
        className={styles.queueArt}
        style={{
          background: `linear-gradient(135deg, ${track.accent}, ${track.secondaryAccent})`,
        }}
      />
      <div>
        <h3>{track.title}</h3>
        {!compact && <p>{track.artist}</p>}
      </div>
      <ChevronRight size={24} strokeWidth={1.8} />
    </article>
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
