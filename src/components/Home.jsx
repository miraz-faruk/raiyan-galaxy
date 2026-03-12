import React, { useState, useEffect, useRef } from "react";
import GalaxyBackground from "./GalaxyBackground";

const Home = () => {
  const [scene, setScene] = useState("welcome");
  const [aiInput, setAiInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isListening, setIsListening] = useState(false);
  
  // Use a ref to keep the synthesis object stable
  const synth = window.speechSynthesis;

  useEffect(() => {
    const timer = setTimeout(() => setScene("hub"), 5000);
    return () => clearTimeout(timer);
  }, []);

  // --- CRITICAL: Function to "Unlock" Voice on first click ---
  const unlockVoice = () => {
    const utter = new SpeechSynthesisUtterance("System Active");
    utter.volume = 0; // Silent unlock
    synth.speak(utter);
  };

  const speak = (text, isTom = false) => {
    synth.cancel(); // Stop any current talking
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Get available voices and pick one (optional)
    const voices = synth.getVoices();
    utterance.voice = voices[0]; 

    if (isTom) {
      utterance.pitch = 2.0; 
      utterance.rate = 1.3;
    } else {
      utterance.pitch = 1.0;
      utterance.rate = 1.0;
    }

    synth.speak(utterance);
  };

  const getAIResponse = (question) => {
    const q = question.toLowerCase();
    let answer = "I'm searching the galaxy for that answer, Raiyan!";

    if (q.includes("hi") || q.includes("hello")) answer = "Hello Raiyan! How is your galaxy today?";
    if (q.includes("joke")) answer = "Why did the sun go to school? To get brighter!";
    if (q.includes("who are you")) answer = "I am your personal galaxy explorer AI!";

    setAiResponse(answer);
    speak(answer);
  };

  const startListening = (mode) => {
    unlockVoice(); // Unlock audio on every click
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert("Please use Chrome or Edge for voice features!");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("Heard:", transcript); // Check your console (F12) to see if it hears you

      if (mode === "AI") {
        setAiInput(transcript);
        getAIResponse(transcript);
      } else {
        speak(transcript, true);
      }
    };

    recognition.onend = () => setIsListening(false);
    recognition.onerror = (err) => {
      console.error("Speech Error:", err);
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="relative h-screen w-full overflow-hidden text-white bg-black font-sans">
      <GalaxyBackground />

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        
        {scene === "welcome" && (
          <h1 className="text-7xl font-bold animate-pulse text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-400">
            Hi Raiyan!
          </h1>
        )}

        {scene === "hub" && (
          <div className="flex flex-col items-center gap-12 text-center">
            <h1 className="text-5xl font-extrabold">Raiyan's Universe 🚀</h1>
            <div className="flex flex-col sm:flex-row gap-6">
              <button onClick={() => { setScene("ai"); unlockVoice(); }} className="bg-red-600 hover:bg-red-500 px-12 py-6 rounded-3xl text-2xl font-black shadow-2xl transition-transform hover:scale-110">
                AI ASSISTANT
              </button>
              <button onClick={() => { setScene("tom"); unlockVoice(); }} className="bg-green-600 hover:bg-green-500 px-12 py-6 rounded-3xl text-2xl font-black shadow-2xl transition-transform hover:scale-110">
                TALKING TOM
              </button>
            </div>
          </div>
        )}

        {scene === "ai" && (
          <div className="flex flex-col items-center gap-6 w-full max-w-md bg-white/5 p-8 rounded-[40px] backdrop-blur-xl border border-white/10">
            <h2 className="text-3xl font-bold text-red-500">Galaxy AI 🤖</h2>
            <div className="w-full bg-black/50 p-4 rounded-2xl min-h-[100px] border border-red-900/50 text-xl">
              <p className="text-sm text-gray-500 uppercase mb-2">You said: {aiInput || "..."}</p>
              <p className="text-red-400">{aiResponse || "Ask me something!"}</p>
            </div>
            <button 
              onClick={() => startListening("AI")} 
              className={`w-full py-6 rounded-2xl font-bold text-2xl transition-all ${isListening ? 'bg-red-800 animate-pulse' : 'bg-red-600 hover:bg-red-500'}`}
            >
              {isListening ? "LISTENING..." : "🎤 CLICK TO SPEAK"}
            </button>
            <button onClick={() => setScene("hub")} className="opacity-50 hover:opacity-100 underline">Exit</button>
          </div>
        )}

        {scene === "tom" && (
          <div className="flex flex-col items-center gap-8">
            <h2 className="text-4xl font-bold text-green-500">Talking Tom 🐱</h2>
            <div className={`text-9xl transition-all duration-500 ${isListening ? 'scale-125 rotate-6' : 'scale-100'}`}>
              🐱
            </div>
            <button 
              onClick={() => startListening("TOM")} 
              className={`px-16 py-8 rounded-full font-black text-3xl shadow-2xl transition-all ${isListening ? 'bg-green-800 scale-95' : 'bg-green-600 hover:scale-105'}`}
            >
              {isListening ? "I'M LISTENING..." : "TAP TO TALK"}
            </button>
            <button onClick={() => setScene("hub")} className="opacity-50 hover:opacity-100 underline">Exit</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;