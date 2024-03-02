import { play } from "../../utils/audio-utils";
import { calculateNextGuessNotes } from "../../utils/note-utils";
import { Difficulty, difficultyData, useStore } from "../../utils/store";
import { cn } from "../../utils/style-utils";

export function Settings() {
    const { difficulty, streak } = useStore();

    return (
        <div className="flex items-center flex-col gap-4">
            <div className="flex items-center gap-2">
                {Object.values(Difficulty).map((currDifficulty) => (
                    <DifficultyButton
                        key={currDifficulty}
                        selectedDifficulty={difficulty}
                        difficulty={currDifficulty}
                    />
                ))}
            </div>
            <p className="text-center text-xl">
                <span className="font-semibold">Score:</span> {streak}
            </p>
        </div>
    );
}

function DifficultyButton({
    difficulty,
    selectedDifficulty,
}: {
    difficulty: Difficulty;
    selectedDifficulty: Difficulty;
}) {
    const {
        setDifficulty,
        setNotesPlayingAtOnce,
        setOctaveCount,
        setGuessNotes,
        resetStreak,
    } = useStore();
    const { notesPlayingAtOnce, octaveCount, className, emoji } =
        difficultyData[difficulty];

    const handleChange = () => {
        setDifficulty(difficulty);
        setNotesPlayingAtOnce(notesPlayingAtOnce);
        setOctaveCount(octaveCount);
        const nextNotes = calculateNextGuessNotes(
            notesPlayingAtOnce,
            octaveCount
        );
        setGuessNotes(nextNotes);
        resetStreak();
    };

    return (
        <button
            onClick={handleChange}
            className={cn(
                "text-white font-semibold px-4 py-2 rounded-md flex items-center gap-1",
                className.bg,
                difficulty === selectedDifficulty &&
                    "shadow-lg " + className.shadow
            )}
        >
            <div>{emoji}</div>
            {difficulty}
        </button>
    );
}
