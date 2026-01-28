// "use client";

// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import Dashboard from "@/components/layout/Dashboard";
// import DashboardWrapper from "@/layouts/DashboardWrapper";
// import { useState, useEffect } from "react";
// import GameSelector from "@/components/layout/GameSelector";
// import HomePage from "@/components/layout/Web";
// import RutaLogin from "@/components/layout/RutaLogin";
// import RutaIntroduction from "@/components/layout/RutaIntroduction";
// import Description from "@/components/layout/Description";
// import RutaPopup from "@/components/layout/RutaPopup";
// import ComingSoon from "@/components/layout/ComingSoon";
// import CustomButton from "@/components/ui/Button";

// // Game data structure
// export interface GameData {
//   id: number;
//   title: string;
//   description: string;
//   duration: string;
//   location: string;
//   image: string;
// }

// const gamesData: GameData[] = [
//   {
//     id: 1,
//     title: "Joc 1",
//     description:
//       "Una experiència familiar per descobrir els vestigis de la Guerra Civil al litoral de Sitges, Vilanova i la Geltrú, Cubelles, Cunit, Calafell i El Vendrell.",
//     duration: "50min.",
//     location: "Sitges",
//     image: "mgame01.png",
//   },
//   {
//     id: 2,
//     title: "Joc 2",
//     description:
//       "Estem creant noves experiències vinculades al territori, la memòria i el patrimoni. Estigueu atents i atentes als propers llançaments.",
//     duration: "60min.",
//     location: "Tarragona",
//     image: "mgame03.png",
//   },
//   {
//     id: 3,
//     title: "Joc 3",
//     description:
//       "Estem creant noves experiències vinculades al territori, la memòria i el patrimoni. Estigueu atents i atentes als propers llançaments.",
//     duration: "55min.",
//     location: "Vilanova",
//     image: "mgame03.png",
//   },
// ];

// export default function Home() {
//   const { data: session, status } = useSession();
//   const router = useRouter();
  
//   useEffect(() => {
//     if (status === 'authenticated') {
//       router.push('/dashboard');
//     }
//   }, [status, router]);

//   const [showPopup, setShowPopup] = useState(false);
//   const [isFirstVisit, setIsFirstVisit] = useState(true);
//   const [showLogin, setShowLogin] = useState(false);
//   const [showGameSelector, setShowGameSelector] = useState(false);
//   const [showDescription, setShowDescription] = useState(false);
//   const [showComingSoon, setShowComingSoon] = useState(false);
//   const [selectedGame, setSelectedGame] = useState<GameData | null>(null);
//   const [showDashboard, setShowDashboard] = useState(false);
//   const [showIntroduction, setShowIntroduction] = useState(false);
//   const [showCookies, setShowCookies] = useState(false);

//   useEffect(() => {
//     const accepted = localStorage.getItem("cookiesAccepted");
//     if (!accepted) {
//       setShowCookies(true);
//     }
//   }, []);

//   const handleAccept = () => {
//     localStorage.setItem("cookiesAccepted", "true");
//     setShowCookies(false);
//   };

//   // Handles closing the initial popup
//   const handlePopupClose = () => {
//     setShowPopup(false);
//     if (isFirstVisit) {
//       setShowLogin(true);
//       localStorage.setItem("stage", "login");
//     }
//   };

//   // Restore last screen or run first-visit logic
//   useEffect(() => {
//     const savedStage = localStorage.getItem("stage");
//     const savedGameId = localStorage.getItem("selectedGameId");

//     if (savedStage) {
//       // Skip first-visit flow and restore previous screen
//       setIsFirstVisit(false);
//       setShowPopup(false);
//       setShowLogin(savedStage === "login");
//       setShowGameSelector(savedStage === "selector");
//       setShowDescription(savedStage === "description");
//       setShowIntroduction(savedStage === "introduction");

//       if (
//         (savedStage === "description" ||
//           savedStage === "comingSoon" ||
//           savedStage === "introduction") &&
//         savedGameId
//       ) {
//         const game = gamesData.find((g) => g.id === parseInt(savedGameId, 10));
//         if (game) {
//           setSelectedGame(game);
//           if (savedStage === "comingSoon") {
//             setShowComingSoon(true);
//             setShowDescription(false);
//             setShowIntroduction(false);
//           } else if (savedStage === "introduction") {
//             setShowIntroduction(true);
//             setShowDescription(false);
//             setShowComingSoon(false);
//           } else {
//             setShowDescription(true);
//             setShowIntroduction(false);
//             setShowComingSoon(false);
//           }
//         }
//       }
//       return;
//     }

//     // --- original first-visit logic ---
//     const hasVisited = localStorage.getItem("hasVisited");
//     if (!hasVisited) {
//       setShowPopup(true);
//       const timer = setTimeout(() => {
//         handlePopupClose();
//         localStorage.setItem("hasVisited", "true");
//       }, 3000);
//       return () => clearTimeout(timer);
//     } else {
//       setShowLogin(true);
//       setIsFirstVisit(false);
//     }
//   }, []);

//   // Show loading state while checking session
//   if (status === "loading") {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="w-8 h-8 border-2 border-[#A82B00] border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   // If not logged in, show web page content
//   if (status === "unauthenticated" || !session) {
//     const handleLogin = () => {
//       setShowLogin(false);
//       setShowGameSelector(true);
//       localStorage.setItem("stage", "selector");
//     };

//     const handleGameSelect = (gameId: number) => {
//       const game = gamesData.find((g) => g.id === gameId);
//       console.log("Selected game ID:", gameId);
//       console.log("Found game:", game);
//       if (game) {
//         setSelectedGame(game);
//         localStorage.setItem("selectedGameId", String(game.id));
//         localStorage.setItem("stage", "description");
//         setShowGameSelector(false);
//         setShowDescription(true);
//       } else {
//         console.error("Game not found with ID:", gameId);
//       }
//     };

//     const handleBackFromDescription = () => {
//       setShowDescription(false);
//       setShowGameSelector(true);
//       localStorage.setItem("stage", "selector");
//     };

//     const handleBackFromGameSelector = () => {
//       setShowGameSelector(false);
//       setShowLogin(true);
//       localStorage.setItem("stage", "login");
//     };

//     const handleBackFromLogin = () => {
//       setShowLogin(false);
//       setShowPopup(true);
//       localStorage.setItem("stage", "popup");
//     };

//     const handlePlay = () => {
//       if (showDashboard) {
//         // If showDashboard is true, redirect to /dashboard
//         window.location.href = "/dashboard";
//       } else {
//         // Show RutaIntroduction component
//         setShowDescription(false);
//         setShowIntroduction(true);
//         localStorage.setItem("stage", "introduction");
//       }
//     };

//     const handleBackFromIntroduction = () => {
//       setShowIntroduction(false);
//       setShowDescription(true);
//       localStorage.setItem("stage", "description");
//     };

//     // const handlePlay = () => {
//     //   // Navigate to ComingSoon component
//     //   setShowDescription(false);
//     //   setShowComingSoon(true);
//     //   localStorage.setItem("stage", "comingSoon");
//     // };

//     const handleBackFromComingSoon = () => {
//       setShowComingSoon(false);
//       setShowIntroduction(true);
//       localStorage.setItem("stage", "introduction");
//     };

//     return (
//       <>
//         <div className="block desktop:hidden tablet:hidden">
//           {showPopup && <RutaPopup onClose={handlePopupClose} />}
//           {showLogin && (
//             <RutaLogin onLogin={handleLogin} onBack={handleBackFromLogin} />
//           )}
//           {showGameSelector && (
//             <GameSelector
//               onGameSelect={handleGameSelect}
//               onBack={handleBackFromGameSelector}
//               games={gamesData}
//             />
//           )}
//           {showDescription && selectedGame && (
//             <Description
//               game={selectedGame}
//               onBack={handleBackFromDescription}
//               onPlay={handlePlay}
//             />
//           )}
//           {showIntroduction && (
//             <RutaIntroduction
//               onLogin={() => {
//                 setShowIntroduction(false);
//                 setShowComingSoon(true);
//                 localStorage.setItem("stage", "comingSoon");
//               }}
//               onBack={handleBackFromIntroduction}
//             />
//           )}
//           {showComingSoon && selectedGame && (
//             <ComingSoon
//               games={gamesData}
//               onGameSelect={(gameId) => {
//                 // Handle game selection in ComingSoon if needed
//                 console.log("Game selected from ComingSoon:", gameId);
//               }}
//               onBack={handleBackFromComingSoon}
//             />
//           )}
//         </div>
//         <div className="hidden desktop:block tablet:block">
//           <HomePage />
//         </div>
//         {showCookies && (
//           <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white px-4 py-3 flex items-center justify-between shadow-md z-50">
//             <p className="text-sm">
//               We use cookies to improve your experience. By using our site, you
//               agree to our cookie policy.
//             </p>
//             <div className="flex flex-col gap-2">
//               <CustomButton className="!text-xs !px-8" onClick={handleAccept}>
//                 Accept
//               </CustomButton>
//               <CustomButton
//                 className="!text-xs bg-red-600 !px-8"
//                 onClick={handleAccept}
//               >
//                 Decline
//               </CustomButton>
//             </div>
//           </div>
//         )}
//       </>
//     );
//   }

//   // If logged in, show Dashboard
//   // return (
//   //   <>
//   //     <DashboardWrapper>
//   //       <Dashboard />
//   //     </DashboardWrapper>
//   //   </>
//   // );
// }
