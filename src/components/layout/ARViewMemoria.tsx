"use client";

import React, { useEffect, useState, useRef } from "react";
import Loading from "@/components/layout/Loading";
import CustomButton from "../ui/Button";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import AR from "@/assets/arpic.jpeg";

const AScene = (props: any) => React.createElement("a-scene", props);
const ACamera = (props: any) => React.createElement("a-camera", props);
const AEntity = (props: any) => React.createElement("a-entity", props);
const ACircle = (props: any) => React.createElement("a-circle", props);
const ARing = (props: any) => React.createElement("a-ring", props);
const ALight = (props: any) => React.createElement("a-light", props);

const subtitlesC = [
  {
    time: 0,
    text: "Hola! Soc la Miula, el mussol de la memòria, i seré la vostra guia.",
  },
  {
    time: 6,
    text: "Des de fa molt de temps sobrevolo pobles, camins i paisatges, i guardo les històries que s’amaguen al nostre territori.",
  },
  {
    time: 16,
    text: "Els camins de la memòria us convida a recórrer espais reals per entendre millor el nostre passat recent.",
  },
  {
    time: 24,
    text: "Cada camí ens acosta a moments, llocs i vivències que han deixat empremta, encara que no sempre siguin visibles a primer cop d’ull.",
  },
  {
    time: 36,
    text: "A través d’aquestes rutes descobrireu com la història va marcar la vida quotidiana de moltes persones:",
  },
  {
    time: 44,
    text: "el que es va construir, el que es va defensar, però també el que es va patir, el que es va adaptar i, sovint, el que es va haver de viure en silenci.",
  },
  { time: 56, text: "No només escoltareu històries: haureu de participar-hi." },
  {
    time: 61,
    text: "Al llarg dels camins us proposaré reptes interactius amb realitat augmentada i preguntes que us ajudaran a observar millor cada espai i a entendre què hi va passar.",
  },
  {
    time: 75,
    text: "A mesura que avanceu, podreu aconseguir objectes col·leccionables digitals vinculats als indrets que descobriu.",
  },
  {
    time: 84,
    text: "Cada ruta posa el focus en un aspecte diferent de la memòria democràtica, però totes comparteixen una mateixa manera de mirar:",
  },
  { time: 94, text: "caminar, observar, jugar i reflexionar." },
  {
    time: 99,
    text: "No es tracta només d’arribar a un lloc, sinó de viure’l i entendre per què forma part de la nostra memòria col·lectiva.",
  },
  {
    time: 109,
    text: "Si m’acompanyeu, us guiaré pels diferents camins, us explicaré què va passar en cada indret i us ajudaré a descobrir com el passat encara dialoga amb el present.",
  },
  {
    time: 122,
    text: "Quan vulgueu, podeu triar per quin camí voleu començar.",
  },
  { time: 126, text: "Fins aviat!" },
];

const subtitlesS = [
  {
    time: 0,
    text: "¡Hola! Soy Miula, el búho de la memoria, y seré vuestra guía.",
  },
  {
    time: 5,
    text: "Desde hace mucho tiempo sobrevuelo pueblos, caminos y paisajes, y guardo las historias que se esconden en nuestro territorio.",
  },
  {
    time: 14,
    text: "Los Caminos de la Memoria os invitan a recorrer espacios reales para comprender mejor nuestro pasado reciente.",
  },
  {
    time: 22,
    text: "Cada camino nos acerca a momentos, lugares y vivencias que han dejado huella, aunque no siempre sean visibles a simple vista.",
  },
  {
    time: 32,
    text: "A través de estas rutas descubriréis cómo la historia marcó la vida cotidiana de muchas personas:",
  },
  {
    time: 38,
    text: "lo que se construyó, lo que se defendió, pero también lo que se sufrió, lo que se tuvo que adaptar y, a menudo, lo que se vivió en silencio.",
  },
  {
    time: 49,
    text: "No solo escucharéis historias: tendréis que participar en ellas.",
  },
  {
    time: 55,
    text: "A lo largo de los caminos os propondré retos interactivos con realidad aumentada y preguntas que os ayudarán a observar mejor cada espacio y a entender qué ocurrió allí.",
  },
  {
    time: 67,
    text: "A medida que avancéis, podréis conseguir objetos digitales coleccionables vinculados a los lugares que descubráis.",
  },
  {
    time: 74,
    text: "Cada ruta pone el foco en un aspecto diferente de la memoria democrática, pero todas comparten una misma manera de mirar:",
  },
  { time: 82, text: "caminar, observar, jugar y reflexionar." },
  {
    time: 87,
    text: "No se trata solo de llegar a un lugar, sino de vivirlo y entender por qué forma parte de nuestra memoria colectiva.",
  },
  {
    time: 94,
    text: "Si me acompañáis, os guiaré por los distintos caminos, os explicaré qué ocurrió en cada lugar y os ayudaré a descubrir cómo el pasado sigue dialogando con el presente.",
  },
  {
    time: 107,
    text: "Cuando queráis, podéis elegir por qué camino queréis empezar.",
  },
  { time: 111, text: "¡Hasta pronto!" },
];

const subtitlesF = [
  {
    time: 0,
    text: "Bonjour! Je suis Miula, la chouette de la mémoire, et je serai votre guide.",
  },
  {
    time: 5,
    text: "Depuis très longtemps, je survole villages, chemins et paysages, en conservant les histoires cachées dans notre territoire.",
  },
  {
    time: 14,
    text: "Les Chemins de la Mémoire vous invitent à parcourir des lieux réels afin de mieux comprendre notre passé récent.",
  },
  {
    time: 22,
    text: "Chaque chemin nous rapproche de moments, de lieux et de vécus qui ont laissé une empreinte, même s’ils ne sont pas toujours visibles au premier regard.",
  },
  {
    time: 31,
    text: "À travers ces parcours, vous découvrirez comment l’histoire a marqué la vie quotidienne de nombreuses personnes:",
  },
  {
    time: 38,
    text: "ce qui a été construit, ce qui a été défendu, mais aussi ce qui a été souffert, ce qui a dû s’adapter et, souvent, ce qui a été vécu en silence.",
  },
  {
    time: 49,
    text: "Vous n’écouterez pas seulement des histoires: vous y participerez.",
  },
  {
    time: 53,
    text: "Tout au long des chemins, je vous proposerai des défis interactifs en réalité augmentée ainsi que des questions qui vous aideront à mieux observer chaque lieu et à comprendre ce qui s’y est passé.",
  },
  {
    time: 65,
    text: "Au fil du parcours, vous pourrez obtenir des objets numériques à collectionner, liés aux sites que vous découvrirez.",
  },
  {
    time: 72,
    text: "Chaque itinéraire met l’accent sur un aspect différent de la mémoire démocratique, mais tous partagent une même manière de regarder:",
  },
  {
    time: 81,
    text: "marcher, observer, jouer et réfléchir.",
  },
  {
    time: 85,
    text: "Il ne s’agit pas seulement d’arriver quelque part, mais de vivre le lieu et de comprendre pourquoi il fait partie de notre mémoire collective.",
  },
  {
    time: 91,
    text: "Si vous m’accompagnez, je vous guiderai à travers les différents chemins, je vous expliquerai ce qui s’est passé dans chaque endroit et je vous aiderai à découvrir comment le passé dialogue encore avec le présent.",
  },
  {
    time: 101,
    text: "Quand vous le souhaiterez, vous pourrez choisir par quel chemin commencer.",
  },
  {
    time: 110,
    text: "À très bientôt!",
  },
];

const subtitlesE = [
  {
    time: 0,
    text: "Hello! I’m Miula, the owl of memory, and I will be your guide.",
  },
  {
    time: 5,
    text: "For a long time, I have been flying over towns, paths and landscapes, keeping the stories hidden within our territory.",
  },
  {
    time: 14,
    text: "The Paths of Memory invite you to explore real places in order to better understand our recent past.",
  },
  {
    time: 22,
    text: "Each path brings us closer to moments, places and experiences that have left their mark, even if they are not always visible at first glance.",
  },
  {
    time: 33,
    text: "Through these routes, you will discover how history shaped the everyday lives of many people:",
  },
  {
    time: 40,
    text: "what was built, what was defended, but also what was suffered, what had to adapt and, often, what had to be lived in silence.",
  },
  {
    time: 50,
    text: "You will not only listen to stories: you will take part in them.",
  },
  {
    time: 54,
    text: "Along the paths, I will propose interactive challenges using augmented reality, as well as questions that will help you observe each place more carefully and understand what happened there.",
  },
  {
    time: 68,
    text: "As you progress, you will be able to collect digital items linked to the places you discover.",
  },
  {
    time: 74,
    text: "Each route focuses on a different aspect of democratic memory, but they all share the same approach:",
  },
  {
    time: 81,
    text: "walking, observing, playing and reflecting.",
  },
  {
    time: 86,
    text: "It is not just about reaching a place, but about experiencing it and understanding why it is part of our collective memory.",
  },
  {
    time: 94,
    text: "If you join me, I will guide you along the different paths, explain what happened in each location and help you discover how the past still dialogues with the present.",
  },
  {
    time: 105,
    text: "Whenever you’re ready, you can choose which path you want to start with.",
  },
  {
    time: 110,
    text: "See you soon!",
  },
];

const Marker = React.forwardRef((_, ref: any) => (
  <AEntity ref={ref} position="0 -0.9 -2">
    <ARing
      radius-inner="0.3"
      radius-outer="0.4"
      color="#4F46E5"
      opacity="0.8"
      rotation="-90 0 0"
      material="shader: flat; metalness: 0; roughness: 1;"
    />
    <ACircle
      radius="0.3"
      color="#10B981"
      opacity="0.5"
      rotation="-90 0 0"
      material="shader: flat; metalness: 0; roughness: 1;"
    />
    {/* <ACircle radius="0.3" color="#10B981" opacity="0.5" rotation="-90 0 0" /> */}
  </AEntity>
));
Marker.displayName = "Marker";

interface AvatarProps {
  position: { x: number; y: number; z: number };
  isPlaying: boolean;
  userRotationY?: number;
  userScale?: number;
}

const Avatar = React.forwardRef((props: AvatarProps, forwardedRef: any) => {
  const localRef = useRef<any>(null);
  const avatarRef = forwardedRef || localRef;
  const { position, isPlaying, userRotationY = 0, userScale = 1.2 } = props;

  useEffect(() => {
    if (avatarRef.current) {
      const entity = avatarRef.current;
      const mesh = entity.getObject3D("mesh");

      const setupMaterials = (m: any) => {
        m.traverse((obj: any) => {
          obj.frustumCulled = false;

          if (obj.isMesh && obj.material) {
            const materials = Array.isArray(obj.material)
              ? obj.material
              : [obj.material];
            materials.forEach((mat: any) => {
              if (mat) {
                if (mat.isMeshBasicMaterial) {
                  const THREE = (window as any).THREE;
                  if (THREE) {
                    const newMat = new THREE.MeshStandardMaterial();
                    newMat.map = mat.map;
                    newMat.color = mat.color;
                    obj.material = newMat;
                  }
                }
                if (mat.isMeshStandardMaterial || mat.isMeshPhysicalMaterial) {
                  mat.envMapIntensity = 2.0;
                  mat.needsUpdate = true;
                }
              }
            });
          }
        });
      };

      if (mesh) {
        setupMaterials(mesh);
      } else {
        entity.addEventListener("model-loaded", (evt: any) => {
          setupMaterials(evt.detail.model);
        });
      }
    }
  }, [avatarRef]);

  return (
    <AEntity
      ref={avatarRef}
      position={`${position.x} ${position.y} ${position.z}`}
      rotation={`-10 ${userRotationY} 0`}
      scale={`${userScale} ${userScale} ${userScale}`}
    >
      <AEntity
        gltf-model="url(/models/MUSSOL_ANIMACION.glb)"
        animation-mixer={
          isPlaying
            ? "clip: *; loop: repeat; timeScale: 1"
            : "clip: *; loop: repeat; timeScale: 0"
        }
      />
    </AEntity>
  );
});
Avatar.displayName = "Avatar";

const Page = ({
  setShowARView,
  handleClose,
  audioUrl,
  linkLoad,
  from,
}: any) => {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const t = useTranslations("gameText");
  const t2 = useTranslations("Caminslogin");
  const locale = useLocale();

  const subtitlesMap: Record<string, typeof subtitlesE> = {
    ca: subtitlesC,
    es: subtitlesS,
    fr: subtitlesF,
    en: subtitlesE,
  };
  const selectedSubtitles = subtitlesMap[locale] ?? subtitlesE;

  const [showSubtitles, setShowSubtitles] = useState(false);
  const [activeSubtitle, setActiveSubtitle] = useState("");
  const subtitleTimeouts = useRef<NodeJS.Timeout[]>([]);
  const [showSubtitleButton, setShowSubtitleButton] = useState(false);
  const [showMovementInstructions, setShowMovementInstructions] =
    useState(false);

  const [avatarPos, setAvatarPos] = useState<{
    x: number;
    y: number;
    z: number;
  } | null>(null);
  const [isPlayingState, setIsPlayingState] = useState(false);
  const [showAudioPopup, setShowAudioPopup] = useState(false);
  const [deviceOrientation, setDeviceOrientation] = useState({
    alpha: 0,
    beta: 0,
    gamma: 0,
  });
  const [userRotationY, setUserRotationY] = useState(0);
  const [userScale, setUserScale] = useState(1.2);

  const isPlayingRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const markerRef = useRef<any>(null);
  const avatarRef = useRef<any>(null);
  const gestureState = useRef<any>({});
  const orientationHandlerRef = useRef<any>(null);
  const dracoInitializedRef = useRef(false);

  const toggleSubtitles = () => {
    const newShowSubtitles = !showSubtitles;
    setShowSubtitles(newShowSubtitles);

    if (newShowSubtitles && audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      setActiveSubtitle("");
      subtitleTimeouts.current.forEach(clearTimeout);
      subtitleTimeouts.current = [];

      // Find the current subtitle based on audio time
      const currentSubtitleIndex = selectedSubtitles.findIndex(
        (item, index) =>
          currentTime >= item.time &&
          (index === selectedSubtitles.length - 1 ||
            currentTime < selectedSubtitles[index + 1].time),
      );

      // Show the current subtitle immediately if found
      if (currentSubtitleIndex !== -1) {
        setActiveSubtitle(selectedSubtitles[currentSubtitleIndex].text);
      }

      // Schedule future subtitles
      selectedSubtitles.forEach((item, index) => {
        if (item.time > currentTime) {
          const timeout = setTimeout(
            () => {
              setActiveSubtitle(item.text);
            },
            (item.time - currentTime) * 1000,
          );
          subtitleTimeouts.current.push(timeout);
        }
      });
    } else if (!newShowSubtitles) {
      setActiveSubtitle("");
      subtitleTimeouts.current.forEach(clearTimeout);
      subtitleTimeouts.current = [];
    }
  };

  useEffect(() => {
    return () => {
      // Clear all timeouts
      subtitleTimeouts.current.forEach(clearTimeout);
      subtitleTimeouts.current = [];

      // Stop and clean up audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }

      // Reset state
      setIsPlayingState(false);
      setActiveSubtitle("");
      setShowSubtitles(false);
      setShowSubtitleButton(false);
    };
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        stream.getTracks().forEach((track) => track.stop());
        setPermissionGranted(true);

        if (
          typeof DeviceOrientationEvent !== "undefined" &&
          // @ts-ignore
          typeof DeviceOrientationEvent.requestPermission === "function"
        ) {
          try {
            // @ts-ignore
            const permission = await DeviceOrientationEvent.requestPermission();
            if (permission === "granted") startOrientationTracking();
          } catch {
            /* ignore */
          }
        } else {
          startOrientationTracking();
        }
      } catch {
        setPermissionGranted(false);
      }
    })();

    return () => {
      if (orientationHandlerRef.current)
        window.removeEventListener(
          "deviceorientation",
          orientationHandlerRef.current,
        );
    };
  }, []);

  const startOrientationTracking = () => {
    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      setDeviceOrientation({
        alpha: event.alpha || 0,
        beta: event.beta || 0,
        gamma: event.gamma || 0,
      });
    };
    orientationHandlerRef.current = handleDeviceOrientation;
    window.addEventListener("deviceorientation", handleDeviceOrientation);
  };

  const isIOS = () =>
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !(window as any).MSStream;

  const startAnimationAndAudio = async () => {
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio(audioUrl);
        audioRef.current.preload = "auto";
        audioRef.current.onended = () => {
          stopAnimationAndAudio();
          setTimeout(() => handleBackFromAR(), 100);
        };
      }
      await audioRef.current.play();
      isPlayingRef.current = true;
      setIsPlayingState(true);
      // Enable subtitles when animation starts

      setShowSubtitleButton(true);

      setShowSubtitles(true);
      setActiveSubtitle("");
      subtitleTimeouts.current.forEach(clearTimeout);
      subtitleTimeouts.current = [];

      selectedSubtitles.forEach((item) => {
        const timeout = setTimeout(() => {
          setActiveSubtitle(item.text);
        }, item.time * 1000);
        subtitleTimeouts.current.push(timeout);
      });
    } catch {
      setShowAudioPopup(true);
    }
  };

  const stopAnimationAndAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      // Don't set audioRef.current to null here as it might be needed for replay
    }
    isPlayingRef.current = false;
    setIsPlayingState(false);

    setShowSubtitleButton(false);
    setShowSubtitles(false);
    setActiveSubtitle("");

    // Clear any pending timeouts
    subtitleTimeouts.current.forEach(clearTimeout);
    subtitleTimeouts.current = [];
  };

  const handleBackFromAR = () => {
    stopAnimationAndAudio();
    setShowARView(false);
    // Ensure audio is fully cleaned up before closing
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    handleClose();
  };

  const handleAllowAudio = () => {
    setShowAudioPopup(false);
    startAnimationAndAudio();
  };

  const placeAvatar = () => {
    if (markerRef.current) {
      const worldPos = new (window as any).THREE.Vector3();
      markerRef.current.object3D.getWorldPosition(worldPos);
      setAvatarPos({ x: worldPos.x, y: worldPos.y + 0.3, z: worldPos.z });
      startAnimationAndAudio();

      // Show movement instructions
      setShowMovementInstructions(true);
      // Hide after 8 seconds
      // setTimeout(() => {
      //   setShowMovementInstructions(false);
      // }, 80000);
    }
  };

  const getTouchDistance = (t0: any, t1: any) => {
    const dx = t0.clientX - t1.clientX;
    const dy = t0.clientY - t1.clientY;
    return Math.hypot(dx, dy);
  };

  const getTouchMidpoint = (t0: any, t1: any) => ({
    x: (t0.clientX + t1.clientX) / 2,
    y: (t0.clientY + t1.clientY) / 2,
  });

  const onTouchStart = (e: React.TouchEvent) => {
    if (!avatarPos) return;
    e.stopPropagation();

    // Hide the movement instructions when any touch starts on the avatar
    if (showMovementInstructions) {
      setShowMovementInstructions(false);
    }

    const touches = e.touches;
    gestureState.current.start = true;
    if (touches.length === 1) {
      gestureState.current.mode = "rotate";
      gestureState.current.startX = touches[0].clientX;
      gestureState.current.startRotationY = userRotationY;
    } else if (touches.length === 2) {
      gestureState.current.mode = "pinch";
      gestureState.current.startDist = getTouchDistance(touches[0], touches[1]);
      gestureState.current.startScale = userScale;
      gestureState.current.startMid = getTouchMidpoint(touches[0], touches[1]);
      gestureState.current.startPos = { ...avatarPos };
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!gestureState.current.start) return;
    e.preventDefault();
    const touches = e.touches;
    if (gestureState.current.mode === "rotate" && touches.length === 1) {
      const dx = touches[0].clientX - gestureState.current.startX;
      const deltaY = dx * 0.2;
      setUserRotationY(gestureState.current.startRotationY + deltaY);
    } else if (touches.length === 2) {
      const dist = getTouchDistance(touches[0], touches[1]);
      const scaleFactor = dist / gestureState.current.startDist;
      const newScale = Math.min(
        Math.max(gestureState.current.startScale * scaleFactor, 0.2),
        2,
      );
      setUserScale(newScale);

      const mid = getTouchMidpoint(touches[0], touches[1]);
      const dy = mid.y - gestureState.current.startMid.y;
      const dx = mid.x - gestureState.current.startMid.x;
      const panFactor = 0.0025 * (1 / Math.max(newScale, 0.2));

      setAvatarPos((p) =>
        p
          ? {
              x: gestureState.current.startPos.x - dx * panFactor,
              y: gestureState.current.startPos.y - dy * panFactor,
              z: gestureState.current.startPos.z,
            }
          : p,
      );
    }
  };

  const onTouchEnd = () => {
    gestureState.current.start = false;
    gestureState.current.mode = null;
  };

  useEffect(() => {
    // if (!permissionGranted) return;
    // if (!linkLoad) {
    //   setScriptsLoaded(true);
    //   return;
    // }

    const scriptClass = "poi-page-script";

    const loadScript = (src: string) =>
      new Promise<void>((resolve, reject) => {
        if ((window as any)._loadedScripts?.[src]) return resolve();
        const existing = document.querySelector(`script[src="${src}"]`);
        if (existing) return resolve();

        const s = document.createElement("script");
        s.src = src;
        s.async = false;
        s.classList.add(scriptClass);
        s.dataset.pageScript = scriptClass;
        s.onload = () => {
          (window as any)._loadedScripts = {
            ...(window as any)._loadedScripts,
            [src]: true,
          };
          resolve();
        };
        s.onerror = () => reject();
        document.head.appendChild(s);
      });

    const setupDracoLoader = () => {
      if (
        !(window as any).AFRAME ||
        !(window as any).THREE ||
        dracoInitializedRef.current
      )
        return;
      const AFRAME = (window as any).AFRAME;
      const THREE = (window as any).THREE;
      try {
        const dracoLoader = new THREE.DRACOLoader();
        dracoLoader.setDecoderPath(
          "https://www.gstatic.com/draco/versioned/decoders/1.5.6/",
        );
        dracoLoader.preload();
        if (AFRAME.components["gltf-model"]) {
          const originalUpdate =
            AFRAME.components["gltf-model"].Component.prototype.update;
          AFRAME.components["gltf-model"].Component.prototype.update =
            function (oldData: any) {
              if (!this.loader) this.loader = new THREE.GLTFLoader();
              if (!this.loader.dracoLoader)
                this.loader.setDRACOLoader(dracoLoader);
              if (originalUpdate) return originalUpdate.call(this, oldData);
            };
        }
        dracoInitializedRef.current = true;
      } catch {
        /* ignore */
      }
    };

    const loadAll = async () => {
      try {
        if (!(window as any).AFRAME) {
          await loadScript("https://aframe.io/releases/1.3.0/aframe.min.js");
        }
        await new Promise<void>((resolve) => {
          const check = (): void => {
            if ((window as any).AFRAME) {
              resolve();
            } else {
              setTimeout(check, 50);
            }
          };
          check();
        });

        if (isIOS()) {
          await loadScript(
            "https://cdn.jsdelivr.net/gh/AR-js-org/AR.js@3.4.5/aframe/build/aframe-ar.js",
          );
        } else {
          await loadScript(
            "https://cdn.jsdelivr.net/gh/AR-js-org/AR.js@3.4.5/aframe/build/aframe-ar-nft.min.js",
          );
        }

        await loadScript(
          "https://cdn.jsdelivr.net/npm/aframe-extras@7.6.0/dist/aframe-extras.min.js",
        );
        if (!(window as any).THREE) {
          await loadScript(
            "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js",
          );
        }
        await loadScript(
          "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/DRACOLoader.js",
        );
        setupDracoLoader();
        setScriptsLoaded(true);
      } catch {
        setScriptsLoaded(false);
      }
    };

    loadAll();
  }, [permissionGranted, linkLoad]);

  useEffect(() => {
    if (!scriptsLoaded || !(window as any).AFRAME || !(window as any).THREE)
      return;

    const scene = document.querySelector("a-scene");
    if (!scene) return;

    const setupEnvironment = () => {
      const sceneEl = scene as any;
      const THREE = (window as any).THREE;

      if (sceneEl.hasLoaded && sceneEl.renderer && sceneEl.object3D) {
        const renderer = sceneEl.renderer;
        const scene3D = sceneEl.object3D;

        renderer.toneMapping = THREE.LinearToneMapping;
        renderer.toneMappingExposure = 1.0;

        if (sceneEl.components && sceneEl.components.environment) {
          try {
            sceneEl.setAttribute(
              "environment",
              "preset: venice-sunset; " +
                "toneMapping: linear; " +
                "exposure: 0; " +
                "punctualLights: true; " +
                "ambientIntensity: 0; " +
                "ambientColor: #ffffff; " +
                "directIntensity: 2.5; " +
                "directColor: #ffffff",
            );
          } catch {
            try {
              sceneEl.setAttribute("environment", {
                preset: "venice-sunset",
                toneMapping: "linear",
                exposure: 0,
                punctualLights: true,
                ambientIntensity: 0,
                ambientColor: "#ffffff",
                directIntensity: 2.5,
                directColor: "#ffffff",
              });
            } catch {
              // Environment component update failed, using lights only
            }
          }
        }

        const updateMaterials = () => {
          scene3D.traverse((object: any) => {
            if (object.isMesh && object.material) {
              const materials = Array.isArray(object.material)
                ? object.material
                : [object.material];
              materials.forEach((material: any) => {
                if (
                  material &&
                  (material.isMeshStandardMaterial ||
                    material.isMeshPhysicalMaterial)
                ) {
                  if (scene3D.environment) {
                    material.envMap = scene3D.environment;
                    material.envMapIntensity = 1.0;
                  }
                  material.needsUpdate = true;
                }
              });
            }
          });
        };

        updateMaterials();
        setTimeout(updateMaterials, 500);
        setTimeout(updateMaterials, 1500);
        setTimeout(updateMaterials, 3000);
      } else {
        sceneEl.addEventListener("loaded", setupEnvironment, { once: true });
      }
    };

    const timer = setTimeout(setupEnvironment, 500);

    return () => clearTimeout(timer);
  }, [scriptsLoaded]);

  if (!permissionGranted) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-white w-full">
        <p>⚠️ {t("cameraPermission")}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded transition-all duration-400 ease-in-out hover:brightness-150 active:brightness-150 active:-translate-y-[5px]"
        >
          {t("try_again")}
        </button>
      </div>
    );
  }

  if (!scriptsLoaded || !(window as any).AFRAME) return <Loading />;

  return (
    <div className="w-full h-screen relative">
      <AScene
        vr-mode-ui="enabled: false"
        embedded
        arjs="sourceType: webcam; videoTexture: true; facingMode: environment; debugUIEnabled: false"
        renderer="alpha: true; logarithmicDepthBuffer: true; precision: mediump; colorManagement: true; toneMapping: Linear;"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <ACamera position="0 0 0" look-controls="touchEnabled: false">
          {!avatarPos && <Marker ref={markerRef} />}
        </ACamera>

        <ALight
          type="directional"
          intensity={2.5}
          color="#ffffff"
          position="0 0 5"
        />
        {/* <ALight type="ambient" intensity={2} color="#ffffff" /> */}

        {avatarPos && (
          <Avatar
            ref={avatarRef}
            position={avatarPos}
            isPlaying={isPlayingState}
            userRotationY={userRotationY}
            userScale={userScale}
          />
        )}

        <AEntity environment="preset: venice-sunset; toneMapping: linear; exposure: 0; punctualLights: true; ambientIntensity: 0; ambientColor: #ffffff; directIntensity: 2; directColor: #ffffff;" />
      </AScene>
      {avatarPos && (
        <div
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onTouchCancel={onTouchEnd}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2147483648,
            touchAction: "none",
            background: "transparent",
          }}
        />
      )}
      {!avatarPos && (
        <div
          className={`fixed bottom-10 w-full flex justify-center mx-auto px-5 ${
            from === "intro" ? "left-0" : ""
          }`}
          style={{ zIndex: 2147483646 }}
        >
          <CustomButton onClick={placeAvatar} className="w-[200px] ">
            {t("place")}
          </CustomButton>
        </div>
      )}
      {showAudioPopup && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70"
          style={{ zIndex: 2147483647 }}
        >
          <div className="bg-white p-6 rounded-xl shadow-xl flex flex-col items-center gap-4">
            <p className="text-lg font-semibold text-center">
              🔊 {t("audioPermission")}
            </p>
            <CustomButton
              onClick={handleAllowAudio}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {t("audioAllow")}
            </CustomButton>
            <CustomButton
              onClick={() => setShowAudioPopup(false)}
              className="px-4 py-2 bg-gray-600 text-white rounded"
            >
              {t("Cancel")}
            </CustomButton>
          </div>
        </div>
      )}
      {showSubtitleButton && (
        <div className="fixed top-6 right-4 z-[2147483647]">
          <button
            onClick={toggleSubtitles}
            className="px-3 py-2 text-[11px] bg-black/70 text-white rounded-lg transition-all duration-400 ease-in-out hover:brightness-150 active:brightness-150 active:-translate-y-[5px]"
          >
            {/* {showSubtitles ? {t2("sub1")} : {t2("sub2")}} */}
            {t2(showSubtitles ? "sub1" : "sub2")}
          </button>
        </div>
      )}
      {activeSubtitle && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%]">
          <div className="bg-black/70 text-white text-center px-4 py-5 rounded-lg text-[13px] leading-relaxed shadow-lg">
            {activeSubtitle}
          </div>
        </div>
      )}
      {showMovementInstructions && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2147483647] w-[90%] max-w-md">
          <div className="bg-black/80 text-white text-center px-6 py-4 rounded-xl shadow-2xl border border-white/20">
            <p className="text-base font-medium mb-2">💡 {t2("info1")}</p>
            <p className="text-sm opacity-90">
              {t2("info2")} <br></br> {t2("info3")}
            </p>
          </div>
        </div>

        // <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2147483647]">
        //   <div className="flex justify-center">
        //     <Image src={AR} alt="AR"/>
        //   </div>
        // </div>
      )}{" "}
    </div>
  );
};

export default Page;
