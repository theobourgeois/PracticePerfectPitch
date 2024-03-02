import { useEffect } from "react";
import { useStore } from "../../utils/store";
import { Controls } from "./controls";
import { Piano } from "./piano";
import { Settings } from "./settings";
import { play } from "../../utils/audio-utils";

export function Quiz() {
    const { guessNotes } = useStore();
    useEffect(() => {
        for (const note of guessNotes) {
            play(note);
        }
    }, [guessNotes]);
    return (
        <div className="flex h-full gap-4 flex-col justify-center items-center">
            <div className="flex flex-col gap-2 mb-4">
                <h1 className="text-center text-6xl font-bold">
                    Practice Your Pitch
                </h1>
                <h2 className="text-center text-3xl">Guess the note</h2>
            </div>
            <Settings />
            <Controls />
            <Piano />
        </div>
    );
}
