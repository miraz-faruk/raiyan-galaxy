import { useState, useEffect } from 'react'
import { Power, Mic, Send, X } from 'lucide-react'
import './App.css'

function App() {
  const [started, setStarted] = useState(false);
  const [showGreeting, setShowGreeting] = useState(true);
  const [aiActive, setAiActive] = useState(false);
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [isListening, setIsListening] = useState(false); // For Talking Tom
  const [isAiListening, setIsAiListening] = useState(false); // For AI Voice Command

  // Pre-load voices for the browser
  useEffect(() => {
    const loadVoices = () => { window.speechSynthesis.getVoices(); };
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // --- VOICE UTILITIES ---
  const speakText = (text, isTom = false) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = synth.getVoices();

    const femaleVoice = voices.find(v =>
      v.name.includes("Google US English") ||
      v.name.includes("Microsoft Zira") ||
      v.name.includes("Samantha")
    );

    if (femaleVoice) utterance.voice = femaleVoice;

    // Tom is high pitched (1.8), AI is professional (1.1)
    utterance.pitch = isTom ? 1.8 : 1.1;
    utterance.rate = isTom ? 1.2 : 0.95;

    synth.speak(utterance);
  };

  // --- START SEQUENCE ---
  const handleStart = () => {
    setStarted(true);
    setTimeout(() => {
      // We use "Rai-yaan" so the mobile voice says it correctly
      speakText("Hi Rai-yaan, welcome to the Rai-yaan's galaxy, and I'm your personal AI assistant.");
    }, 2000);

    setTimeout(() => {
      setShowGreeting(false);
    }, 7000);
  };

  // --- RED BUTTON: STABLE AI LOGIC ---
  const handleAskAI = (e) => {
    if (e) e.preventDefault();
    if (!input) return;

    const query = input.toLowerCase();
    let reply = "";

    // Local Logic (Ensures it works everywhere in Bangladesh)
    if (query.includes("hello") || query.includes("hi")) {
      reply = "Hello Raian! I am your Galaxy Assistant. How can I help you today?";
    }
    else if (query.includes("time")) {
      reply = `The current time in the galaxy is ${new Date().toLocaleTimeString()}.`;
    }
    else if (query.includes("day") || query.includes("date")) {
      const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      reply = `Today is ${today}.`;
    }
    else if (query.includes("who made you") || query.includes("creator")) {
      reply = "I was created by your amazing uncle, Miraz, to be your personal space guide!";
    }
    else if (query.includes("joke")) {
      const jokes = [
        "How do you organize a space party? You planet!",
        "What is an astronaut's favorite key on the keyboard? The space bar!",
        "Why did the sun go to school? To get brighter!"
      ];
      reply = jokes[Math.floor(Math.random() * jokes.length)];
    }
    else {
      reply = `I am opening the Galaxy Portal to find the answer for: ${input}`;
      setTimeout(() => {
        window.open(`https://www.google.com/search?q=${input}`, "_blank");
      }, 2000);
    }

    setResponse(reply);
    speakText(reply);
    setInput("");
  };

  // --- AI VOICE INPUT (Red Button Mic) ---
  const startAiVoiceCommand = () => {
    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    if (!SpeechRecognition) return alert("Please use Chrome browser.");

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsAiListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setIsAiListening(false);
      setInput(transcript);

      // Submit the text to AI after 1 second
      setTimeout(() => {
        document.getElementById("ai-submit-btn")?.click();
      }, 500);
    };
    recognition.onerror = () => setIsAiListening(false);
    recognition.start();
  };

  // --- GREEN BUTTON: TALKING TOM ---
  const startTalkingTom = () => {
    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice recognition not supported. Please use Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setIsListening(false);
      speakText(transcript, true);
    };
    recognition.onerror = () => setIsListening(false);

    recognition.start();
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
              <h1 className="text-6xl lg:text-7xl font-bold tracking-widest animate-pulse text-center drop-shadow-[0_0_15px_rgba(59,130,246,0.8)] px-4 uppercase">
                Hi Raiyan!!!
              </h1>
            ) : (
              <div className="flex flex-col sm:flex-row gap-16">
                {/* RED BUTTON - AI ASSISTANT */}
                <div className="flex flex-col items-center gap-4">
                  <button onClick={() => setAiActive(true)} className="w-28 h-28 bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(220,38,38,0.6)] hover:shadow-[0_0_60px_rgba(220,38,38,1)] transition-all hover:scale-110 active:scale-95 border-4 border-red-400">
                    <Power size={48} color="white" strokeWidth={3} />
                  </button>
                  <span className="text-red-500 font-black tracking-widest uppercase text-xl">AI Assistant</span>
                </div>

                {/* GREEN BUTTON - TALKING TOM */}
                <div className="flex flex-col items-center gap-4">
                  <button onClick={startTalkingTom} className={`w-28 h-28 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 border-4 ${isListening ? 'bg-yellow-400 animate-ping border-yellow-200 shadow-[0_0_60px_rgba(250,204,21,1)]' : 'bg-green-600 border-green-400 shadow-[0_0_40px_rgba(22,163,74,0.6)] hover:shadow-[0_0_60px_rgba(22,163,74,1)]'}`}>
                    <Power size={48} color="white" strokeWidth={3} />
                  </button>
                  <span className="text-green-500 font-black tracking-widest uppercase text-xl">{isListening ? "Listening..." : "Talking Tom"}</span>
                </div>
              </div>
            )}
          </div>

          {/* AI MODAL INTERFACE */}
          {aiActive && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
              <div className="w-full max-w-2xl p-8 bg-black/80 border border-red-500/30 rounded-[2rem] shadow-2xl animate-in zoom-in duration-300">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-600 rounded-full animate-ping" />
                    <h2 className="text-2xl font-black text-red-500 tracking-tighter uppercase">AI Interface</h2>
                  </div>
                  <button onClick={() => setAiActive(false)} className="text-white/40 hover:text-white transition-colors"><X size={32} /></button>
                </div>

                <div className="h-48 overflow-y-auto mb-8 text-2xl font-light leading-relaxed text-red-50 border-l-2 border-red-600/20 pl-6">
                  {response || "Ready for your command, Raiyan..."}
                </div>

                <form onSubmit={handleAskAI} className="relative flex items-center gap-3">
                  <div className="relative flex-1">
                    <input autoFocus type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type or use the mic..." className="w-full bg-red-950/20 border border-red-500/20 rounded-2xl py-5 px-6 pr-16 focus:outline-none focus:border-red-500 transition-all text-white text-lg" />
                    <button type="button" onClick={startAiVoiceCommand} className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all ${isAiListening ? 'bg-red-600 animate-pulse' : 'bg-red-900/40 hover:bg-red-600'}`}>
                      <Mic size={24} color="white" />
                    </button>
                  </div>
                  <button id="ai-submit-btn" type="submit" className="px-6 py-5 bg-red-600 text-white font-bold rounded-2xl hover:bg-red-500 shadow-lg active:scale-95 transition-all"><Send size={24} /></button>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default App