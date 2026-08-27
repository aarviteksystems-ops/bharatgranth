import { useState, useEffect, useRef } from "react";
import type { AudioChant } from "../types/library";
import { AUDIO_CHANTS } from "../data/audioChants";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  ChevronUp, 
  ChevronDown, 
  Music, 
  Repeat, 
  SkipForward, 
  SkipBack 
} from "lucide-react";

interface AudioPlayerDrawerProps {
  currentChant?: AudioChant;
  onClose?: () => void;
}

export function AudioPlayerDrawer({ currentChant }: AudioPlayerDrawerProps) {
  const [selectedChantIndex, setSelectedChantIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  const activeChant = currentChant || AUDIO_CHANTS[selectedChantIndex];
  const audioSynthRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (currentChant) {
      const idx = AUDIO_CHANTS.findIndex((c) => c.id === currentChant.id);
      if (idx !== -1) setSelectedChantIndex(idx);
    }
  }, [currentChant]);

  // Audio Playback simulation using Web Speech Synthesis or Rhythmic Audio Chanting synth
  const togglePlay = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      const textToSpeak = activeChant.lyrics.join(" ");
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 0.85; // Calming rhythmic cadence
      utterance.pitch = 1.0;
      utterance.lang = "hi-IN"; // Hindi/Sanskrit TTS voice if available

      utterance.onend = () => {
        setIsPlaying(false);
        setProgress(100);
      };

      utterance.onboundary = (e) => {
        if (textToSpeak.length > 0) {
          setProgress(Math.min(100, Math.round((e.charIndex / textToSpeak.length) * 100)));
        }
      };

      window.speechSynthesis.speak(utterance);
      audioSynthRef.current = utterance;
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setSelectedChantIndex((prev) => (prev + 1) % AUDIO_CHANTS.length);
    setProgress(0);
  };

  const handlePrev = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setSelectedChantIndex((prev) => (prev - 1 + AUDIO_CHANTS.length) % AUDIO_CHANTS.length);
    setProgress(0);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-stone-900/95 border-t border-amber-900/50 backdrop-blur-xl shadow-2xl transition-all duration-300">
      {/* Minimized Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-stone-950 font-bold shadow-lg shrink-0"
          >
            <Music className="w-5 h-5" />
          </button>
          <div>
            <h4 className="font-devanagari text-sm font-bold text-amber-300 line-clamp-1">
              {activeChant.sanskritTitle}
            </h4>
            <p className="text-xs text-stone-400 font-cinzel line-clamp-1">
              {activeChant.title} • {activeChant.deity}
            </p>
          </div>
        </div>

        {/* Center Progress Bar & Controls */}
        <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-6">
          <button
            onClick={handlePrev}
            className="text-stone-400 hover:text-amber-400 transition"
            title="Previous Chant"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={togglePlay}
            className="w-9 h-9 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 flex items-center justify-center shadow-lg transition"
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-stone-950" /> : <Play className="w-4 h-4 fill-stone-950 ml-0.5" />}
          </button>

          <button
            onClick={handleNext}
            className="text-stone-400 hover:text-amber-400 transition"
            title="Next Chant"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <div className="flex-1 bg-stone-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Right Toggle Drawer */}
        <div className="flex items-center gap-3">
          <button
            onClick={togglePlay}
            className="md:hidden w-8 h-8 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 bg-stone-800 px-3 py-1.5 rounded-lg border border-stone-700"
          >
            <span>Lyrics</span>
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expanded Lyrics & Playlist Drawer */}
      {isExpanded && (
        <div className="max-w-4xl mx-auto px-4 pb-6 pt-2 border-t border-stone-800/80 max-h-72 overflow-y-auto space-y-4">
          <div className="flex items-center justify-between">
            <h5 className="font-cinzel text-xs font-bold text-amber-400 uppercase tracking-widest">
              Sacred Lyrics Recitation
            </h5>
            <span className="text-xs text-stone-400">{activeChant.duration}</span>
          </div>

          <div className="bg-stone-950/80 p-4 rounded-xl border border-amber-900/30 text-center space-y-2">
            {activeChant.lyrics.map((line, idx) => (
              <p
                key={idx}
                className="font-devanagari text-base md:text-lg text-amber-100 leading-relaxed"
              >
                {line}
              </p>
            ))}
          </div>

          {/* Playlist selector */}
          <div className="space-y-2">
            <p className="text-xs text-stone-400 font-cinzel">Select Stotram / Mantra:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {AUDIO_CHANTS.map((chant, idx) => (
                <button
                  key={chant.id}
                  onClick={() => {
                    window.speechSynthesis.cancel();
                    setIsPlaying(false);
                    setSelectedChantIndex(idx);
                    setProgress(0);
                  }}
                  className={`p-2.5 rounded-xl border text-left text-xs transition ${
                    selectedChantIndex === idx
                      ? "bg-amber-900/40 border-amber-500 text-amber-300 font-bold"
                      : "bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200"
                  }`}
                >
                  <div className="font-devanagari text-sm">{chant.sanskritTitle}</div>
                  <div className="text-[10px] text-stone-400 truncate">{chant.deity}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
