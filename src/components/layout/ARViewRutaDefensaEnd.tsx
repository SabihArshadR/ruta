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
    text: "Heu arribat al final del camí.",
  },
  {
    time: 2,
    text: "Al llarg d’aquesta ruta heu recorregut espais reals que, durant un temps difícil, van formar part del dia a dia de moltes persones.",
  },
  {
    time: 12,
    text: "Llocs de vigilància, d’organització i d’espera, construïts amb la voluntat de protegir, però també marcats per la por i la incertesa.",
  },
  {
    time: 22,
    text: "Cada búnquer, cada trinxera i cada fortí guarda històries que no sempre es van poder explicar en veu alta.",
  },
  {
    time: 31,
    text: "Històries de veïns i veïnes, de soldats, de famílies senceres que van aprendre a conviure amb el silenci, amb l’alerta constant i amb l’esperança que el conflicte s’acabés.",
  },
  {
    time: 44,
    text: "Avui, gràcies a la vostra mirada i a la vostra curiositat, aquests espais tornen a parlar.",
  },
  {
    time: 51,
    text: "No com a elements de guerra, sinó com a testimonis del passat que ens ajuden a entendre millor el present.",
  },
  {
    time: 58,
    text: "Recordar no és mirar enrere amb nostàlgia, sinó prendre consciència del que va passar per no repetir-ho.",
  },
  {
    time: 66,
    text: "La memòria democràtica es construeix així: caminant, escoltant i compartint.",
  },
  {
    time: 73,
    text: "Gràcies per ajudar-me a preservar aquestes històries i per formar part d’aquesta ruta de memòria.",
  },
  {
    time: 79,
    text: "Jo continuaré sobrevolant la costa, guardant relats i esperant que més persones, com vosaltres, vulguin escoltar-los.",
  },
  {
    time: 88,
    text: "Fins la propera ruta.",
  },
];

const subtitlesS = [
  { time: 0, text: "Habéis llegado al final del camino." },
  {
    time: 2,
    text: "A lo largo de esta ruta habéis recorrido espacios reales que, durante un tiempo difícil, formaron parte del día a día de muchas personas.",
  },
  {
    time: 13,
    text: "Lugares de vigilancia, de organización y de espera, construidos con la voluntad de proteger, pero también marcados por el miedo y la incertidumbre.",
  },
  {
    time: 24,
    text: "Cada búnker, cada trinchera y cada fortín guarda historias que no siempre pudieron contarse en voz alta.",
  },
  {
    time: 32,
    text: "Historias de vecinos y vecinas, de soldados, de familias enteras que aprendieron a convivir con el silencio, con la alerta constante y con la esperanza de que el conflicto terminara.",
  },
  {
    time: 44,
    text: "Hoy, gracias a vuestra mirada y a vuestra curiosidad, estos espacios vuelven a hablar.",
  },
  {
    time: 50,
    text: "No como elementos de guerra, sino como testimonios del pasado que nos ayudan a comprender mejor el presente.",
  },
  {
    time: 56,
    text: "Recordar no es mirar atrás con nostalgia, sino tomar conciencia de lo que ocurrió para no repetirlo.",
  },
  {
    time: 62,
    text: "La memoria democrática se construye así: caminando, escuchando y compartiendo.",
  },
  {
    time: 68,
    text: "Gracias por ayudarme a preservar estas historias y por formar parte de esta ruta de memoria.",
  },
  {
    time: 74,
    text: "Yo continuaré sobrevolando la costa, guardando relatos y esperando que más personas, como vosotros y vosotras, quieran escucharlos.",
  },
  { time: 83, text: "Hasta la próxima ruta." },
];

const subtitlesF = [
  {
    time: 0,
    text: "Vous êtes arrivés à la fin du parcours.",
  },
  {
    time: 2,
    text: "Tout au long de cette route, vous avez parcouru des lieux réels qui, durant une période difficile, faisaient partie du quotidien de nombreuses personnes.",
  },
  {
    time: 12,
    text: "Des lieux de surveillance, d’organisation et d’attente, construits dans un but de protection, mais aussi marqués par la peur et l’incertitude.",
  },
  {
    time: 22,
    text: "Chaque bunker, chaque tranchée et chaque fortification conserve des histoires qui n’ont pas toujours pu être racontées à voix haute.",
  },
  {
    time: 32,
    text: "Des histoires de voisins et de voisines, de soldats, de familles entières qui ont appris à vivre avec le silence, avec l’alerte permanente et avec l’espoir que le conflit prenne fin.",
  },
  {
    time: 44,
    text: "Aujourd’hui, grâce à votre regard et à votre curiosité, ces lieux reprennent la parole.",
  },
  {
    time: 51,
    text: "Non pas comme des éléments de guerre, mais comme des témoins du passé qui nous aident à mieux comprendre le présent.",
  },
  {
    time: 58,
    text: "Se souvenir, ce n’est pas regarder en arrière avec nostalgie, mais prendre conscience de ce qui s’est passé pour ne pas le reproduire.",
  },
  {
    time: 67,
    text: "La mémoire démocratique se construit ainsi: en marchant, en écoutant et en partageant.",
  },
  {
    time: 74,
    text: "Merci de m’avoir aidée à préserver ces histoires et de faire partie de cette route de mémoire.",
  },
  {
    time: 80,
    text: "Je continuerai à survoler la côte, à garder ces récits et à attendre que d’autres personnes, comme vous, aient envie de les écouter.",
  },
  {
    time: 88,
    text: "À la prochaine route.",
  },
];

const subtitlesE = [
  {
    time: 0,
    text: "You have reached the end of the path.",
  },
  {
    time: 2,
    text: "Throughout this route, you have explored real places that, during a difficult period, were part of the everyday lives of many people.",
  },
  {
    time: 12,
    text: "Places of surveillance, organisation and waiting, built with the intention of protecting, but also marked by fear and uncertainty.",
  },
  {
    time: 22,
    text: "Each bunker, each trench and each fortification holds stories that could not always be told out loud.",
  },
  {
    time: 31,
    text: "Stories of neighbours, soldiers and entire families who learned to live with silence, with constant alertness and with the hope that the conflict would come to an end.",
  },
  {
    time: 44,
    text: "Today, thanks to your curiosity and your way of looking, these places speak again.",
  },
  {
    time: 50,
    text: "Not as elements of war, but as witnesses of the past that help us better understand the present.",
  },
  {
    time: 58,
    text: "Remembering is not about looking back with nostalgia, but about becoming aware of what happened so it is not repeated.",
  },
  {
    time: 67,
    text: "Democratic memory is built this way: by walking, listening and sharing.",
  },
  {
    time: 73,
    text: "Thank you for helping me preserve these stories and for being part of this memory route.",
  },
  {
    time: 79,
    text: "I will continue flying over the coast, keeping these stories and waiting for more people, like you, to want to listen to them.",
  },
  {
    time: 89,
    text: "Until the next route.",
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

      setShowMovementInstructions(true);
      // Hide after 8 seconds
      // setTimeout(() => {
      //   setShowMovementInstructions(false);
      // }, 8000);
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
          colorManagement: true,
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
          colorManagement={true}
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
            {/* {showSubtitles ? "Amagar subtítols" : "Mostrar subtítols"} */}
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
        //     <Image src={AR} alt="AR" />
        //   </div>
        // </div>
      )}
    </div>
  );
};

export default Page;
