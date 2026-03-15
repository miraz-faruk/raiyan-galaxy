import { useState, useEffect } from 'react'
import { Power } from 'lucide-react'
import './App.css'

function App() {
  const [started, setStarted] = useState(false);
  const [showGreeting, setShowGreeting] = useState(true);

  useEffect(() => {
    // This function helps the browser "remember" to load the voice list
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };

    loadVoices();

    // Chrome and Edge need this event listener to actually populate the list
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const speakWelcome = () => {
    const synth = window.speechSynthesis;
    const message = new SpeechSynthesisUtterance(
      "Hi Raian, welcome to the Raian's galaxy, and I'm your personal AI assistant."
    );

    const voices = synth.getVoices();

    // Look for high-quality female voices
    const femaleVoice = voices.find((v) =>
      v.name.includes("Google US English") ||
      v.name.includes("Microsoft Zira") ||
      v.name.includes("Samantha") ||
      v.name.includes("Female")
    );

    if (femaleVoice) {
      message.voice = femaleVoice;
    }

    message.pitch = 1.1;
    message.rate = 0.95;
    message.volume = 1;

    synth.speak(message);
  };

  const handleStart = () => {
    setStarted(true);
    setTimeout(() => {
      speakWelcome();
    }, 2000);

    setTimeout(() => {
      setShowGreeting(false);
    }, 7000);
  };

  // 1. Add a new state to track if Tom is listening
  const [isListening, setIsListening] = useState(false);

  const startTalkingTom = () => {
    // Check if browser supports speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice recognition not supported in this browser. Please use Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setIsListening(false);

      // Now, repeat it back in Tom's voice
      repeatAsTom(transcript);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const repeatAsTom = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);

    // High pitch makes it sound like Talking Tom!
    utterance.pitch = 1.8;
    utterance.rate = 1.2;

    // Use the same female voice logic for a clear high-pitched sound
    const voices = synth.getVoices();
    const tomVoice = voices.find(v => v.name.includes("Google") || v.name.includes("Samantha"));
    if (tomVoice) utterance.voice = tomVoice;

    synth.speak(utterance);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white font-sans">
      {!started ? (
        <div className="relative z-50 flex items-center justify-center h-full bg-black">
          <button onClick={handleStart} className="px-10 py-5 border-2 border-blue-500 text-blue-400 rounded-full text-2xl font-bold hover:bg-blue-500 hover:text-white transition-all animate-pulse flex items-center gap-3">
            <Power size={28} /> INITIALIZE SYSTEM
          </button>
        </div>
      ) : (
        <>
          <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover z-0">
            <source src="/galaxy.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-black/50 z-10" />

          <div className="relative z-20 flex items-center justify-center h-full">
            {showGreeting ? (
              <h1 className="text-7xl font-bold tracking-widest animate-pulse drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]">
                Hi Raiyan!!!
              </h1>
            ) : (
              <div className="flex flex-col sm:flex-row gap-16">

                {/* RED POWER BUTTON */}
                <div className="flex flex-col items-center gap-4">
                  <button className="w-28 h-28 bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(220,38,38,0.6)] hover:shadow-[0_0_60px_rgba(220,38,38,1)] transition-all hover:scale-110 active:scale-95 border-4 border-red-400">
                    <Power size={48} color="white" strokeWidth={3} />
                  </button>
                  <span className="text-red-500 font-black tracking-widest uppercase text-xl">AI Assistant</span>
                </div>

                {/* GREEN POWER BUTTON */}
                {/* GREEN POWER BUTTON */}
                <div className="flex flex-col items-center gap-4">
                  <button
                    onClick={startTalkingTom}
                    className={`w-28 h-28 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 border-4 
      ${isListening
                        ? 'bg-yellow-400 animate-ping border-yellow-200 shadow-[0_0_60px_rgba(250,204,21,1)]'
                        : 'bg-green-600 border-green-400 shadow-[0_0_40px_rgba(22,163,74,0.6)] hover:shadow-[0_0_60px_rgba(22,163,74,1)]'
                      }`}
                  >
                    <Power size={48} color="white" strokeWidth={3} />
                  </button>
                  <span className="text-green-500 font-black tracking-widest uppercase text-xl">
                    {isListening ? "Listening..." : "Talking Tom"}
                  </span>
                </div>

              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default App