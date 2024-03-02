import { create } from "zustand";
import { NoteWithOctave, allNotes, calculateNextGuessNotes } from "./note-utils";

export enum Difficulty {
  Easy = "Easy",
  Medium = "Medium",
  Hard = "Hard",
  Insane = "Insane",
  Demon = "Demon",
}

type AppStore = {
  streak: number;
  notesPlayingAtOnce: number;
  octaveCount: number;
  mutePiano: boolean;
  guessNotes: NoteWithOctave[];
  difficulty: Difficulty;
  setNotesPlayingAtOnce: (notesPlayingAtOnce: number) => void;
  setOctaveCount: (noteRange: number) => void;
  setMutePiano: (mutePiano: boolean) => void;
  setGuessNotes: (note: NoteWithOctave[]) => void;
  setDifficulty: (difficulty: Difficulty) => void;
  addToStreak: () => void;
  resetStreak: () => void;
};

export const getRandomNote = () => allNotes[Math.floor(Math.random() * allNotes.length)];

const useAppStore = create<AppStore>((set) => ({
  streak: 0,
  notesPlayingAtOnce: 1,
  octaveCount: 1,
  mutePiano: false,
  difficulty: Difficulty.Easy,
  guessNotes: calculateNextGuessNotes(1, 1),
  setNotesPlayingAtOnce: (notesPlayingAtOnce) => set({ notesPlayingAtOnce }),
  setOctaveCount: (octaveCount) => set({ octaveCount }),
  setMutePiano: (mutePiano) => set({ mutePiano }),
  setGuessNotes: (guessNotes) => set({ guessNotes }),
  setDifficulty: (difficulty) => set({ difficulty }),
  addToStreak: () => set((state) => ({ streak: state.streak + 1 })),
  resetStreak: () => set({ streak: 0 }),
}));

export function useStore() {
  return useAppStore((state) => state);
}

export const difficultyData = {
  [Difficulty.Easy]: {
    notesPlayingAtOnce: 1,
    octaveCount: 1,
    className: {
      bg: "bg-gradient-to-r from-green-500 to-green-400 from-1%",
      shadow: "shadow-green-400",
    },
    emoji: "😂",
  },
  [Difficulty.Medium]: {
    notesPlayingAtOnce: 1,
    octaveCount: 2,
    className: {
      bg: "bg-gradient-to-r from-yellow-500 to-yellow-300 from-1%",
      shadow: "shadow-yellow-400",
    },
    emoji: "😼",
  },
  [Difficulty.Hard]: {
    notesPlayingAtOnce: 2,
    octaveCount: 2,
    className: {
      bg: "bg-gradient-to-r from-orange-500 to-orange-400 from-1%",
      shadow: "shadow-orange-400",
    },
    emoji: "😡",
  },
  [Difficulty.Insane]: {
    notesPlayingAtOnce: 3,
    octaveCount: 2,
    className: {
      bg: "bg-gradient-to-r from-purple-500 to-purple-400",
      shadow: "shadow-purple-400",
    },
    emoji: "😈",
  },
  [Difficulty.Demon]: {
    notesPlayingAtOnce: 3,
    octaveCount: 3,
    className: {
      bg: "bg-gradient-to-r from-red-500 to-red-400",
      shadow: "shadow-red-400",
    },
    emoji: "👹",
  },
};
