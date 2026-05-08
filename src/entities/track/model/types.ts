export type TrackMood = "chill" | "dance" | "focus" | "late night" | "romantic" | "workout";

export type Track = {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  bpm: number;
  matchPercent: number;
  mood: TrackMood;
  accent: string;
  secondaryAccent: string;
  previewUrl?: string;
};

export type TrackDecision = "liked" | "passed";

export type TrackHistoryItem = {
  track: Track;
  decision: TrackDecision;
};
