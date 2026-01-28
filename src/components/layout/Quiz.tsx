"use client";
import { useTranslations } from "next-intl";
import React, { useEffect, useMemo, useState } from "react";
import CustomButton from "../ui/Button";
import { useParams, useRouter } from "next/navigation";
import finding_1 from "@/assets/finding1.png";
import finding_2 from "@/assets/finding2.png";
import finding_3 from "@/assets/finding3.png";
import finding_4 from "@/assets/finding4.png";
import finding_5 from "@/assets/finding5.png";
import finding_6 from "@/assets/finding6.png";
import finding_7 from "@/assets/finding7.png";
import finding_8 from "@/assets/finding8.png";
import finding_9 from "@/assets/finding9.png";
import finding_10 from "@/assets/finding10.png";
import finding_11 from "@/assets/finding11.png";
import finding_12 from "@/assets/finding12.png";
import finding_13 from "@/assets/finding1.png";
import QuizModelViewer from "./QuizModelView";

import api from "@/lib/axios";
import { useUser } from "@/context/UserContext";

const Quiz = () => {
  const { user, refreshUser } = useUser();
  const t = useTranslations();
  const t1 = useTranslations("QuizPage");
  const router = useRouter();
  const { id } = useParams();
  const volcanoId = Number(id);
  // PNG fallback images (kept for potential future use)
  const findingImages = [
    finding_1,
    finding_2,
    finding_3,
    finding_4,
    finding_5,
    finding_6,
    finding_7,
    finding_8,
    finding_9,
    finding_10,
    finding_11,
    finding_12,
    finding_13,
  ];

  const findingNames = [
    t1("finding_1"),
    t1("finding_2"),
    t1("finding_3"),
    t1("finding_4"),
    t1("finding_5"),
    t1("finding_6"),
    t1("finding_7"),
    t1("finding_8"),
    t1("finding_9"),
    t1("finding_10"),
    t1("finding_11"),
    t1("finding_12"),
    t1("finding_13"),
  ];

  // const findingDimensions = [
  //   { width: "100%", height: "500px" }, // finding 1
  //   { width: "100%", height: "320px" }, // finding 2
  //   { width: "90%", height: "300px" }, // finding 3
  //   { width: "100%", height: "400px" }, // finding 4
  //   { width: "100%", height: "380px" }, // finding 5
  //   { width: "100%", height: "400px" }, // finding 6
  //   { width: "90%", height: "350px" }, // finding 7
  //   { width: "100%", height: "380px" }, // finding 8
  //   { width: "100%", height: "400px" }, // finding 9
  //   { width: "90%", height: "250px" }, // finding 10
  //   { width: "85%", height: "200px" }, // finding 11
  //   { width: "80%", height: "200px" }, // finding 12
  //   { width: "90%", height: "400px" }, // finding 13
  // ];

  // Helper to build absolute base URL (needed for loading GLB assets in both client & server rendering)
  const getBaseUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.origin;
    }
    return process.env.NEXTAUTH_URL || "http://localhost:3000";
  };

  const HOST = getBaseUrl();

  const isQuizPOI = true; // Now all POIs will have quizzes
  const [showFinding, setShowFinding] = useState(false);

  const handleContinue = async () => {
    try {
      await api.post("/poi-completed", {
        poiCompleted: volcanoId,
      });
      await refreshUser();
      router.push("/rutadefensacostest");
    } catch (err: any) {
      console.error("Failed to update:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    if (!user) return;
    const completedPOIs = Array.isArray(user?.completedPOIs)
      ? user.completedPOIs
      : [];
    const isPOICompleted = completedPOIs.includes(volcanoId);

    // Only redirect if this POI is already completed
    if (isPOICompleted) {
      router.push("/rutadefensacostest");
    }
  }, [volcanoId, router, user]);

  const volcanoQuestions = useMemo(
    () => ({
      1: [
        {
          title: t("Volcano1Quiz1.title"),
          options: [
            t("Volcano1Quiz1.option1"),
            t("Volcano1Quiz1.option2"),
            t("Volcano1Quiz1.option3"),
            t("Volcano1Quiz1.option4"),
          ],
          correct: t("Volcano1Quiz1.option1"),
        },
        {
          title: t("Volcano1Quiz2.title"),
          options: [
            t("Volcano1Quiz2.option1"),
            t("Volcano1Quiz2.option2"),
            t("Volcano1Quiz2.option3"),
            t("Volcano1Quiz2.option4"),
          ],
          correct: t("Volcano1Quiz2.option1"),
        },
        {
          title: t("Volcano1Quiz3.title"),
          options: [
            t("Volcano1Quiz3.option1"),
            t("Volcano1Quiz3.option2"),
            t("Volcano1Quiz3.option3"),
            t("Volcano1Quiz3.option4"),
          ],
          correct: t("Volcano1Quiz3.option1"),
        },
      ],
      2: [
        {
          title: t("Volcano2Quiz1.title"),
          options: [
            t("Volcano2Quiz1.option1"),
            t("Volcano2Quiz1.option2"),
            t("Volcano2Quiz1.option3"),
            t("Volcano2Quiz1.option4"),
          ],
          correct: t("Volcano2Quiz1.option1"),
        },
        {
          title: t("Volcano2Quiz2.title"),
          options: [
            t("Volcano2Quiz2.option1"),
            t("Volcano2Quiz2.option2"),
            t("Volcano2Quiz2.option3"),
            t("Volcano2Quiz2.option4"),
          ],
          correct: t("Volcano2Quiz2.option1"),
        },
        {
          title: t("Volcano2Quiz3.title"),
          options: [
            t("Volcano2Quiz3.option1"),
            t("Volcano2Quiz3.option2"),
            t("Volcano2Quiz3.option3"),
            t("Volcano2Quiz3.option4"),
          ],
          correct: t("Volcano2Quiz3.option1"),
        },
      ],
      3: [
        {
          title: t("Volcano3Quiz1.title"),
          options: [
            t("Volcano3Quiz1.option1"),
            t("Volcano3Quiz1.option2"),
            t("Volcano3Quiz1.option3"),
            t("Volcano3Quiz1.option4"),
          ],
          correct: t("Volcano3Quiz1.option1"),
        },
        {
          title: t("Volcano3Quiz2.title"),
          options: [
            t("Volcano3Quiz2.option1"),
            t("Volcano3Quiz2.option2"),
            t("Volcano3Quiz2.option3"),
            t("Volcano3Quiz2.option4"),
          ],
          correct: t("Volcano3Quiz2.option1"),
        },
        {
          title: t("Volcano3Quiz3.title"),
          options: [
            t("Volcano3Quiz3.option1"),
            t("Volcano3Quiz3.option2"),
            t("Volcano3Quiz3.option3"),
            t("Volcano3Quiz3.option4"),
          ],
          correct: t("Volcano3Quiz3.option1"),
        },
      ],
      4: [
        {
          title: t("Volcano4Quiz1.title"),
          options: [
            t("Volcano4Quiz1.option1"),
            t("Volcano4Quiz1.option2"),
            t("Volcano4Quiz1.option3"),
            t("Volcano4Quiz1.option4"),
          ],
          correct: t("Volcano4Quiz1.option1"),
        },
        {
          title: t("Volcano4Quiz2.title"),
          options: [
            t("Volcano4Quiz2.option1"),
            t("Volcano4Quiz2.option2"),
            t("Volcano4Quiz2.option3"),
            t("Volcano4Quiz2.option4"),
          ],
          correct: t("Volcano4Quiz2.option1"),
        },
        {
          title: t("Volcano4Quiz3.title"),
          options: [
            t("Volcano4Quiz3.option1"),
            t("Volcano4Quiz3.option2"),
            t("Volcano4Quiz3.option3"),
            t("Volcano4Quiz3.option4"),
          ],
          correct: t("Volcano4Quiz3.option1"),
        },
      ],
      5: [
        {
          title: t("Volcano5Quiz1.title"),
          options: [
            t("Volcano5Quiz1.option1"),
            t("Volcano5Quiz1.option2"),
            t("Volcano5Quiz1.option3"),
            t("Volcano5Quiz1.option4"),
          ],
          correct: t("Volcano5Quiz1.option1"),
        },
        {
          title: t("Volcano5Quiz2.title"),
          options: [
            t("Volcano5Quiz2.option1"),
            t("Volcano5Quiz2.option2"),
            t("Volcano5Quiz2.option3"),
            t("Volcano5Quiz2.option4"),
          ],
          correct: t("Volcano5Quiz2.option1"),
        },
        {
          title: t("Volcano5Quiz3.title"),
          options: [
            t("Volcano5Quiz3.option1"),
            t("Volcano5Quiz3.option2"),
            t("Volcano5Quiz3.option3"),
            t("Volcano5Quiz3.option4"),
          ],
          correct: t("Volcano5Quiz3.option1"),
        },
      ],
      6: [
        {
          title: t("Volcano6Quiz1.title"),
          options: [
            t("Volcano6Quiz1.option1"),
            t("Volcano6Quiz1.option2"),
            t("Volcano6Quiz1.option3"),
            t("Volcano6Quiz1.option4"),
          ],
          correct: t("Volcano6Quiz1.option1"),
        },
        {
          title: t("Volcano6Quiz2.title"),
          options: [
            t("Volcano6Quiz2.option1"),
            t("Volcano6Quiz2.option2"),
            t("Volcano6Quiz2.option3"),
            t("Volcano6Quiz2.option4"),
          ],
          correct: t("Volcano6Quiz2.option1"),
        },
        {
          title: t("Volcano6Quiz3.title"),
          options: [
            t("Volcano6Quiz3.option1"),
            t("Volcano6Quiz3.option2"),
            t("Volcano6Quiz3.option3"),
            t("Volcano6Quiz3.option4"),
          ],
          correct: t("Volcano6Quiz3.option1"),
        },
      ],
      7: [
        {
          title: t("Volcano7Quiz1.title"),
          options: [
            t("Volcano7Quiz1.option1"),
            t("Volcano7Quiz1.option2"),
            t("Volcano7Quiz1.option3"),
            t("Volcano7Quiz1.option4"),
          ],
          correct: t("Volcano7Quiz1.option1"),
        },
        {
          title: t("Volcano7Quiz2.title"),
          options: [
            t("Volcano7Quiz2.option1"),
            t("Volcano7Quiz2.option2"),
            t("Volcano7Quiz2.option3"),
            t("Volcano7Quiz2.option4"),
          ],
          correct: t("Volcano7Quiz2.option1"),
        },
        {
          title: t("Volcano7Quiz3.title"),
          options: [
            t("Volcano7Quiz3.option1"),
            t("Volcano7Quiz3.option2"),
            t("Volcano7Quiz3.option3"),
            t("Volcano7Quiz3.option4"),
          ],
          correct: t("Volcano7Quiz3.option1"),
        },
      ],
      8: [
        {
          title: t("Volcano8Quiz1.title"),
          options: [
            t("Volcano8Quiz1.option1"),
            t("Volcano8Quiz1.option2"),
            t("Volcano8Quiz1.option3"),
            t("Volcano8Quiz1.option4"),
          ],
          correct: t("Volcano8Quiz1.option1"),
        },
        {
          title: t("Volcano8Quiz2.title"),
          options: [
            t("Volcano8Quiz2.option1"),
            t("Volcano8Quiz2.option2"),
            t("Volcano8Quiz2.option3"),
            t("Volcano8Quiz2.option4"),
          ],
          correct: t("Volcano8Quiz2.option1"),
        },
        {
          title: t("Volcano8Quiz3.title"),
          options: [
            t("Volcano8Quiz3.option1"),
            t("Volcano8Quiz3.option2"),
            t("Volcano8Quiz3.option3"),
            t("Volcano8Quiz3.option4"),
          ],
          correct: t("Volcano8Quiz3.option1"),
        },
      ],
      9: [
        {
          title: t("Volcano9Quiz1.title"),
          options: [
            t("Volcano9Quiz1.option1"),
            t("Volcano9Quiz1.option2"),
            t("Volcano9Quiz1.option3"),
            t("Volcano9Quiz1.option4"),
          ],
          correct: t("Volcano9Quiz1.option1"),
        },
        {
          title: t("Volcano9Quiz2.title"),
          options: [
            t("Volcano9Quiz2.option1"),
            t("Volcano9Quiz2.option2"),
            t("Volcano9Quiz2.option3"),
            t("Volcano9Quiz2.option4"),
          ],
          correct: t("Volcano9Quiz2.option1"),
        },
        {
          title: t("Volcano9Quiz3.title"),
          options: [
            t("Volcano9Quiz3.option1"),
            t("Volcano9Quiz3.option2"),
            t("Volcano9Quiz3.option3"),
            t("Volcano9Quiz3.option4"),
          ],
          correct: t("Volcano9Quiz3.option1"),
        },
      ],
      10: [
        {
          title: t("Volcano10Quiz1.title"),
          options: [
            t("Volcano10Quiz1.option1"),
            t("Volcano10Quiz1.option2"),
            t("Volcano10Quiz1.option3"),
            t("Volcano10Quiz1.option4"),
          ],
          correct: t("Volcano10Quiz1.option1"),
        },
        {
          title: t("Volcano10Quiz2.title"),
          options: [
            t("Volcano10Quiz2.option1"),
            t("Volcano10Quiz2.option2"),
            t("Volcano10Quiz2.option3"),
            t("Volcano10Quiz2.option4"),
          ],
          correct: t("Volcano10Quiz2.option1"),
        },
        {
          title: t("Volcano10Quiz3.title"),
          options: [
            t("Volcano10Quiz3.option1"),
            t("Volcano10Quiz3.option2"),
            t("Volcano10Quiz3.option3"),
            t("Volcano10Quiz3.option4"),
          ],
          correct: t("Volcano10Quiz3.option1"),
        },
      ],
      11: [
        {
          title: t("Volcano11Quiz1.title"),
          options: [
            t("Volcano11Quiz1.option1"),
            t("Volcano11Quiz1.option2"),
            t("Volcano11Quiz1.option3"),
            t("Volcano11Quiz1.option4"),
          ],
          correct: t("Volcano11Quiz1.option1"),
        },
        {
          title: t("Volcano11Quiz2.title"),
          options: [
            t("Volcano11Quiz2.option1"),
            t("Volcano11Quiz2.option2"),
            t("Volcano11Quiz2.option3"),
            t("Volcano11Quiz2.option4"),
          ],
          correct: t("Volcano11Quiz2.option1"),
        },
        {
          title: t("Volcano11Quiz3.title"),
          options: [
            t("Volcano11Quiz3.option1"),
            t("Volcano11Quiz3.option2"),
            t("Volcano11Quiz3.option3"),
            t("Volcano11Quiz3.option4"),
          ],
          correct: t("Volcano11Quiz3.option1"),
        },
      ],
      12: [
        {
          title: t("Volcano12Quiz1.title"),
          options: [
            t("Volcano12Quiz1.option1"),
            t("Volcano12Quiz1.option2"),
            t("Volcano12Quiz1.option3"),
            t("Volcano12Quiz1.option4"),
          ],
          correct: t("Volcano12Quiz1.option1"),
        },
        {
          title: t("Volcano12Quiz2.title"),
          options: [
            t("Volcano12Quiz2.option1"),
            t("Volcano12Quiz2.option2"),
            t("Volcano12Quiz2.option3"),
            t("Volcano12Quiz2.option4"),
          ],
          correct: t("Volcano12Quiz2.option1"),
        },
        {
          title: t("Volcano12Quiz3.title"),
          options: [
            t("Volcano12Quiz3.option1"),
            t("Volcano12Quiz3.option2"),
            t("Volcano12Quiz3.option3"),
            t("Volcano12Quiz3.option4"),
          ],
          correct: t("Volcano12Quiz3.option1"),
        },
      ],
      13: [
        {
          title: t("Volcano13Quiz1.title"),
          options: [
            t("Volcano13Quiz1.option1"),
            t("Volcano13Quiz1.option2"),
            t("Volcano13Quiz1.option3"),
            t("Volcano13Quiz1.option4"),
          ],
          correct: t("Volcano13Quiz1.option1"),
        },
        {
          title: t("Volcano13Quiz2.title"),
          options: [
            t("Volcano13Quiz2.option1"),
            t("Volcano13Quiz2.option2"),
            t("Volcano13Quiz2.option3"),
            t("Volcano13Quiz2.option4"),
          ],
          correct: t("Volcano13Quiz2.option1"),
        },
        {
          title: t("Volcano13Quiz3.title"),
          options: [
            t("Volcano13Quiz3.option1"),
            t("Volcano13Quiz3.option2"),
            t("Volcano13Quiz3.option3"),
            t("Volcano13Quiz3.option4"),
          ],
          correct: t("Volcano13Quiz3.option1"),
        },
      ],
    }),
    [t],
  );

  const allQuestions =
    volcanoQuestions[volcanoId as keyof typeof volcanoQuestions] || [];

  const labels = ["A", "B", "C", "D"];
  const [texts, setTexts] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [showPlayAgain, setShowPlayAgain] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<any | null>(null);
  const [backgroundAudio, setBackgroundAudio] =
    useState<HTMLAudioElement | null>(null);

  // Start background music when quiz is loaded
  useEffect(() => {
    if (selectedQuestion && !selected && !showPlayAgain) {
      const audio = new Audio("/button-sounds/15.mp3");
      audio.loop = true;
      audio
        .play()
        .catch((error) =>
          console.error("Error playing background music:", error),
        );
      setBackgroundAudio(audio);

      // Cleanup function to stop audio when component unmounts or when an answer is selected
      return () => {
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
      };
    }
  }, [selectedQuestion, selected, showPlayAgain]);

  // Stop background music when an answer is selected
  useEffect(() => {
    if (selected && backgroundAudio) {
      backgroundAudio.pause();
      backgroundAudio.currentTime = 0;
      setBackgroundAudio(null);
    }
  }, [selected, backgroundAudio]);

  function shuffleArray(array: any[]) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  const playSound = (isCorrect: boolean) => {
    // Stop background audio if it's still playing
    if (backgroundAudio) {
      backgroundAudio.pause();
      backgroundAudio.currentTime = 0;
      setBackgroundAudio(null);
    }

    const audio = new Audio(`/button-sounds/${isCorrect ? "12" : "13"}.mp3`);
    audio.play().catch((error) => console.error("Error playing sound:", error));
  };

  const handleSelect = (optionText: string) => {
    setSelected(optionText);
    const isCorrect = optionText === selectedQuestion.correct;

    playSound(isCorrect);

    if (isCorrect) {
      setTimeout(() => {
        setQuizCompleted(true);
      }, 800);
    } else {
      setTimeout(() => {
        setShowPlayAgain(true);
      }, 1000);
    }
  };

  const handlePlayAgain = () => {
    if (selectedQuestion) {
      setTexts(shuffleArray(selectedQuestion.options));
    }
    setSelected(null);
    setShowPlayAgain(false);
  };

  const getOptionClass = (optionText: string) => {
    if (!selected) return "bg-white border-[#C9C9C9] text-backblack font-bold";

    if (
      selected === selectedQuestion.correct &&
      optionText === selectedQuestion.correct
    ) {
      return "bg-[#2CB000] border-[#2CB000] text-white font-bold";
    }

    if (selected !== selectedQuestion.correct) {
      if (optionText === selected)
        return "bg-[#ED1C24] border-[#ED1C24] text-white font-bold";
      if (optionText === selectedQuestion.correct)
        return "bg-[#2CB000] border-[#2CB000] text-white font-bold";
    }

    return "bg-[#F5F2F8] border-[#B6B3B9] text-backblack font-bold";
  };

  useEffect(() => {
    if (allQuestions.length > 0) {
      const randomQ =
        allQuestions[Math.floor(Math.random() * allQuestions.length)];
      setSelectedQuestion(randomQ);
      setTexts(shuffleArray(randomQ.options));
    }
  }, [allQuestions]);

  useEffect(() => {
    if (quizCompleted) {
      const storeQuizStatus = async () => {
        try {
          await api.post("/poi-completed", {
            poiCompleted: volcanoId,
          });
        } catch (err: any) {
          console.error("Failed to update:", err.response?.data || err.message);
        }
      };
      storeQuizStatus();
    }
  }, [quizCompleted, volcanoId]);

  if (showFinding) {
    return (
      <div className="flex flex-col h-[100vh] items-center bg-backblack">
        {findingImages[volcanoId - 1] && (
          <div
            className=" h-[500px] w-full mb-4 flex justify-center items-center"
            style={{
              backgroundImage: `url(/backgroundImage/${volcanoId}.jpg)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <QuizModelViewer
              modelPath={`${HOST}/models/${volcanoId}.glb`}
              // width={findingDimensions[volcanoId - 1]?.width || "400%"}
              // height={findingDimensions[volcanoId - 1]?.height || "400px"}
            />
          </div>
        )}
        <h1 className="text-[26px] font-extrabold text-white mb-12 text-center px-5">
          {findingNames[volcanoId - 1]}
        </h1>
        <div className="w-full px-5">
          <CustomButton onClick={handleContinue}>{t1("button")}</CustomButton>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className=" bg-backblack pb-16">
        {findingImages[volcanoId - 1] && (
          <div
            className="h-[500px] w-full mb-4 flex justify-center items-center"
            style={{
              backgroundImage: `url(/backgroundImage/${volcanoId}.jpg)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="w-full h-full flex justify-center items-center">
              <QuizModelViewer modelPath={`${HOST}/models/${volcanoId}.glb`} />
            </div>
          </div>
        )}
        <h1 className="text-[26px] font-extrabold mt-10 text-white text-center px-5 ">
          {findingNames[volcanoId - 1]}
        </h1>
        <div
          className={`w-full px-5 pb-5 ${
            volcanoId === 3 ? "mt-10" : "mt-[60px]"
          }`}
        >
          <CustomButton onClick={handleContinue}>
            {volcanoId === 12 ? t1("button") : t1("button")}
          </CustomButton>
        </div>
      </div>
    );
  }

  if (isQuizPOI && allQuestions.length === 0) {
    return <p className="text-center mt-10">No quiz found for this volcano.</p>;
  }

  return (
    <div className="flex flex-col bg-skin h-[80vh]">
      <div className="bg-white w-full flex h-[242px] items-center justify-center">
        <h1 className="text-4xl font-bold text-backblack text-center px-[38px] py-5">
          {selectedQuestion?.title}
        </h1>
      </div>
      <div className="flex flex-col gap-4 px-4 w-full pt-10 pb-20">
        {labels.map((label, index) => (
          <div
            key={index}
            onClick={() => !selected && handleSelect(texts[index])}
            className={`min-h-[56px] rounded-[36px] border-2 px-4 py-3 flex items-center gap-4 cursor-pointer transition-colors duration-300 ${getOptionClass(
              texts[index],
            )}`}
          >
            <div
              className={`font-bold flex items-center justify-center
    ${
      !selected
        ? "text-green"
        : selected === selectedQuestion.correct
          ? texts[index] === selected
            ? "text-white"
            : "text-green"
          : texts[index] === selected ||
              texts[index] === selectedQuestion.correct
            ? "text-white"
            : "text-green"
    }
  `}
            >
              {label}
            </div>
            <h1 className="text-sm">{texts[index]}</h1>
          </div>
        ))}
      </div>
      <div className="px-5 w-full bg-skin">
        {showPlayAgain && (
          <CustomButton onClick={handlePlayAgain} className="w-full mb-5">
            {t1("try_again")}
          </CustomButton>
        )}
      </div>
    </div>
  );
};

export default Quiz;
