import { useState } from "react";
import Intro from "./components/Intro";
import Home from "./components/Home";
import "./galaxy.css";

function App() {

  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro ? (
        <Intro onFinish={() => setShowIntro(false)} />
      ) : (
        <Home />
      )}
    </>
  );
}

export default App;