const Note = {
  C: "c",
  CSharp: "c#",
  D: "d",
  DSharp: "d#",
  E: "e",
  F: "f",
  FSharp: "f#",
  G: "g",
  GSharp: "g#",
  A: "a",
  ASharp: "a#",
  B: "b",
} as const;
type Note = typeof Note[keyof typeof Note];

const NOTE_PER_OCTAVE = 12;
export const OCTAVES = 3;
export const START_OCTAVE = 4;
export type OctaveRange = 4 | 5 | 6
export type NoteWithOctave = `${Note}${OctaveRange}`;

export const NOTES = {
  [Note.C]: 16.35,
  [Note.CSharp]: 17.32,
  [Note.D]: 18.35,
  [Note.DSharp]: 19.45,
  [Note.E]: 20.6,
  [Note.F]: 21.83,
  [Note.FSharp]: 23.12,
  [Note.G]: 24.5,
  [Note.GSharp]: 25.96,
  [Note.A]: 27.5,
  [Note.ASharp]: 29.14,
  [Note.B]: 30.87,
};

export function getNoteFrequency(note: NoteWithOctave) {
  const octave = parseInt(note[note.length - 1]);
  const noteWithoutOctave = note.slice(0, -1) as Note;
  const noteFrequency = NOTES[noteWithoutOctave];
  return noteFrequency * Math.pow(2, octave);
}

export function calculateNextGuessNotes(
  notesPlayingAtOnce: number,
  octaveCount: number
): NoteWithOctave[] {
  const notes = [];
  for (let i = 0; i < notesPlayingAtOnce; i++) {
    const indexRange = NOTE_PER_OCTAVE * octaveCount;
    const noteIndex = Math.floor(Math.random() * indexRange);
    const note = allNotes[noteIndex];
    notes.push(note);
  }
  return notes as NoteWithOctave[];
}

function getAllNotes() {
  const notes: NoteWithOctave[] = [];
  for (let i = 0; i < OCTAVES; i++) {
    const offsetOctave = i + START_OCTAVE;
    for (const key in Note) {
      const note = key as keyof typeof Note;
      notes.push(`${Note[note]}${offsetOctave}` as NoteWithOctave);
    }
  }
  return notes;
}

export const allNotes = getAllNotes();