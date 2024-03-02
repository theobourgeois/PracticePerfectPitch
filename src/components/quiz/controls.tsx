import { play } from "../../utils/audio-utils";
import { calculateNextGuessNotes } from "../../utils/note-utils";
import { useStore } from "../../utils/store";

export function Controls() {
    const { guessNotes, setGuessNotes, notesPlayingAtOnce, octaveCount } =
        useStore();

    const handlePlayNotes = () => {
        for (const note of guessNotes) {
            play(note);
        }
    };

    const handleGuessNextNote = () => {
        const nextNotes = calculateNextGuessNotes(
            notesPlayingAtOnce,
            octaveCount
        );
        setGuessNotes(nextNotes);
    };

    return (
        <div className="flex gap-2 items-center">
            <Button onClick={handlePlayNotes}>Listen</Button>
            <Button onClick={handleGuessNextNote}>Next {">>"}</Button>
        </div>
    );
}

type ButtonProps = {
    onClick: () => void;
    children: React.ReactNode;
};

function Button({ onClick, children }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className="bg-gradient-to-t from-blue-600 to-blue-400 active:from-blue-700 active:to-blue-500 from-50% text-white font-semibold px-4 py-2 rounded-md"
        >
            {children}
        </button>
    );
}
