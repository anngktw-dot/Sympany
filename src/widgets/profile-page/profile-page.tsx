import Link from "next/link";
import {
  ChevronRight,
  HelpCircle,
  Home,
  Library,
  ListChecks,
  Lock,
  LogOut,
  UserCircle,
} from "lucide-react";
import { AuthLogo } from "@/shared/ui/auth-logo/auth-logo";
import styles from "./profile-page.module.css";

const playlists = [
  { id: "my-playlist-3", name: "My playlist 3", variant: "dark" },
  { id: "my-playlist-2", name: "My playlist 2", variant: "sunset" },
  { id: "lol", name: "lol", variant: "dark" },
  { id: "my-playlist-2", name: "артур лох", variant: "sunset" },
];

const securityItems = [
  { label: "Change password", icon: Lock },
  { label: "Edit login methods", icon: ListChecks },
  { label: "Sign out", icon: LogOut },
];

export function ProfilePage() {
  return (
    <main className={styles.page}>
      <aside className={styles.sidebar} aria-label="Library sidebar">
        <div className={styles.sidebarLogo}>
          <AuthLogo />
        </div>

        <nav className={styles.sidebarNav}>
          <Link className={styles.sidebarItem} href="/home">
            <Home size={30} strokeWidth={1.6} />
            Home
          </Link>
          <Link className={styles.sidebarItem} href="/library">
            <Library size={30} strokeWidth={1.6} />
            Library
          </Link>

          <div className={styles.playlists}>
            {playlists.map((playlist) => (
              <Link
                className={styles.playlistItem}
                href={`/playlist/${playlist.id}`}
                key={playlist.name}
              >
                <span className={`${styles.playlistArt} ${styles[playlist.variant]}`} />
                {playlist.name}
              </Link>
            ))}
          </div>
        </nav>

        <Link className={styles.settingsPill} href="/profile" aria-current="page">
          <UserCircle size={30} strokeWidth={1.6} />
          Settings
        </Link>
      </aside>

      <section className={styles.mobileTop} aria-label="Mobile profile header">
        <div className={styles.statusBar}>
          <span>9:41</span>
          <span className={styles.statusIcons}>||| Wi-Fi</span>
        </div>
        <div className={styles.mobileHeader}>
          <AuthLogo />
          <UserCircle size={38} strokeWidth={1.8} />
        </div>
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

      <section className={styles.content}>
        <section className={styles.card}>
          <h1>Security and privacy</h1>
          <div className={styles.actionList}>
            {securityItems.map(({ label, icon: Icon }) => (
              <button className={styles.actionRow} type="button" key={label}>
                <span>
                  <Icon size={32} strokeWidth={1.7} />
                  {label}
                </span>
                <ChevronRight className={styles.chevron} size={38} strokeWidth={1.8} />
              </button>
            ))}
          </div>
        </section>

        <section className={`${styles.card} ${styles.supportCard}`}>
          <h2>Support</h2>
          <button className={styles.actionRow} type="button">
            <span>
              <HelpCircle size={32} strokeWidth={1.7} />
              Our help
            </span>
            <ChevronRight className={styles.chevron} size={38} strokeWidth={1.8} />
          </button>
        </section>

        <section className={`${styles.card} ${styles.termsCard}`}>
          <h2>Terms of use</h2>
          <p>We highly recommend you to get familiar with Sympany&apos;s terms of use</p>
        </section>
      </section>

      <nav className={styles.mobileNav} aria-label="Mobile navigation">
        <Link href="/home">
          <Home size={31} strokeWidth={1.6} />
          <span>Home</span>
        </Link>
        <Link href="/library">
          <Library size={31} strokeWidth={1.6} />
          <span>Library</span>
        </Link>
        <Link href="/profile" aria-current="page">
          <UserCircle size={31} strokeWidth={1.6} />
          <span>Profile</span>
        </Link>
      </nav>
    </main>
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
