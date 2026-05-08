"use client";

import { useMemo, useState } from "react";
import type { Track, TrackDecision, TrackHistoryItem } from "@/entities/track/model/types";

type UseTrackDeckResult = {
  currentTrack: Track | null;
  currentIndex: number;
  totalTracks: number;
  history: TrackHistoryItem[];
  likedTracks: Track[];
  passedTracks: Track[];
  isFinished: boolean;
  progressPercent: number;
  likeTrack: () => void;
  passTrack: () => void;
  undoLastAction: () => void;
  resetDeck: () => void;
};

export function useTrackDeck(tracks: Track[]): UseTrackDeckResult {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [history, setHistory] = useState<TrackHistoryItem[]>([]);

  const currentTrack = tracks[currentIndex] ?? null;
  const isFinished = currentIndex >= tracks.length;

  const likedTracks = useMemo(
    () => history.filter((item) => item.decision === "liked").map((item) => item.track),
    [history]
  );

  const passedTracks = useMemo(
    () => history.filter((item) => item.decision === "passed").map((item) => item.track),
    [history]
  );

  const progressPercent =
    tracks.length === 0 ? 0 : Math.round((currentIndex / tracks.length) * 100);

  function decideTrack(decision: TrackDecision) {
    if (!currentTrack) {
      return;
    }

    setHistory((items) => [...items, { track: currentTrack, decision }]);
    setCurrentIndex((index) => index + 1);
  }

  function undoLastAction() {
    setHistory((items) => {
      if (items.length === 0) {
        return items;
      }

      setCurrentIndex((index) => Math.max(0, index - 1));
      return items.slice(0, -1);
    });
  }

  function resetDeck() {
    setCurrentIndex(0);
    setHistory([]);
  }

  return {
    currentTrack,
    currentIndex,
    totalTracks: tracks.length,
    history,
    likedTracks,
    passedTracks,
    isFinished,
    progressPercent,
    likeTrack: () => decideTrack("liked"),
    passTrack: () => decideTrack("passed"),
    undoLastAction,
    resetDeck,
  };
}
