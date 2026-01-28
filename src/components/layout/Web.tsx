"use client";
import Image from "next/image";
import { FaLinkedin, FaInstagram, FaXTwitter } from "react-icons/fa6";
import Flogo from "@/assets/webfooterlogo.svg";
import Hlogo from "@/assets/webheaderlogo.svg";
import logo1 from "@/assets/webl1.svg";
import logo2 from "@/assets/webl2.svg";
import logo3 from "@/assets/webl3.svg";
import logo4 from "@/assets/webl4.svg";
import logo5 from "@/assets/webl5.svg";
import phone from "@/assets/Phone.svg";
import mail from "@/assets/Mail.svg";
import image1 from "@/assets/image 5.png";
import image2 from "@/assets/AR icon.svg";
import InlineModelViewer from "./InlineModelViewer";
import line from "@/assets/BALLOON_LINE.svg";
import game1 from "@/assets/game01.png";
import game2 from "@/assets/game02.png";
import game3 from "@/assets/game03.png";
import { Typewriter } from "../ui/Typewriter";
import React, { useEffect, useRef, useState } from "react";
import { BsMouse } from "react-icons/bs";
import Logo from "@/assets/headertext.svg";
import { useLocale } from "next-intl";
import { FaFacebook, FaTiktok, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [showAudioPrompt, setShowAudioPrompt] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState<boolean | null>(null);
  const [showDescription, setShowDescription] = useState(false);
  const [showMobilePopup, setShowMobilePopup] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const locale = useLocale() as string;
  const router = useRouter();

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  const handlePlayClick = () => {
    setShowMobilePopup(true);
  };

  useEffect(() => {
    const sections = ["about-us", "experiences", "how-it-works", "contact-us"];

    const observerOptions = {
      root: null,
      rootMargin: "-100px 0px -60% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Find the section with the highest intersection ratio
      let maxRatio = 0;
      let activeId = "";

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          activeId = entry.target.id;
        }
      });

      if (activeId) {
        setActiveSection(activeId);
      }
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // Wait for DOM to be ready
    const timeoutId = setTimeout(() => {
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          observer.observe(element);
        }
      });

      // Set initial active section based on scroll position
      const checkInitialSection = () => {
        const scrollPosition = window.scrollY + 150;
        let found = false;

        for (let i = sections.length - 1; i >= 0; i--) {
          const element = document.getElementById(sections[i]);
          if (element && element.offsetTop <= scrollPosition) {
            setActiveSection(sections[i]);
            found = true;
            break;
          }
        }

        if (!found && sections.length > 0) {
          setActiveSection(sections[0]);
        }
      };

      checkInitialSection();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial scroll position

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    // Set up audio but don't play automatically
    if (audioRef.current) {
      audioRef.current.volume = 0.8; // Set volume to 80%
    }

    // Cleanup function to pause audio when component unmounts
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  useEffect(() => {
    // Play or pause audio based on user's choice
    if (audioRef.current) {
      if (audioEnabled === true) {
        const playPromise = audioRef.current.play();
        playPromise.catch((error) => {
          console.error("Audio playback failed:", error);
        });
      } else if (audioEnabled === false) {
        audioRef.current.pause();
      }
    }
  }, [audioEnabled]);

  const handleAudioChoice = (choice: boolean) => {
    setAudioEnabled(choice);
    setShowAudioPrompt(false);
  };

  return (
    <main
      className="w-full bg-white relative"
      style={{ scrollBehavior: "smooth" }}
    >
      {/* Audio Control Button */}
      {!showAudioPrompt && (
        <button
          onClick={() => setAudioEnabled(!audioEnabled)}
          className="fixed bottom-4 right-4 z-50 p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors transition-all duration-400 ease-in-out hover:brightness-150 active:brightness-150 active:-translate-y-[5px]"
          aria-label={audioEnabled ? "Mute audio" : "Unmute audio"}
        >
          {audioEnabled ? <FaVolumeUp size={24} /> : <FaVolumeMute size={24} />}
        </button>
      )}
      <div
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
          isScrolled ? "shadow-md" : ""
        }`}
      >
        <div className="flex justify-between mx-auto max-w-[1200px] py-4">
          <div>
            <Image
              src={Hlogo}
              alt="logo"
              className="desktop:ml-0 tablet:ml-5"
            />
          </div>
          <div className="flex desktop:gap-[47px] tablet:gap-[20px] items-center font-semibold text-base desktop:mr-0 tablet:mr-5">
            <a
              href="#about-us"
              onClick={(e) => handleNavClick(e, "#about-us")}
              className={activeSection === "about-us" ? "text-[#A82B00]" : ""}
            >
              Presentació
            </a>
            <a
              href="#experiences"
              onClick={(e) => handleNavClick(e, "#experiences")}
              className={
                activeSection === "experiences" ? "text-[#A82B00]" : ""
              }
            >
              Experiències
            </a>
            <a
              href="#how-it-works"
              onClick={(e) => handleNavClick(e, "#how-it-works")}
              className={
                activeSection === "how-it-works" ? "text-[#A82B00]" : ""
              }
            >
              Com funciona?
            </a>
            <a
              href="#contact-us"
              onClick={(e) => handleNavClick(e, "#contact-us")}
              className={activeSection === "contact-us" ? "text-[#A82B00]" : ""}
            >
              Contacte
            </a>
          </div>
        </div>
      </div>

      {/* Audio Prompt Buttons */}
      {showAudioPrompt && (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-lg shadow-lg">
          <button
            onClick={() => handleAudioChoice(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex-1 min-w-[150px] transition-all duration-400 ease-in-out hover:brightness-150 active:brightness-150 active:-translate-y-[5px]"
          >
            <FaVolumeUp /> Activar l’àudio
          </button>
          <button
            onClick={() => handleAudioChoice(false)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex-1 min-w-[150px] transition-all duration-400 ease-in-out hover:brightness-150 active:brightness-150 active:-translate-y-[5px]"
          >
            <FaVolumeMute /> No, gràcies
          </button>
        </div>
      )}

      <div id="about-us" className="bg-white">
        <div className="flex justify-center mt-12">
          <p className="text-base text-[#160500] leading-[24px] italic max-w-[600px] text-center z-10 min-h-[120px]">
            <Typewriter
              text="Hola! Soc la Miula, el mussol de la memòria, i seré la vostra guia. Des de fa molt de temps sobrevolo pobles, camins i paisatges, i guardo les històries que s’amaguen al nostre territori.
              Els camins de la memòria us convida a recórrer espais reals per entendre millor el nostre passat recent. Cada camí ens acosta a moments, llocs i vivències que han deixat empremta, encara que no sempre siguin visibles a primer cop d’ull.
              A través d’aquestes rutes descobrireu com la història va marcar la vida quotidiana de moltes persones: el que es va construir, el que es va defensar, però també el que es va patir, el que es va adaptar i, sovint, el que es va haver de viure en silenci.
              No només escoltareu històries: haureu de participar-hi. Al llarg dels camins us proposaré reptes interactius amb realitat augmentada i preguntes que us ajudaran a observar millor cada espai i a entendre què hi va passar. A mesura que avanceu, podreu aconseguir objectes col·leccionables digitals vinculats als indrets que descobriu.
              Cada ruta posa el focus en un aspecte diferent de la memòria democràtica, però totes comparteixen una mateixa manera de mirar: caminar, observar, jugar i reflexionar. No es tracta només d’arribar a un lloc, sinó de viure’l i entendre per què forma part de la nostra memòria col·lectiva.
              Si m’acompanyeu, us guiaré pels diferents camins, us explicaré què va passar en cada indret i us ajudaré a descobrir com el passat encara dialoga amb el present.
              Quan vulgueu, podeu triar per quin camí voleu començar.
              Fins aviat!"
              speed={100}
              wordsPerPage={40}
              pauseAfterPage={1500}
              loop={true}
              className="text-lg leading-relaxed"
            />
            <audio
              ref={audioRef}
              src={`/audios/audio.mp3`}
              preload="metadata"
              style={{ display: "none" }}
              loop
            />
          </p>
        </div>
        <div className="relative">
          <div
            className="flex flex-col items-center justify-center"
            style={{ lineHeight: 0, margin: 0, padding: 0 }}
          >
            <div className="mt-[-65px] translate-y-[70px] z-10">
              <Image src={line} alt="line" className=" " />
            </div>
            <div className="">
              <InlineModelViewer
                modelPath="/models/MUSSOL_ANIMACION.glb"
                width="800px"
                height="550px"
                audioEnabled={audioEnabled === true}
              />
            </div>
          </div>
          <div className="flex justify-center pb-10">
            <div
              className="absolute top-[450px] inline-flex justify-center items-center gap-4 h-[40px] rounded-[24px] mb-10 pl-4 pr-6 z-10"
              style={{ boxShadow: "0px 0px 8px 0px #0000001A" }}
            >
              <BsMouse className="w-[16px] text-[#160500]" />
              <p className="text-[#A82B00] italic text-sm">
                Fes servir el ratolí per veure la Miula des de diferents angles.
                Clica i arrossega per girar-la o utilitza la roda per fer zoom.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        id="experiences"
        className="bg-[#ECE7E3] min-h-[600px] mx-auto"
        style={{
          backgroundImage: "url('/Vector.svg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="pt-[63px]">
            <h1 className="m text-center text-4xl font-semibold">
              Aquestes són les nostres experiències
            </h1>
          </div>
          <div className="desktop:flex-none tablet:flex justify-center ">
            <div className="grid desktop:grid-cols-2 tablet:grid-cols-1 gap-6 mt-[70px]">
              <div className="w-[384px] h-[328px] bg-white rounded-[12px]">
                <div
                  className="h-[152px] rounded-t-[12px] "
                  style={{ backgroundImage: "url('/NavBar.svg')" }}
                >
                  <Image src={Logo} alt="Logo" className="pt-[94px] ml-10" />
                  <h1 className="text-[#A82B00] text-base font-semibold mt-[35px] mx-4">
                    Ruta de Defensa de Costes
                  </h1>
                  <p className="text-[#160500] text-base mx-4">
                    Una experiència familiar per descobrir els vestigis de la
                    Guerra Civil al litoral de Sitges, Vilanova i la Geltrú,
                    Cubelles, Cunit, Calafell i El Vendrell.
                  </p>
                  <div className="flex justify-end mr-5">
                    <button
                      onClick={toggleDescription}
                      className="text-[#A82B00] font-medium hover:underline"
                    >
                      Veure més ...
                    </button>
                  </div>
                </div>

                {/* Description Popup */}
                {showDescription && (
                  <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    onClick={toggleDescription}
                  >
                    <div
                      className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 relative"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={toggleDescription}
                        className="absolute top-4 right-6 text-3xl text-gray-600 hover:text-gray-900"
                      >
                        &times;
                      </button>
                      <h1 className="text-3xl font-bold text-[#A82B00] mb-6">
                        Ruta de Defensa de Costes
                      </h1>

                      <div className="space-y-6">
                        <div>
                          <h2 className="text-xl font-semibold text-[#A82B00] mb-2">
                            Descripció
                          </h2>
                          <p className="text-[#160500] mb-4">
                            Al llarg de la costa del Garraf i el Baix Penedès hi
                            ha espais que expliquen una part important de la
                            nostra història recent. Búnquers, fortins i altres
                            construccions defensives encara es conserven al
                            litoral, tot i que sovint passen desapercebudes.
                          </p>
                          <p className="text-[#160500] mb-4">
                            En aquesta ruta us proposem descobrir aquests llocs
                            i entendre per què es van construir durant la Guerra
                            Civil. A través de diferents punts repartits entre
                            Sitges, Vilanova i la Geltrú, Cubelles, Cunit,
                            Calafell i El Vendrell, coneixereu com es defensaven
                            els pobles, com era la vida quotidiana d'aquell
                            temps i què ens expliquen avui aquests espais.
                          </p>
                          <p className="text-[#160500] mb-4">
                            Els punts estan distribuïts en diferents municipis,
                            així que es recomana fer-la per fases, al vostre
                            ritme, començant per on vulgueu.
                          </p>
                          <p className="text-[#160500]">
                            Amb l'ajuda de la Miula observareu, escoltareu i
                            interactuareu amb cada espai per entendre per què
                            aquests llocs formen part de la nostra memòria
                            col·lectiva.
                          </p>
                        </div>

                        <div>
                          <h2 className="text-xl font-semibold text-[#A82B00] mb-2">
                            Durada
                          </h2>
                          <p className="text-[#160500]">5 h</p>
                        </div>

                        <div>
                          <h2 className="text-xl font-semibold text-[#A82B00] mb-2">
                            Municipis
                          </h2>
                          <p className="text-[#160500]">
                            Sitges, Vilanova i la Geltrú, Cubelles, Cunit,
                            Calafell i El Vendrell
                          </p>
                        </div>

                        <div>
                          <h2 className="text-xl font-semibold text-[#A82B00] mb-2">
                            Accessibilitat
                          </h2>
                          <p className="text-[#160500] mb-4">
                            La major part dels punts de la ruta són accessibles
                            mitjançant camins, passeigs marítims o zones
                            urbanes, i es pot arribar a tots ells sense
                            dificultats especials.
                          </p>
                          <p className="text-[#160500]">
                            Un dels punts del recorregut (Búnquer de Punta
                            Mabrera a Vilanova i la Geltrú) es troba en una zona
                            rocosa de la costa, amb accés més irregular. En
                            aquest cas, l'accés pot resultar més difícil per a
                            persones amb mobilitat reduïda o amb cotxets.
                          </p>
                        </div>

                        <div>
                          <h2 className="text-xl font-semibold text-[#A82B00] mb-2">
                            Recomanacions
                          </h2>
                          <p className="text-[#160500] mb-4">
                            L'experiència està pensada per ser compartida en
                            família o en grup, amb infants a partir de 8 anys,
                            joves i persones adultes, de manera que els
                            continguts, les explicacions i els reptes es puguin
                            comentar i reflexionar conjuntament.
                          </p>
                          <p className="text-[#160500] mb-4">
                            Aquesta ruta es pot fer amb calma i al vostre ritme.
                            No cal completar tots els punts en un sol dia, ja
                            que els espais estan repartits al llarg del litoral
                            i cada parada funciona com una descoberta
                            independent.
                          </p>
                          <p className="text-[#160500] mb-4">
                            Alguns punts es troben a l'aire lliure, prop del
                            mar. Cal portar calçat còmode, protecció solar i
                            aigua, especialment en mesos de calor.
                          </p>
                          <p className="text-[#160500]">
                            Els espais de la ruta formen part del paisatge i del
                            patrimoni. Us demanem que els observeu amb respecte
                            i que no hi deixeu cap mena de residu.
                          </p>
                          <p className="text-[#160500] mt-4">
                            En cas de fer la ruta amb infants, es recomana la
                            supervisió d'una persona adulta, sobretot en zones
                            properes a la costa.
                          </p>
                        </div>
                      </div>
                      <div className="mt-[130px] flex justify-center mx-5">
                        <button
                          onClick={handlePlayClick}
                          className="bg-[#A82B00] rounded-[8px] text-[20px] text-white
                          font-bold py-2 max-w-[399px] w-full hover:cursor-pointer px-2 hover:opacity-90 transition-opacity transition-all duration-400 ease-in-out hover:brightness-150 active:brightness-150 active:-translate-y-[5px]"
                        >
                          JUGAR
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mobile Device Popup */}
                {showMobilePopup && (
                  <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    onClick={() => setShowMobilePopup(false)}
                  >
                    <div
                      className="bg-white rounded-lg max-w-md w-full p-6 relative"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => setShowMobilePopup(false)}
                        className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-900"
                      >
                        &times;
                      </button>

                      <p className="text-[#160500] mb-6 max-w-[300px]">
                        Si us plau, continueu al mòbil per gaudir de
                        l'experiència
                      </p>
                      <div className="flex justify-end"></div>
                    </div>
                  </div>
                )}
              </div>

              {/* <div className="w-[384px] h-[328px] bg-white rounded-[12px]"> */}
              {/* <div */}
              {/* className="h-[152px] rounded-t-[12px] " */}
              {/* style={{ backgroundImage: "url('/webcard2.png')" }} */}
              {/* ></div> */}
              {/* <Image src={Logo} alt="Logo" className="pt-[90px] ml-10" /> */}
              {/* <h1 className="text-[#A82B00] text-base font-semibold pt-6 ml-4"> */}
              {/* La Pobla de Mafumet */}
              {/* </h1> */}
              {/* <p className="text-[#160500] text-base ml-4"> */}
              {/* Vivamus a lorem et nisi pretium fringilla. Cras sed libero eu */}
              {/* nibh dictum laoreet nec sit amet est. Sed sed facilisis */}
              {/* mauris. Nunc placerat nisl a imperdiet venenatis. */}
              {/* </p> */}
              {/* </div> */}

              <div className="w-[384px] h-[328px] bg-white rounded-[12px] desktop:mb-0 tablet:mb-10">
                <div
                  className="h-[152px] rounded-t-[12px]"
                  style={{
                    backgroundImage: "url('/webcard3.png')",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <h1 className="text-[20px] font-semibold text-[#776864] text-center pt-[63px]">
                    PROPERAMENT...
                  </h1>
                </div>
                {/* <Image src={Logo} alt="Logo" className="pt-[90px] ml-10" /> */}
                <h1 className="text-[#A82B00] text-base font-semibold pt-6 ml-4">
                  Properament
                </h1>
                <p className="text-[#160500] text-base mx-4">
                  Estem creant noves experiències vinculades al territori, la
                  memòria i el patrimoni. Estigueu atents i atentes als propers
                  llançaments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="how-it-works" className="mb-[100px]">
        <div>
          <h2 className="text-4xl font-semibold text-center text-[#160500] mt-[87px]">
            Què és una experiència AR?
          </h2>
        </div>

        <div className="flex desktop:justify-normal tablet:justify-center mx-auto max-w-[1200px] gap-6 mt-[81px] desktop:px-0 tablet:px-5">
          <div>
            <p className="text-base leading-[24px] desktop:w-[588px] tablet:w-[400px]">
              Una experiència de realitat augmentada (AR) combina el món real
              amb continguts digitals que es poden veure a través del mòbil.
              Quan enfoquem un espai real amb la càmera, apareixen elements
              virtuals que s’integren en l’entorn i ajuden a entendre millor
              allò que tenim davant. No cal descarregar cap aplicació: només cal
              accedir a la web i seguir les indicacions.<br></br>
              <br></br> A Els camins de la memòria utilitzem la realitat
              augmentada com una eina per fer visibles històries que no sempre
              es poden veure a simple vista. Personatges, objectes i elements
              interactius apareixen als espais reals per explicar què va passar
              en cada lloc. A través del joc, les preguntes i els continguts
              visuals, la visita es transforma en una experiència activa,
              pensada per observar, participar i reflexionar en família o en
              grup.
            </p>
            <div className="flex justify-center mt-[64px]">
              <Image src={image2} alt="AR icon" />
            </div>
          </div>
          <div className="flex justify-center">
            <Image
              src={image1}
              alt="AR phone"
              width={585}
              className="rounded-[10px] desktop:w-[585px] desktop:h-[508px] tablet:w-[400px] tablet:h-[400px] object-cover"
            />
          </div>
        </div>
      </div>

      <div
        id="contact-us"
        className="bg-[#ECE7E3] min-h-[777px] desktop:px-0 tablet:px-5"
      >
        <div>
          <div className="text-center">
            <h2 className="text-[36px] font-semibold text-[#160500] pt-[88px] mx-auto max-w-[625px] px-4">
              T’ajudem a crear l’experiència AR per al teu municipi
            </h2>
          </div>
          <div>
            <p className="text-[#A82B00] text-[20px] pt-11 mx-auto max-w-[1200px]">
              Truca’ns o escriu-nos i et responem en menys de 24 h.
            </p>
          </div>

          <div className="flex mx-auto max-w-[1200px] gap-6 pt-[62px]">
            <div className="rounded-[10px] bg-white w-[588px] h-[365px]">
              <div className="flex justify-center mt-[37px]">
                <Image src={phone} alt="phone" />
              </div>
              <div className="flex justify-center mt-[23px]">
                <p className="text-2xl font-bold text-[#160500]">PER TELÈFON</p>
              </div>
              <div className="mt-[30px]">
                <p className="text-[16px] mx-[60px]"></p>
              </div>
              <div className="mt-6">
                <h1 className="text-[32px] text-[#A82B00] font-semibold text-center">
                  685492584
                </h1>
              </div>
            </div>
            <div className="rounded-[10px] bg-white w-[588px] h-[365px]">
              <div className="flex justify-center mt-[37px]">
                <Image src={mail} alt="mail" />
              </div>
              <div className="flex justify-center mt-[23px]">
                <p className="text-2xl font-bold text-[#160500]">PER EMAIL</p>
              </div>
              <div className="mt-[30px]">
                <p className="text-[16px] mx-[60px] text-center">
                  info@elscaminsdelamemoria.cat
                </p>
              </div>
              <div className="mt-10 mx-[100px]">
                <button
                  onClick={() =>
                    window.open(
                      "https://mail.google.com/mail/?view=cm&fs=1&to=info@elscaminsdelamemoria.cat",
                      "_blank"
                    )
                  }
                  className="bg-[#A82B00] rounded-[8px] text-[20px] text-white 
              font-bold py-2 max-w-[499px] w-full hover:cursor-pointer px-2 transition-all duration-400 ease-in-out hover:brightness-150 active:brightness-150 active:-translate-y-[5px]"
                >
                  ESCRIU-NOS
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="desktop:h-[400px] bg-white mx-auto max-w-[1200px]">
        <div className="flex desktop:gap-[650px] tablet:gap-[300px] desktop:justify-normal tablet:justify-center text-2xl font-semibold pt-[81px]">
          <h1>Amb el suport de:</h1>
          <h1>Creat per:</h1>
        </div>
        <div className="flex desktop:justify-normal tablet:justify-center gap-10 pt-[73px] desktop:pb-0 tablet:pb-10">
          <Image
            src={logo1}
            alt="logo1"
            className="desktop:w-[158px] desktop:h-[67px] tablet:w-[80px] h-[60px] desktop:mt-[55px] tablet:mt-[20px]"
          />
          <Image
            src={logo2}
            alt="log2"
            className="desktop:w-[209px] desktop:h-[52px] tablet:w-[80px] h-[60px] desktop:mt-[60px] tablet:mt-[22px]"
          />
          <Image
            src={logo3}
            alt="log3"
            className="desktop:w-[130px] desktop:h-[105px] tablet:w-[80px] h-[60px] mt-1"
          />
          <Image
            src={logo4}
            alt="log4"
            className="desktop:w-[73px] desktop:h-[98px] tablet:w-[80px] h-[60px] desktop:mt-[20px] tablet:mt-[10px]"
          />
          <Image
            src={logo5}
            alt="log5"
            className="desktop:ml-[120px] desktop:w-[138px] desktop:h-[73px] tablet:w-[80px] h-[60px] desktop:mt-[35px] tablet:mt-[10px]"
          />
        </div>
      </div>

      <div className="bg-[#A82B00] desktop:px-0 tablet:px-5">
        <div className="text-white h-[280px] mx-auto max-w-[1200px]">
          <div className="flex gap-[228px]">
            <div className="mt-[64px]">
              <Image src={Flogo} alt="logo" />
            </div>
            <div className="mt-[77px] text-sm leading-[24px]">
              <a
                href="#about-us"
                onClick={(e) => handleNavClick(e, "#about-us")}
                className={`hover:opacity-70 transition-opacity cursor-pointer ${
                  activeSection === "about-us" ? "" : ""
                }`}
              >
                Presentació
              </a>
              <a
                href="#experiences"
                onClick={(e) => handleNavClick(e, "#experiences")}
                className={`hover:opacity-70 transition-opacity cursor-pointer block mt-2 ${
                  activeSection === "experiences" ? "" : ""
                }`}
              >
                Experiències
              </a>
              <a
                href="#how-it-works"
                onClick={(e) => handleNavClick(e, "#how-it-works")}
                className={`hover:opacity-70 transition-opacity cursor-pointer block mt-2 ${
                  activeSection === "how-it-works" ? "" : ""
                }`}
              >
                Com funciona
              </a>
              <a
                href="#contact-us"
                onClick={(e) => handleNavClick(e, "#contact-us")}
                className={`hover:opacity-70 transition-opacity cursor-pointer block mt-2 ${
                  activeSection === "contact-us" ? "" : ""
                }`}
              >
                Contacte
              </a>
            </div>
          </div>
          <div className="">
            <div className="flex justify-end gap-12">
              <a
                href="https://www.instagram.com/elscaminsdelamemoria/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:opacity-70 transition-opacity"
              >
                <FaInstagram className="w-[32px] h-[32px]" />
              </a>
              <a
                href="https://www.facebook.com/elscaminsdelamemoria/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:opacity-70 transition-opacity"
              >
                <FaFacebook className="w-[32px] h-[32px]" />
              </a>
              <a
                href="https://www.tiktok.com/@elscaminsdelamemoria"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="hover:opacity-70 transition-opacity"
              >
                <FaTiktok className="w-[32px] h-[32px]" />
              </a>
            </div>
            {/* <div className="mt-10"> */}
            <p className="text-sm">
              Som Experiències. Tots els drets reservats.
              <button
                className="ml-10 border rounded-[12px] px-5 py-1 cursor-pointer hover:bg-black"
                onClick={() => {
                  router.push("/privacy-policy");
                }}
              >
                Privacy Policy
              </button>
            </p>

            <p
              className="text-sm"
              // onClick={() => {
              //   router.push("/privacitat");
              // }}
            >
              ⁠Avís legal i condicions generals d’ús
            </p>
            {/* </div> */}
          </div>
        </div>
      </div>
    </main>
  );
}
