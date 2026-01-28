"use client";
import { useState, useEffect } from "react";
import GameSelector from "@/components/layout/GameSelector";
import HomePage from "@/components/layout/Web";
import RutaLogin from "@/components/layout/RutaLogin";
import Description from "@/components/layout/Description";
import RutaPopup from "@/components/layout/RutaPopup";

// Game data structure
export interface GameData {
  id: number;
  title: string;
  description: string;
  duration: string;
  location: string;
  image: string;
}

const gamesData: GameData[] = [
  {
    id: 1,
    title: "Joc 1",
    description: "Una experiència familiar per descobrir els vestigis de la Guerra Civil al llarg del litoral. A través del joc, la realitat augmentada i la narració de la Miula, la costa es converteix en un espai per observar, entendre i compartir històries del passat.",
    duration: "50min.",
    location: "Sitges",
    image: "mgame01.png"
  },
  {
    id: 2,
    title: "Joc 2",
    description: "Aenean condimentum massa ac enim lacinia, ac porttitor justo commodo. Sed luctus a sem nec sollicitudin. Sed mauris mi, fringilla non vulputate non, suscipit eu nisl.",
    duration: "45min.",
    location: "Barcelona",
    image: "mgame02.png"
  },
  {
    id: 3,
    title: "Joc 3",
    description: "Estem creant noves experiències vinculades al territori, la memòria i el patrimoni. Estigueu atents i atentes als propers llançaments.",
    duration: "60min.",
    location: "Tarragona",
    image: "mgame03.png"
  },
  {
    id: 4,
    title: "Joc 4",
    description: "Estem creant noves experiències vinculades al territori, la memòria i el patrimoni. Estigueu atents i atentes als propers llançaments.",
    duration: "55min.",
    location: "Vilanova",
    image: "mgame03.png"
  },
];

const page = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showGameSelector, setShowGameSelector] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [selectedGame, setSelectedGame] = useState<GameData | null>(null);
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    // Check if it's the first visit
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setShowPopup(true);
      const timer = setTimeout(() => {
        handlePopupClose();
        localStorage.setItem('hasVisited', 'true');
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setShowLogin(true);
      setIsFirstVisit(false);
    }
  }, []);

  const handlePopupClose = () => {
    setShowPopup(false);
    if (isFirstVisit) {
      setShowLogin(true);
    }
  };

  const handleLogin = () => {
    setShowLogin(false);
    setShowGameSelector(true);
  };

  const handleGameSelect = (gameId: number) => {
    const game = gamesData.find(g => g.id === gameId);
    console.log("Selected game ID:", gameId);
    console.log("Found game:", game);
    if (game) {
      setSelectedGame(game);
      setShowGameSelector(false);
      setShowDescription(true);
    } else {
      console.error("Game not found with ID:", gameId);
    }
  };

  const handleBackFromDescription = () => {
    setShowDescription(false);
    setShowGameSelector(true);
  };

  const handleBackFromGameSelector = () => {
    setShowGameSelector(false);
    setShowLogin(true);
  };

  const handleBackFromLogin = () => {
    setShowLogin(false);
    setShowPopup(true);
  };

  const handlePlay = () => {
    // Handle play button - you can navigate to game or show message
    console.log("Starting game:", selectedGame?.title);
    // Add your navigation logic here
  };

  return (
    <>
      {/* <div className="block desktop:hidden">
        {showPopup && <RutaPopup onClose={handlePopupClose} />}
        {showLogin && <RutaLogin onLogin={handleLogin} onBack={handleBackFromLogin} />}
        {showGameSelector && (
          <GameSelector 
            onGameSelect={handleGameSelect} 
            onBack={handleBackFromGameSelector}
            games={gamesData}
          />
        )}
        {showDescription && selectedGame && (
          <Description 
            game={selectedGame} 
            onBack={handleBackFromDescription}
            onPlay={handlePlay}
          />
        )}
      </div> */}
      <div className="hidden desktop:block">
        <HomePage />
      </div>
    </>
  );
};

export default page;
