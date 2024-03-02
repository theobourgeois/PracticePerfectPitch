import { RefObject, useEffect, useRef, useState } from "react";
import {
    NoteWithOctave,
    allNotes,
    calculateNextGuessNotes,
} from "../../utils/note-utils";
import { play } from "../../utils/audio-utils";
import { useStore } from "../../utils/store";

function isBlackKey(note: NoteWithOctave) {
    return note.includes("#");
}

export function Piano() {
    const [selectedNotes, setSelectedNotes] = useState<NoteWithOctave[]>([]);
    const {
        notesPlayingAtOnce,
        guessNotes,
        octaveCount,
        setGuessNotes,
        addToStreak,
        resetStreak,
    } = useStore();
    const guessNotesRef = useRef<NoteWithOctave[]>(guessNotes);
    const notesPlayingAtOnceRef = useRef<number>(notesPlayingAtOnce);
    const octaveCountRef = useRef<number>(octaveCount);
    const selectedNotesRef = useRef<NoteWithOctave[]>(selectedNotes);

    useEffect(() => {
        guessNotesRef.current = guessNotes;
        notesPlayingAtOnceRef.current = notesPlayingAtOnce;
        octaveCountRef.current = octaveCount;
        selectedNotesRef.current = selectedNotes;
    }, [guessNotes, notesPlayingAtOnce, octaveCount, selectedNotes]);

    const handleAddSelectedNote = (note: NoteWithOctave) => {
        const guessNotes = guessNotesRef.current;
        const notesPlayingAtOnce = notesPlayingAtOnceRef.current;
        const octaveCount = octaveCountRef.current;
        const selectedNotes = selectedNotesRef.current;

        if (selectedNotes.includes(note)) {
            setSelectedNotes(
                selectedNotes.filter((prevNote) => prevNote !== note)
            );
            return;
        }

        const newSelectedNotes = [...selectedNotes, note];

        if (newSelectedNotes.length === notesPlayingAtOnce) {
            const isCorrectGuess = newSelectedNotes.every((note) =>
                guessNotes.includes(note)
            );
            if (isCorrectGuess) {
                const nextNotes = calculateNextGuessNotes(
                    notesPlayingAtOnce,
                    octaveCount
                );
                addToStreak();
                setGuessNotes(nextNotes);
            } else {
                resetStreak();
            }
            setSelectedNotes([]);
            return;
        }

        setSelectedNotes([...selectedNotes, note]);
    };

    const pianoNotes = allNotes.slice(0, octaveCount * 12);

    return (
        <div className="flex w-full justify-center select-none">
            {pianoNotes.map((note) => {
                if (isBlackKey(note)) {
                    return (
                        <BlackKey
                            selectedNotes={selectedNotes}
                            onAddNote={handleAddSelectedNote}
                            key={note}
                            note={note}
                        ></BlackKey>
                    );
                }
                return (
                    <WhiteKey
                        selectedNotes={selectedNotes}
                        onAddNote={handleAddSelectedNote}
                        key={note}
                        note={note}
                    ></WhiteKey>
                );
            })}
        </div>
    );
}

type KeyProps = {
    note: NoteWithOctave;
    onAddNote: (note: NoteWithOctave) => void;
    selectedNotes: NoteWithOctave[];
};

function WhiteKey({ note, onAddNote, selectedNotes }: KeyProps) {
    const keyRef = useRef<HTMLDivElement>(null);
    const { guessNotes } = useStore();
    const isKeyPressed = useKeyHandler(keyRef, note, onAddNote);
    const isNoteSelected = selectedNotes.includes(note);
    const isNoteCorrect = isNoteSelected && guessNotes.includes(note);

    const renderNoteBackground = () => {
        if (isKeyPressed) {
            return "linear-gradient(180deg, rgba(166,166,166,1) 0%, rgba(255,255,255,1) 16%, rgba(166,166,166,1) 100%)";
        }
        if (isNoteCorrect) {
            return "linear-gradient(180deg, rgb(34 197 94) 0%, rgba(255,255,255,1) 16%, rgb(22 163 74) 100%)";
        }
        if (isNoteSelected) {
            return "linear-gradient(180deg, rgb(239 68 68) 0%, rgba(255,255,255,1) 16%, rgb(220 38 38) 100%)";
        }
        return "linear-gradient(180deg, rgba(166,166,166,1) 0%, rgba(255,255,255,1) 16%, rgba(242,242,242,1) 100%)";
    };

    return (
        <div
            ref={keyRef}
            className="h-[120px] w-12 cursor-pointer"
            style={{
                boxShadow: "inset 0 0 2px rgba(0, 0, 0, 0.9)",
                borderLeft: `1px solid black`,
                borderRight: `1px solid black`,
                borderRadius: "0 0 5px 5px",
                background: renderNoteBackground(),
            }}
        >
            <div className="relative h-full">
                <p className="font-semibold absolute bottom-0 left-1/2 -translate-x-1/2">
                    {note}
                </p>
            </div>
        </div>
    );
}

function BlackKey({ note, onAddNote, selectedNotes }: KeyProps) {
    const keyRef = useRef<HTMLDivElement>(null);
    const { guessNotes } = useStore();
    const isKeyPressed = useKeyHandler(keyRef, note, onAddNote);
    const isNoteSelected = selectedNotes.includes(note);
    const isNoteCorrect = isNoteSelected && guessNotes.includes(note);

    const renderNoteBackground = () => {
        if (isKeyPressed) {
            return "linear-gradient(180deg, rgba(80,80,80,1) 0%, rgba(50,50,50,1) 100%)";
        }
        if (isNoteCorrect) {
            return "linear-gradient(180deg, rgb(34 197 94) 0%, rgba(255,255,255,1) 16%, rgb(22 163 74) 100%)";
        }
        if (isNoteSelected || isKeyPressed) {
            return "linear-gradient(180deg, rgb(239 68 68) 0%, rgba(255,255,255,1) 16%, rgb(220 38 38) 100%)";
        }
        return "linear-gradient(180deg, rgba(100,100,100,1) 0%, rgba(50,50,50,1) 100%)";
    };

    return (
        <div className="relative">
            <div className="absolute right-1/2 translate-x-1/2 z-10">
                <div
                    ref={keyRef}
                    className="bg-black h-[74px] w-6 cursor-pointer relative"
                    style={{
                        boxShadow: isKeyPressed
                            ? "inset 0 6px 1px rgba(0,0,0, 1), inset 0 -6px 4px rgba(0,0,0,1)"
                            : "inset 0 4px 1px rgba(0,0,0, 1), inset 0 -6px 4px rgba(0,0,0,0.5)",
                        border: `1px solid black`,
                        background: renderNoteBackground(),
                    }}
                ></div>
            </div>
        </div>
    );
}

// Custom hook to handle key press and letting go of a piano key
function useKeyHandler(
    keyRef: RefObject<HTMLDivElement>,
    note: NoteWithOctave,
    onAddNote: (note: NoteWithOctave) => void
) {
    const [isKeyPressed, setIsKeyPressed] = useState(false);
    const keyPresedRef = useRef(false);

    useEffect(() => {
        const handleMouseDown = () => {
            setIsKeyPressed(true);
            play(note);
            onAddNote?.(note);
        };

        const handleMouseUp = () => {
            setIsKeyPressed(false);
        };
        const key = keyRef.current;
        key?.addEventListener("mouseleave", handleMouseUp);
        key?.addEventListener("mousedown", handleMouseDown);
        key?.addEventListener("mouseup", handleMouseUp);
        return () => {
            key?.removeEventListener("mousedown", handleMouseDown);
            key?.removeEventListener("mouseup", handleMouseUp);
        };
    }, [keyRef]);

    useEffect(() => {
        keyPresedRef.current = isKeyPressed;
    }, [isKeyPressed]);

    return isKeyPressed;
}
