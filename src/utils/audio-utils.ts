import Soundfont from "soundfont-player";
import { NoteWithOctave } from "./note-utils";

export const audioContext = new AudioContext();
let player: Soundfont.Player | null = null;

async function initInstrument() {
  player = await Soundfont.instrument(audioContext, "acoustic_grand_piano");
}
initInstrument();


export function play(note: NoteWithOctave, duration = 0.5, gain = 0.5) {
  player?.play(note, audioContext.currentTime, { duration, gain });
}